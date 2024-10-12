//Figma

// src/components/FigmaPromptForm.js

import React, { useState } from "react";
import { generateFigmaDesignPrompt } from "../services/aiforFigma";
import "./FigmaPromptForm.css"; // For styling

const FigmaPromptForm = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  // const [platform, setPlatform] = useState("Mobile");
  // const [visibility, setVisibility] = useState("Public");
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error message

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await generateFigmaDesignPrompt(prompt);
  //     onGenerate(result);
  //   } catch (error) {
  //     console.error("Error generating design:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting the request
    setError(""); // Reset error state
    try {
      const result = await generateFigmaDesignPrompt(prompt);
      // onGenerate(result);
      // Assuming result is an object with svgContent and htmlCssCode
      onGenerate(result.svgContent, result.htmlCssCode); // Pass both contents
      // setLoading(false); // Reset loading state after receiving response
    } catch (error) {
      console.error("Error generating design:", error);
      setLoading(false); // Reset loading state in case of error
    }
    finally {
      setLoading(false); // Reset loading state after receiving response
    }
  };

  return (
    <div className="design-container">
      <h2>New Design</h2>
      <form onSubmit={handleSubmit} className="prompt-form">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your design"
          className="prompt-textarea"
          required
        />
        <div className="options">
          {/* <div className="platform-options">
            <button
              type="button"
              className={platform === "Mobile" ? "selected" : ""}
              onClick={() => setPlatform("Mobile")}
            >
              Mobile
            </button>
            <button
              type="button"
              className={platform === "Web" ? "selected" : ""}
              onClick={() => setPlatform("Web")}
            >
              Web
            </button>
          </div> */}
          {/* <div className="visibility-options">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div> */}
          <button type="submit" className="generate-button" disabled={loading}>
            {loading ? "Generating..." : "Generate"} {/* Show 'Generating...' when loading */}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default FigmaPromptForm;
