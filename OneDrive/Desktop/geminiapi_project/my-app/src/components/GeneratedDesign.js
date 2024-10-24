//Figma

// src/components/GeneratedDesign.js

import React, { useState } from "react";
import "./GeneratedDesign.css"; // For styling
import ComponentCard from './ComponentCard'; // Adjust the path if necessary
import { generate_components } from './ComponentGenerator'; // Import the generate_components function
import { PulseLoader } from 'react-spinners'; // Make sure to import the PulseLoader component
import { FaRegFileAlt } from 'react-icons/fa'; // Use any icon that resembles Figma


const GeneratedDesign = ({ design_type,designType, designPages, htmlCssCodePages, design, htmlCssCode, loading, prompt }) => {

  console.log("GenerateDesign File is Running: ");
  // console.log("Design_type of MK: ",design_type);
  // console.log("Design Type of MK: ",designType);
  // console.log("designPages: ",designPages);
  // console.log("htmlCssCodePages: ",htmlCssCodePages);
  // console.log("================================================");
  // console.log("GeneratedDesign.js: design of MK: ", design);
  // console.log("GeneratedDesign.js: htmlCssCode of MK: ", htmlCssCode);
  // console.log("GeneratedDesign.js: Loading of MK: ", designType);
  // console.log("GeneratedDesign.js: Prompt_input of MK: ", prompt);
  

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
  const [copyButtonTextcom, setCopyButtonTextcom] = useState("Copy Code");  


  // State for multi-page navigation
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State to track the current page index

  // Toggles the modal display and manages background scroll
  const toggleCodeModal = () => {
    setShowCodeModal(!showCodeModal);
  };

  // Function to handle component generation when "Web Components" button is clicked
const handleGenerateComponents = async () => {
  if (prompt) {
    setLoading(true); // Set loading to true when the function starts
    try {
      const generatedComponents = await generate_components(prompt); // Await the promise to resolve
      // console.log("Generated components: ", generatedComponents);
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
  //  const handle_next = () => {
  //   if (current_index < components.length - 1) {
  //     set_current_index(current_index + 1);
  //   }
  // };

  // // Handle previous button click
  // const handle_previous = () => {
  //   if (current_index > 0) {
  //     set_current_index(current_index - 1);
  //   }
  // };

  // Handle next component button click
  const handleNextComponent = () => {
    if (currentComponentIndex < components.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    }
  };

  // Handle previous component button click
  const handlePreviousComponent = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    }
  };

  const handleCopyComponent = () => {
    if (components.length > 0) {
      const currentCode = components[currentComponentIndex].react_code;
      copyToClipboard(currentCode, "React code");
    }
  };

  // // // No-Scroll when the card is Opened Code Effect

  //import React, { useState, useEffect } from "react";when this code is added to the code snippet to import this

  // useEffect(() => {
  //   if (showCodeModal) {
  //     document.body.classList.add("no-scroll"); // Disable body scroll
  //   } else {
  //     document.body.classList.remove("no-scroll"); // Enable body scroll
  //   }
  // }, [showCodeModal]);

  // useEffect(() => {
  //   if (showComponentModal) {
  //     document.body.classList.add("no-scroll"); // Disable body scroll
  //   } else {
  //     document.body.classList.remove("no-scroll"); // Enable body scroll
  //   }
    
  //   // Clean up on component unmount
  //   return () => {
  //     document.body.classList.remove("no-scroll"); // Ensure scroll is enabled if modal is closed
  //   };
  // }, [showComponentModal]);

  // // // 



  // const handle_copy = () => {
  //   if (components.length > 0) {
  //     const currentCode = components[current_index].react_code;
  //     copyToClipboard(currentCode, "React code"); // Pass the React code and type
  //   }
  // };

  // Copies the figma file to the clipboard:
  const copyToClipboard = (text, type) => {
    // console.log("COPIED TO CLIPBOARD HTML CSS: ",text);
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          // console.log("typemk: ",type);
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
      <h3 className="generated-design-name">FIGMA DESIGN</h3>
      {design_type === "Page" ? (
        // Single Page Design Rendering
        <>
          {designPages ? (
            <div
              className="design-output"
              dangerouslySetInnerHTML={{ __html: designPages }}
            />
          ) : (
            <p>No design generated yet.</p>
          )}
          {/* Buttons for single page */}
          <div className="button-group">
            <div className="button-container">
              {/* Figma Button */}
              {!loading && designPages && (
              <button className="figma-button" onClick={() => copyToClipboard(designPages, 'Figma file')}>
                <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
                    <FaRegFileAlt /> {/* Replace this with a relevant icon */}
                </span>
                {copyButtonTextfigma}
              </button>
            )}

              {/* Code Button */}
              {!loading && htmlCssCodePages && (
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
        </>
      ) : (
        // Multi-Page Design Rendering
        <>
          {designPages && designPages.length > 0 ? (
            <>
              <div
                className="design-output"
                dangerouslySetInnerHTML={{ __html: designPages[currentPageIndex].svg }}
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
                  disabled={currentPageIndex === designPages.length - 1}
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
                      onClick={() => copyToClipboard(designPages[currentPageIndex].svg, 'Figma file')}
                    >
                      <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h9V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM2 3v11h12V3H2zM4 4h8v1H4V4z"/>
                      </svg>
                      </span>
                      {copyButtonTextfigma}
                    </button>
                  )}

                  {/* Code Button */}
                  {!loading && htmlCssCodePages && htmlCssCodePages.length > 0 && (
                    <button className="code-button" onClick={toggleCodeModal}>
                    {/* <span className="icon" aria-hidden="true" style={{ marginRight: "8px" }}>
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
                    </span> */}
                    <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
                        <FaRegFileAlt /> {/* Replace this with a relevant icon */}
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
                    if (design_type === "Page") {
                      copyToClipboard(htmlCssCodePages, "HTML/CSS Code");
                    } else {
                      copyToClipboard(htmlCssCodePages[currentPageIndex].htmlCss, "HTML/CSS Code");
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
                  ? htmlCssCodePages || "HTML/CSS code not available"
                  : htmlCssCodePages
                  ? htmlCssCodePages[currentPageIndex].htmlCss
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