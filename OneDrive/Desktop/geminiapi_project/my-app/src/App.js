// import React from 'react';
// import GeminiPrompt from './GeminiPrompt';

// function App() {
//   return (
//     <div className="App">
//       <GeminiPrompt />
//     </div>
//   );
// }

// export default App;

// src/App.js

// import React from 'react';
import React, { useState } from "react";
// import ButtonComponent from './components/ButtonComponent';
// import Button from './components/Button';
import ComponentGenerator from './components/ComponentGenerator';
// import CreateContentType from './CreateContentType';
import CreateContentType from './contenttypecreation/CreateContentType';
import ContentTypes from './contenttypecreation/ContentTypes';
//figma
import FigmaPromptForm from "./components/FigmaPromptForm";
import GeneratedDesign from "./components/GeneratedDesign";
import "./App.css"; // For overall styling


const App = () => {
  
  const [designData, setDesignData] = useState({ svgContent: "", htmlCssCode: "" });

  return (
    <div>
      <div className="App">
      <div className="container">
          {/* Generate design and set both svgContent and htmlCssCode */}
          <FigmaPromptForm onGenerate={(svgContent, htmlCssCode) => setDesignData({ svgContent, htmlCssCode })} />
          
          {/* Render GeneratedDesign component with both svgContent and htmlCssCode */}
          {designData.svgContent && (
            <GeneratedDesign 
              design={designData.svgContent} 
              htmlCssCode={designData.htmlCssCode} 
            />
          )}
        </div>
      </div>
      <ComponentGenerator />
      <CreateContentType />
      <ContentTypes />
    </div>
  );
};

export default App;
