// src/App.js

// import React from 'react';
import React, { useState, useEffect } from "react";
// import ButtonComponent from './components/ButtonComponent';
//figma
import FigmaPromptForm from "./components/FigmaPromptForm";
import GeneratedDesign from "./components/GeneratedDesign";
import RightSidebar from './components/RightSidebar'; // Import the Sidebar Component
import "./App.css"; // For overall styling

const App = () => {
  console.log("App.js Running");
  // const [designData, setDesignData] = useState({ svgContent: "", htmlCssCode: "",prompt:"",design_type:"" });
  // const [allPageData, setAllPageData] = useState({ allPageSVGs: [], allPageHTMLCSS: [], prompt: [] ,design_type:""});
  // const [contentTypes, setContentTypes] = useState([]); // State to store content types

  // Initialize state with values from localStorage if available
  const [designData, setDesignData] = useState(() => {
    const storedData = localStorage.getItem('designData');
    return storedData ? JSON.parse(storedData) : { svgContent: "", htmlCssCode: "", prompt: "", design_type: "" };
  });

  const [allPageData, setAllPageData] = useState(() => {
    const storedPageData = localStorage.getItem('allPageData');
    return storedPageData ? JSON.parse(storedPageData) : { allPageSVGs: [], allPageHTMLCSS: [], prompt: [], design_type: "" };
  });

  const [contentTypes, setContentTypes] = useState(() => {
    const storedContentTypes = localStorage.getItem('contentTypes');
    return storedContentTypes ? JSON.parse(storedContentTypes) : [];
  });

  const [designType, setDesignType] = useState("Website"); // Default to "Website"

  useEffect(() => {
    // Store data in localStorage whenever it changes
    localStorage.setItem('designData', JSON.stringify(designData));
    localStorage.setItem('allPageData', JSON.stringify(allPageData));
    localStorage.setItem('contentTypes', JSON.stringify(contentTypes));
  }, [designData, allPageData, contentTypes]);

  // console.log("App.js designType:", designType);
  // console.log("App.js designData:", designData);
  // console.log("App.js allPageData:", allPageData);
  // console.log("App.js ContentType: ",contentTypes);
  // console.log("App.js allpage prompt: ",allPageData.prompt);
  // console.log("App.js designData prompt: ",designData.prompt);
  const handleClearContentTypes = () => {
    setContentTypes([]); // Clear the content types
    setDesignData({ svgContent: "", htmlCssCode: "", prompt: "", design_type: "" }); // Reset designData
    setAllPageData({ allPageSVGs: [], allPageHTMLCSS: [], prompt: [], design_type: "" }); // Reset allPageData
    localStorage.clear(); // Clear localStorage if you want to reset everythinglocalStorage.clear(); // Clear localStorage if you want to reset everything
  };

  console.log("App.js Running Finished");
  return (
    <div>
      <div className="App">
      <div className="container">
      <div className="main-content">
      
          {/* Generate design and set both svgContent and htmlCssCode */}
          {/* <FigmaPromptForm onGenerate={(svgContent, htmlCssCode,prompt_input) => setDesignData({ svgContent, htmlCssCode, prompt_input })}
          designType={designType} // Pass the current design type
          setDesignType={setDesignType} // Pass the setter function to update design type
          /> */}
<FigmaPromptForm
        onGenerate={designType === "Page" 
          ? (svgContent, htmlCssCode, prompt,design_type,content_types) => {
              // If designType is "Page"
              setDesignData({ svgContent, htmlCssCode, prompt,design_type }) 
              setContentTypes(content_types);
            } 
          : (allPageSVGs, allPageHTMLCSS, prompt,design_type,content_types) => {
              // If designType is not "Page"
              setAllPageData({ allPageSVGs, allPageHTMLCSS, prompt,design_type });
              // Add this line to set the content types after setting all page data
              setContentTypes(content_types);
            }
          
        } 
        designType={designType} // Pass the current design type
        setDesignType={setDesignType} // Pass the setter function to update design type
        onClear={handleClearContentTypes} // Pass the clear handler
        />
      <div className="generated-design-sections">
          {/* Render GeneratedDesign component with both svgContent and htmlCssCode */}
          {designType === "Page" ? (
        designData.svgContent && (
          <GeneratedDesign 
            design_type={designData.design_type}
            designType={designType} 
            htmlCssCode={designData.htmlCssCode} 
            design={designData.svgContent} 
            prompt={designData.prompt}
          />
        )
      ) : (
        allPageData.allPageSVGs.length > 0 && (
          <GeneratedDesign 
            design_type = {allPageData.design_type}
            designType={designType} // Pass the selected design type
            designPages={allPageData.allPageSVGs} 
            htmlCssCodePages={allPageData.allPageHTMLCSS} 
            prompt={allPageData.prompt} 
            // htmlCssCode={designData.htmlCssCode} 
            // prompt_input={designData.prompt_input}
          />
        )
      )}
      </div>

      </div>
      {/* Add the RightSidebar Component and pass the contentTypes */}
      <RightSidebar contentTypes={contentTypes} />
        </div>
        
      </div>
      
    </div>
  );
  
};

export default App;
