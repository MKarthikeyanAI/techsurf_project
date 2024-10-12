// import React, { useState } from 'react';
// import axios from 'axios';

// const GeminiPrompt = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleInputChange = (event) => {
//     setPrompt(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Access the API key from the environment variable
      
//       // URL for the Gemini API
//       const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
      
//       // Payload structure as per the curl command
//       const data = {
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt // Use the user input as the text part
//               }
//             ]
//           }
//         ]
//       };

//       const apiResponse = await axios.post(url, data, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       // Extract the response text
//       const textResponse = apiResponse.data.candidates[0].content.parts[0].text;

//       // Set the response directly to the state
//       setResponse(textResponse); 
//     } catch (err) {
//       setError(err.message || 'An error occurred while fetching data.');
//       console.error(err); // Log the error for debugging
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to escape HTML for safe rendering
//   const escapeHtml = (unsafe) => {
//     return unsafe
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");
//   };

//   return (
//     <div>
//       <h1>Gemini API Prompt</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={prompt}
//           onChange={handleInputChange}
//           placeholder="Enter your prompt"
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {response && (
//         <div>
//           <h2>Rendered Web Component:</h2>
//           <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
//             <h3>Component Code:</h3>
//             <pre>
//               <code>{escapeHtml(response)}</code>
//             </pre>
//             <h3>Usage:</h3>
//             <pre>
//               <code>{escapeHtml(`import Card from './Card';\nconst myCard = () => {}`)}</code>
//             </pre>
//             <h3>CSS Styling (optional):</h3>
//             <pre>
//               <code>{escapeHtml(`.card {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px;\n  width: 300px;\n  margin: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.card-image {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  margin-bottom: 10px;\n}\n.card-content {\n  text-align: left;\n}\n.card-title {\n  font-size: 1.2rem;\n  margin-bottom: 5px;\n}\n.card-description {\n  font-size: 1rem;\n  line-height: 1.5;\n}`)}</code>
//             </pre>
//             <h3>Explanation:</h3>
//             <p>The <code>Card</code> component takes three props: <code>imageSrc</code>, <code>title</code>, and <code>description</code>. It renders an <code>img</code> tag with the <code>imageSrc</code> as the <code>src</code> attribute and the <code>title</code> as the <code>alt</code> attribute. The <code>card-content</code> div contains the <code>card-title</code> (h2 tag) and the <code>card-description</code> (p tag). The CSS styles the card with a border, padding, and a box shadow. You can customize the CSS to fit your design needs. This is a simple card component that you can customize further to suit your specific requirements.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GeminiPrompt;

// import React, { useState } from 'react';
// import axios from 'axios';

// const GeminiPrompt = () => {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleInputChange = (event) => {
//     setPrompt(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Access the API key from the environment variable
      
//       // URL for the Gemini API
//       const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
      
//       // Payload structure as per the curl command
//       const data = {
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt // Use the user input as the text part
//               }
//             ]
//           }
//         ]
//       };

//       const apiResponse = await axios.post(url, data, {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       // Extract the response text
//       const textResponse = apiResponse.data.candidates[0].content.parts[0].text;

//       // Set the response directly to the state
//       setResponse(textResponse); 
//     } catch (err) {
//       setError(err.message || 'An error occurred while fetching data.');
//       console.error(err); // Log the error for debugging
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to escape HTML for safe rendering
//   const escapeHtml = (unsafe) => {
//     return unsafe
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#039;");
//   };

//   return (
//     <div>
//       <h1>Gemini API Prompt</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={prompt}
//           onChange={handleInputChange}
//           placeholder="Enter your prompt"
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {response && (
//         <div style={{ marginTop: '20px' }}>
//           <h2>Rendered Web Component:</h2>
//           <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
//             <h3>Component Code:</h3>
//             <pre>
//               <code>{escapeHtml(response)}</code>
//             </pre>
//             <h3>Usage:</h3>
//             <pre>
//               <code>{escapeHtml(`import Card from './Card';\nconst myCard = () => {}`)}</code>
//             </pre>
//             <h3>CSS Styling (optional):</h3>
//             <pre>
//               <code>{escapeHtml(`.card {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px;\n  width: 300px;\n  margin: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.card-image {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  margin-bottom: 10px;\n}\n.card-content {\n  text-align: left;\n}\n.card-title {\n  font-size: 1.2rem;\n  margin-bottom: 5px;\n}\n.card-description {\n  font-size: 1rem;\n  line-height: 1.5;\n}`)}</code>
//             </pre>
//             <h3>Explanation:</h3>
//             <p>
//               The <code>Card</code> component takes three props: <code>imageSrc</code>, <code>title</code>, and <code>description</code>. It renders an <code>img</code> tag with the <code>imageSrc</code> as the <code>src</code> attribute and the <code>title</code> as the <code>alt</code> attribute. The <code>card-content</code> div contains the <code>card-title</code> (h2 tag) and the <code>card-description</code> (p tag). The CSS styles the card with a border, padding, and a box shadow. You can customize the CSS to fit your design needs. This is a simple card component that you can customize further to suit your specific requirements.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GeminiPrompt;


import React, { useState } from 'react';
import axios from 'axios';

const GeminiPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handles the change in user input
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Access API key from environment variable
      
      // Gemini API endpoint
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
      
      // Payload to send to the API
      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt // Send user input as prompt
              }
            ]
          }
        ]
      };

      const apiResponse = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Extract the response text from API
      const textResponse = apiResponse.data.candidates[0].content.parts[0].text;
      setResponse(textResponse); // Set the response text to state

    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.'); // Handle errors
      console.error(err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Escapes HTML for safe rendering
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return (
    <div>
      <h1>Gemini API Prompt</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Rendered Web Component:</h2>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h3>Component Code:</h3>
            <pre>
              <code>{escapeHtml(response)}</code>
            </pre>

            <h3>Usage:</h3>
            <pre>
              <code>{escapeHtml(`import Card from './Card';\nconst myCard = () => {}`)}</code>
            </pre>

            <h3>CSS Styling (optional):</h3>
            <pre>
              <code>{escapeHtml(`.card {\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  padding: 15px;\n  width: 300px;\n  margin: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.card-image {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n  margin-bottom: 10px;\n}\n.card-content {\n  text-align: left;\n}\n.card-title {\n  font-size: 1.2rem;\n  margin-bottom: 5px;\n}\n.card-description {\n  font-size: 1rem;\n  line-height: 1.5;\n}`)}</code>
            </pre>

            <h3>Explanation:</h3>
            <p>
              The <code>Card</code> component takes three props: <code>imageSrc</code>, <code>title</code>, and <code>description</code>. It renders an <code>img</code> tag with the <code>imageSrc</code> as the <code>src</code> attribute and the <code>title</code> as the <code>alt</code> attribute. The <code>card-content</code> div contains the <code>card-title</code> (h2 tag) and the <code>card-description</code> (p tag). The CSS styles the card with a border, padding, and a box shadow. You can customize the CSS to fit your design needs. This is a simple card component that you can customize further to suit your specific requirements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiPrompt;

