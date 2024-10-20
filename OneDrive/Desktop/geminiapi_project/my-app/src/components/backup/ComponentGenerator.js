import React, { useState } from 'react';
import { generateComponentFromPrompt } from '../../services/aiService'; // Adjust the import path as needed
// import DynamicComponent from '../components/DynamicComponent';


const ComponentGenerator = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [generatedComponent, setGeneratedComponent] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    try {
      const componentCode = await generateComponentFromPrompt(userPrompt);
      console.log('Generated Component Code:', componentCode);

      setGeneratedComponent(componentCode);  // Save the generated code as a string
      setError('');
    } catch (error) {
      console.error('Error generating component:', error);
      setError('Error generating component');
    }
  };

  return (
    <div>
      <h1>Prompt to React Component Generator</h1>
      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Enter your prompt here"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleGenerate}>Generate Component</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the generated component as a code snippet */}
      {generatedComponent && (
        <div>
          <h2>Generated React Component:</h2>
          <pre>
            <code>{generatedComponent}</code>
          </pre>
        </div>
      )}

      {/* Dynamically render the generated component */}
      {/* {generatedComponent && (
        <div>
          <h2>Rendered Component Preview:</h2>
          <DynamicComponent componentCode={generatedComponent} />
        </div>
      )} */}
    </div>
  );
};

export default ComponentGenerator;


