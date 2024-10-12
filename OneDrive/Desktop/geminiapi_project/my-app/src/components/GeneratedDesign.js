//Figma

// src/components/GeneratedDesign.js

import React, { useState } from "react";
import "./GeneratedDesign.css"; // For styling


const GeneratedDesign = ({ design, htmlCssCode, loading }) => {

  console.log("Design in GeneratedDesignFile: ",design);
  console.log("HTML CODE of MK: ",htmlCssCode);

  // State to toggle the HTML/CSS code card visibility
  const [showCode, setShowCode] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");


  // //Copies the figma file to the clipboard:
  // const copyToClipboard = (design) => {
  //   if (design) {
  //     navigator.clipboard.writeText(design)
  //       .then(() => {
  //         alert('Figma file copied to Clipboard!');
  //       })
  //       .catch(err => {
  //         console.error('Failed to copy:', err);
  //       });
  //   }
  // };

  // //Copies the figma file to the clipboard:
  // const copyToClipboard_html = (htmlCssCode) => {
  //   if (htmlCssCode) {
  //     navigator.clipboard.writeText(htmlCssCode)
  //       .then(() => {
  //         alert('HTML CSS Code copied to Clipboard!');
  //       })
  //       .catch(err => {
  //         console.error('Failed to copy:', err);
  //       });
  //   }
  // };
  // Copies the figma file to the clipboard:
  const copyToClipboard = (text, type) => {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopyFeedback(`${type} copied to clipboard!`);
          setTimeout(() => setCopyFeedback(""), 2000); // Clear feedback after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          setCopyFeedback(`Failed to copy ${type}. Please try again.`);
          setTimeout(() => setCopyFeedback(""), 2000); // Clear feedback after 2 seconds
        });
    }
  };

  // Toggles the display of the code card
  const handleShowCode = () => {
    setShowCode(!showCode); // Toggles between showing and hiding the card
  };



  return (
    <div className="generated-design-container">
      <h3>Generated Design:</h3>
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
      <div className="button-container">
        {/* Figma Button */}
        {!loading && design && (
          <button className="figma-button" onClick={() => copyToClipboard(design, 'Figma file')}>
            <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h9V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM2 3v11h12V3H2zM4 4h8v1H4V4z"/>
              </svg>
            </span>
            Figma
          </button>
        )}

        {/* Code Button */}
        {!loading && htmlCssCode && (
          <button className="code-button" onClick={handleShowCode}>
            <span className="icon" aria-hidden="true" style={{ marginRight: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-code" viewBox="0 0 16 16">
                <path d="M5.719 15.093a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L5.25 13.47l3.97-3.97-3.97-3.97a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4z"/>
                <path d="M10.28 13.47a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 1.06-1.06L10.25 12.47l3.97-3.97-3.97-3.97a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4z"/>
              </svg>
            </span>
            Code
          </button>
        )}
      </div>

      {/* Display Combined HTML/CSS Code in Card Format */}
      {showCode && (
        
        <div className="code-card">
          <h4>Generated HTML and CSS Code:</h4>
          <pre className="code-block">
            {htmlCssCode ? htmlCssCode : "HTML/CSS code not available"}
          </pre>
          <div className="button-container">
          {/* Copy Button for HTML/CSS */}
          <button className="copy-button" onClick={() => copyToClipboard(htmlCssCode, 'HTML/CSS Code')}>
            Copy HTML/CSS Code
          </button>
          {/* Close Button */}
          <button className="close-button" onClick={handleShowCode}>
            Close
          </button>
          
        </div>
        <p></p>
        {/* Feedback message for copy actions */}
        {copyFeedback && <div className="copy-feedback">{copyFeedback}</div>}
        </div>
      )}
    </div>
  );
};

export default GeneratedDesign;
