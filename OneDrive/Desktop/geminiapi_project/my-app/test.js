//Figma

// src/components/GeneratedDesign.js

import React, { useState } from "react";
import "./GeneratedDesign.css"; // For styling
import ComponentCard from './ComponentCard'; // Adjust the path if necessary
import { generate_components } from './ComponentGenerator'; // Import the generate_components function
import { FaRegFileAlt } from 'react-icons/fa'; // Use any icon that resembles Figma


const GeneratedDesign = ({ design_type,designType, designPages, htmlCssCodePages, design, htmlCssCode, loading, prompt_input }) => {

  

  // State to toggle the HTML/CSS code card visibility
  const [showCodeModal, setShowCodeModal] = useState(false); // State for code modal visibility
  const [copyFeedback, setCopyFeedback] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Code"); // New state for button text
  const [copyButtonTextfigma, setCopyButtonTextfigma] = useState("Figma");
  const [loading2, setLoading] = useState(false); // Loading state


  // New state for components(components)
  const [showComponentModal, setShowComponentModal] = useState(false);
  const [components, setComponents] = useState([]); // State for generated components
  // const [current_index, set_current_index] = useState(0); // State to track the current index of the component
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0); // State to track the current index of the component

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
      setCurrentComponentIndex(0); // Reset the index to the first component
      setShowComponentModal(true); // Show the components modal
    } catch (error) {
      console.error("Error generating components:", error); // Handle any errors
    } finally {
      setLoading(false); // Set loading to false after the generation is complete
    }
  }
};


  const copyToClipboard = (text, type) => {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
            setCopyButtonText("Copied!"); // Change button text to "Copied!"
            setTimeout(() => setCopyButtonText("Copy Code"), 2000); // Reset after 2 seconds  
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
      {design_type === "Page" ? (
        // Single Page Design Rendering
        <>
          {design ? (
            <div
              className="design-output"
              dangerouslySetInnerHTML={{ __html: design }}
            />
          ) : (
            <p>No design generated yet.</p>
          )}
          {/* Buttons for single page */}
          <div className="button-group">
            <div className="button-container">
              {/* Figma Button */}
              {!loading && design && (
              <button className="figma-button" onClick={() => copyToClipboard(design, 'Figma file')}>
                <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
                    <FaRegFileAlt /> {/* Replace this with a relevant icon */}
                </span>
                {copyButtonTextfigma}
              </button>
            )}

              {/* Code Button */}
              {!loading && htmlCssCode && (
              <button className="code-button" onClick={toggleCodeModal}>
                Code
              </button>
            )}

              {/* Components Button */}
              {!loading && (
              <button className="components-button" onClick={handleGenerateComponents} disabled={loading2}>
              {loading2 ? "Loading..." : "Web Components"}
            </button>
            )}
            </div>
          </div>
        </>
      ) : (
        // Multi-Page Design Rendering
        <>
          {design && design.length > 0 ? (
            <>
              <div
                className="design-output"
                dangerouslySetInnerHTML={{ __html: design[currentPageIndex].svg }}
              />
              {/* Pagination buttons for multiple pages */}
              <div className="pagination-buttons">
                <button
                  className="prev-button"
                  onClick={handlePreviousPage}
                  disabled={currentPageIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={handleNextPage}
                  disabled={currentPageIndex === design.length - 1}
                >
                  Next
                </button>
              </div>
              {/* Buttons for multi-page */}
              <div className="button-group">
                <div className="button-container">
                  {/* Figma Button */}
                  {!loading && (
                    <button
                      className="figma-button"
                      onClick={() => copyToClipboard(design[currentPageIndex].svg, 'Figma file')}
                    >
                      {copyButtonTextfigma}
                    </button>
                  )}

                  {/* Code Button */}
                  {!loading && htmlCssCode && htmlCssCode.length > 0 && (
                    <button className="code-button" onClick={toggleCodeModal}>
                    <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
                        <FaRegFileAlt /> {/* Replace this with a relevant icon */}
                    </span>
                    Code
                  </button>
                    
                  )}

                  {/* Components Button */}
                  {!loading && (
                    <button className="components-button" onClick={handleGenerateComponents} disabled={loading2}>
                    {loading2 ? "Loading..." : "Web Components"}
                  </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p>No designs available.</p>
          )}
        </>
      )}
        {/* Feedback message for copy actions */}
        {copyFeedback && <div className="copy-feedback">{copyFeedback}</div>} 
      
       {/* Modal Pop-Up for displaying components */}
       {showComponentModal && (
        <div className="modal">
          <div className="overlay" onClick={() => setShowComponentModal(false)}></div>
          <div className="modal-content">
            <div className="fixed-header">
              <div className="modal-title">Generated Components:</div>
              <div className="button-container3">
                <button className="copy-button" onClick={handleCopyComponent}>
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
                  <ComponentCard component={components[currentComponentIndex]} />
                </div>
              ) : (
                <p>No components generated</p>
              )}
            </div>
            {/* Previous and Next buttons for components */}
            <div className="button-container2">
              <button
                onClick={handlePreviousComponent}
                disabled={currentComponentIndex === 0}
                className="prev-button"
              >
                Previous
              </button>

              <button
                onClick={handleNextComponent}
                disabled={currentComponentIndex === components.length - 1}
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
              <div className="modal-title">Code:</div>
              <div className="modal-buttons">
                <button
                  className="copy-button"
                  onClick={() => {
                    if (designType === "Page") {
                      copyToClipboard(htmlCssCode, "HTML/CSS Code");
                    } else {
                      copyToClipboard(htmlCssCode[currentPageIndex].svg, "HTML/CSS Code");
                    }
                  }}
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
                {design_type === "Page"
                  ? htmlCssCode || "HTML/CSS code not available"
                  : htmlCssCode
                  ? htmlCssCode[currentPageIndex].htmlCss
                  : "HTML/CSS code not available"}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default GeneratedDesign;