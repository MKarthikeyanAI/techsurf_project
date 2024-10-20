import React, { useState, useMemo } from "react";
import { generateFigmaDesignPrompt } from "../services/aiforFigma";
import "./FigmaPromptForm.css"; // For styling
import { PulseLoader } from "react-spinners";

// Import Material UI components and icons
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

// Assume useSpeechToText hook or similar functionality for speech recognition
import useSpeechToText from "../hooks/useSpeechToText"; 

const FigmaPromptForm = ({ onGenerate }) => {
  console.log("FigmaPromptForm Is Running: ");
  
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error message
  const [designType, setDesignType] = useState("Page"); // Track design type

  // Memoize options to avoid unnecessary re-renders or dependency issues in useSpeechToText
  const speechOptions = useMemo(() => ({
    continuous: true
  }), []);

  // Integrating speech recognition functionality
  const { isListening, transcript, startListening, stopListening } = useSpeechToText(speechOptions);

  const handleSubmit = async (e) => {
    console.log("OnGENERATE HANDLESUBMIT IS RUNNING");
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting the request
    setError(""); // Reset error state
    try {
      const result = await generateFigmaDesignPrompt(prompt, designType);
      console.log("FigmaPromptForm js result file: ", result);
      console.log("FigmaPromptForm js designType:  ", designType);
      console.log("result design type: ", result.design_type);
      if (result.design_type === "Page" && result.svgContent && result.htmlCssCode) {
        console.log("Page OnGenerate is running");
        onGenerate(result.svgContent, result.htmlCssCode, result.prompt_input, result.design_type,result.content_types); // Pass both contents
      } else {
        console.log("Website OnGenerate is running");
        onGenerate(result.allPageSVGs, result.allPageHTMLCSS, result.prompts, result.design_type,result.content_types); // Pass both contents
      }
    } catch (error) {
      console.error("Error generating design:", error);
      setError("Failed to generate the design. Please try again."); // Display a user-friendly error message
    } finally {
      setLoading(false); // Reset loading state after receiving response
    }
  };

  // Handling voice input
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
      setPrompt(prevPrompt => prevPrompt + (transcript ? ` ${transcript}` : ''));
    } else {
      startListening();
    }
  };

  return (
    <div className="header">
      <h2 className="headerprompt1">PROMPT TO FIGMA DESIGN FILE</h2>
      <div className="design-container">
        <h2>New Design</h2>
        <form onSubmit={handleSubmit} className="prompt-form">
          <textarea
            value={isListening ? prompt + transcript : prompt}  // Update textarea with voice input
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your design"
            className="prompt-textarea"
            required
            aria-label="Design prompt input"
          />

          {/* Mic button to toggle listening state */}
          <div className="voice-input-container">
           
          </div>

          {/* Dropdown for selecting design type */}
          <div className="button-dropdown-container">
            <label htmlFor="designType">Design Type:</label>
            <select
              id="designType" 
              value={designType}
              onChange={(e) => setDesignType(e.target.value)} // Updates designType state
              className="design-type-select"
              aria-label="Select design type"
            >
              <option value="Page">Page</option>
              <option value="Website">Website</option>
            </select>

            <div className="options">
              <button type="submit" className="generate-button" disabled={loading}>
                {loading ? (
                  <>
                    <PulseLoader color="#ffffff" size={8} />
                  </>
                ) : (
                  "Generate"
                )}
              </button>
              <IconButton
              aria-label={isListening ? "Stop listening" : "Start listening"}
              onClick={handleVoiceInput}
              style={{
                backgroundColor: isListening ? '#d62d20' : '#008744',
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                border: "1px solid white",
                transition: "background-color 0.3s ease",
                marginRight: "0px",
                marginLeft: "20px", // Add or increase this value to move right
              }}
            >
              {isListening ? <MicOffIcon style={{ color: 'white', fontSize: '30px' }} /> : <MicIcon style={{ color: 'white', fontSize: '30px' }} />}
            </IconButton>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default FigmaPromptForm;
