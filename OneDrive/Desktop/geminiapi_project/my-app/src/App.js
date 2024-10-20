// src/App.js

// import React from 'react';
import React, { useState } from "react";
// import ButtonComponent from './components/ButtonComponent';
// import Button from './components/Button';
// import ComponentGenerator from './components/ComponentGenerator';
// import CreateContentType from './CreateContentType';
import CreateContentType from './contenttypecreation/CreateContentType';
import ContentTypes from './contenttypecreation/ContentTypes';
//figma
import FigmaPromptForm from "./components/FigmaPromptForm";
import GeneratedDesign from "./components/GeneratedDesign";
import RightSidebar from './components/RightSidebar'; // Import the Sidebar Component
import "./App.css"; // For overall styling

const App = () => {
  console.log("App.js Running");
  const [designData, setDesignData] = useState({ svgContent: "", htmlCssCode: "",prompt_input:"",design_type:"" });
  const [allPageData, setAllPageData] = useState({ allPageSVGs: [], allPageHTMLCSS: [], prompts: {} ,design_type:""});
  const [contentTypes, setContentTypes] = useState([]); // State to store content types

  // State for the design type (Page or Website)
  const [designType, setDesignType] = useState("Page"); // Default to "Page"

  console.log("App.js designType:", designType);
  console.log("App.js designData:", designData);
  console.log("App.js allPageData:", allPageData);
  console.log("App.js ContentType: ",contentTypes);

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
          ? (svgContent, htmlCssCode, prompt_input,design_type) => {
              // If designType is "Page"
              setDesignData({ svgContent, htmlCssCode, prompt_input,design_type }) 
              setContentTypes(content_types);
            } 
          : (allPageSVGs, allPageHTMLCSS, prompts,design_type) => {
              // If designType is not "Page"
              setAllPageData({ allPageSVGs, allPageHTMLCSS, prompts,design_type });
              // Add this line to set the content types after setting all page data
              setContentTypes(content_types);
            }
        } 
        designType={designType} // Pass the current design type
        setDesignType={setDesignType} // Pass the setter function to update design type
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
            prompt_input={designData.prompt_input}
          />
        )
      ) : (
        allPageData.allPageSVGs.length > 0 && (
          <GeneratedDesign 
            design_type = {allPageData.design_type}
            designType={designType} // Pass the selected design type
            designPages={allPageData.allPageSVGs} 
            htmlCssCodePages={allPageData.allPageHTMLCSS} 
            // design={designData.svgContent} 
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
      
      {/* <ComponentGenerator /> */}
      <CreateContentType />
      <ContentTypes />
      
    </div>
  );
  
};

export default App;
