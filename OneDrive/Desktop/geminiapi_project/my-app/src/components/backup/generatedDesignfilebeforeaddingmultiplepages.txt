//Figma

// src/components/GeneratedDesign.js

import React, { useState, useEffect } from "react";
import "./GeneratedDesign.css"; // For styling
import ComponentCard from './ComponentCard'; // Adjust the path if necessary
import { generate_components } from './ComponentGenerator'; // Import the generate_components function
import { PulseLoader } from 'react-spinners'; // Make sure to import the PulseLoader component


const GeneratedDesign = ({ designType, designPages, htmlCssCodePages, design, htmlCssCode, loading, prompt_input }) => {

  console.log("Design Type of MK: ",designType);
  // if(designType === "Page"){

  // }
  // else{
    
  // }

  

  // State to toggle the HTML/CSS code card visibility
  const [showCodeModal, setShowCodeModal] = useState(false); // State for code modal visibility
  const [copyFeedback, setCopyFeedback] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Code"); // New state for button text
  const [copyButtonTextfigma, setCopyButtonTextfigma] = useState("Figma");
  const [loading2, setLoading] = useState(false); // Loading state


  // New state for components(components)
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [components, setComponents] = useState([]); // State for generated components
  const [current_index, set_current_index] = useState(0); // State to track the current index of the component
  const [copyButtonTextcom, setCopyButtonTextcom] = useState("Copy Code");  


  // State for multi-page navigation
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track the current page index

  // Toggles the modal display and manages background scroll
  const toggleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  // Function to handle component generation when "Web Components" button is clicked
const handleGenerateComponents = async () => {
  if (prompt_input) {
    setLoading(true); // Set loading to true when the function starts
    try {
      const generatedComponents = await generate_components(prompt_input); // Await the promise to resolve
      console.log("Generated components: ", generatedComponents);
      setComponents(generatedComponents); // Set the state with the generated components
      set_current_index(0); // Reset the index to the first component
      setShowComponentModal(true); // Show the components modal
    } catch (error) {
      console.error("Error generating components:", error); // Handle any errors
    } finally {
      setLoading(false); // Set loading to false after the generation is complete
    }
  }
};

    // Handle next page button click
   const handleNextPage = () => {
      if (currentPageIndex < designPages.length - 1) {
        setCurrentPageIndex(currentPageIndex + 1);
      }
   };

    // Handle previous page button click
   const handlePreviousPage = () => {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
      }
   };

   // Handle next button click
   const handle_next = () => {
    if (current_index < components.length - 1) {
      set_current_index(current_index + 1);
    }
  };

  // Handle previous button click
  const handle_previous = () => {
    if (current_index > 0) {
      set_current_index(current_index - 1);
    }
  };


  useEffect(() => {
    if (showCodeModal) {
      document.body.classList.add("no-scroll"); // Disable body scroll
    } else {
      document.body.classList.remove("no-scroll"); // Enable body scroll
    }
  }, [showCodeModal]);

  useEffect(() => {
    if (showComponentModal) {
      document.body.classList.add("no-scroll"); // Disable body scroll
    } else {
      document.body.classList.remove("no-scroll"); // Enable body scroll
    }
    
    // Clean up on component unmount
    return () => {
      document.body.classList.remove("no-scroll"); // Ensure scroll is enabled if modal is closed
    };
  }, [showComponentModal]);

  const handle_copy = () => {
    if (components.length > 0) {
      const currentCode = components[current_index].react_code;
      copyToClipboard(currentCode, "React code"); // Pass the React code and type
    }
  };

  // Copies the figma file to the clipboard:
  const copyToClipboard = (text, type) => {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log("typemk: ",type);
          if (type === "React code") {
            setCopyButtonTextcom("Copied!"); // Change button text to "Copied!"
            setTimeout(() => setCopyButtonTextcom("Copy Code"), 2000); // Reset after 2 seconds
          }
          else if(type === "Figma file"){
            setCopyButtonTextfigma("Copied!"); // Change button text to "Copied!"
            setTimeout(() => setCopyButtonTextfigma("Figma"), 2000); // Reset after 2 seconds
          }
          else{
            setCopyButtonText("Copied!"); // Change button text to "Copied!"
            setTimeout(() => setCopyButtonText("Copy Code"), 2000); // Reset after 2 seconds
          }
          
          // setCopyFeedback(`${type} copied to clipboard!`);
          // setTimeout(() => setCopyFeedback(""), 2000); // Clear feedback after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          setCopyFeedback(`Failed to copy ${type}. Please try again.`);
          setTimeout(() => setCopyFeedback(""), 2000); // Clear feedback after 2 seconds
        });
    }
  };


  return (
    <div className="generated-design-container">
      <h3 className="generated-design-name">Generated Design:</h3>
      {design ? (
        <div
          className="design-output"
          dangerouslySetInnerHTML={{ __html: design }} // Insert the SVG code directly
        />
      ) : (
        <p>No design generated yet.</p>
      )}
        {/* Feedback message for copy actions */}
        {copyFeedback && <div className="copy-feedback">{copyFeedback}</div>}
       {/* Button container to align both buttons horizontally */}
       <div className="button-group">
      <div className="button-container">
        {/* Figma Button */}
        {!loading && design && (
          <button className="figma-button" onClick={() => copyToClipboard(design, 'Figma file')}>
            <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h9V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM2 3v11h12V3H2zM4 4h8v1H4V4z"/>
              </svg>
            </span>
            {copyButtonTextfigma}
          </button>
        )}

        {/* Code Button */}
        {!loading && htmlCssCode && (
          <button className="code-button" onClick={toggleCodeModal}>
            <span className="icon" aria-hidden="true" style={{ marginRight: "8px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-code"
                viewBox="0 0 16 16"
              >
                <path d="M5.719 15.093a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L5.25 13.47l3.97-3.97-3.97-3.97a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4z" />
                <path d="M10.28 13.47a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06L10.25 12.47l3.97-3.97-3.97-3.97a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4z" />
              </svg>
            </span>
            Code
          </button>
        )}
        {/* Components Button */}
        {!loading && (
          <button className="components-button" onClick={handleGenerateComponents} disabled={loading2}>
          <span className="icon" aria-hidden="true" style={{ marginRight: "8px" }}>
            {loading2 ? (
              <PulseLoader color="#ffffff" size={8} /> // Loader displayed while loading
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                <path d="M8 0a.5.5 0 0 1 .5.5v1.01L12.49 4h3.75a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3.75L7.5 1.51V.5A.5.5 0 0 1 8 0zM1 5v9h14V5H1zm3.5 2.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zM8 7.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm4.5 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
              </svg>
            )}
          </span>
          {loading2 ? "Loading..." : "Web Components"}
        </button>
        )}
        </div>
      </div>
      {/* Modal Pop-Up for displaying components */}
      {showComponentModal && (
        <div className="modal">
          <div className="overlay" onClick={() => setShowComponentModal(false)}></div>
          <div className="modal-content">
            <div className="fixed-header">
              <div className="modal-title">Generated Components:</div>
              <div className="button-container3">
              <button className="copy-button" onClick={handle_copy}>
              {copyButtonTextcom}
              </button>
              <button className="close-button" onClick={() => setShowComponentModal(false)}>
                Close
              </button>
              </div>
            </div>

            {/* Display the current component */}
            <div className="content">
              {components.length > 0 ? (
                <div>
                  {/* Display the current component */}
                  <ComponentCard component={components[current_index]} />
                </div>
                
              ) : (
                <p>No components generated</p>
              )}
            </div>
            {/* Previous and Next buttons */}
            <div className="button-container2">
            <button
                    onClick={handle_previous}
                    disabled={current_index === 0}
                    className="prev-button"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handle_next}
                    disabled={current_index === components.length - 1}
                    className="next-button"
                  >
                    Next
              </button>
              </div>
          </div>
        </div>
      )}
      {/* Modal Pop-Up for displaying HTML/CSS Code */}
      {showCodeModal && (
        <div className="modal">
          <div className="overlay" onClick={toggleCodeModal}></div>
          <div className="modal-content">
            {/* Fixed Header for Copy and Close buttons */}
            <div className="fixed-header">
              <div className="modal-title">Code:</div> {/* Title of the Modal */}
              <div className="modal-buttons">
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(htmlCssCode, "HTML/CSS Code")}
                >
                  {copyButtonText}
                </button>
                <button className="close-button" onClick={toggleCodeModal}>
                  Close
                </button>
              </div>
            </div>
            
            {/* Scrollable content area */}
            <div className="content">
              <pre className="code-block">
                {htmlCssCode ? htmlCssCode : "HTML/CSS code not available"}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default GeneratedDesign;