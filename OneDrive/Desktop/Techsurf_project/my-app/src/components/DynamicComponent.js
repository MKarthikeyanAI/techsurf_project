// import React from 'react';
// import { createRoot } from 'react-dom/client';

// const DynamicComponent = ({ componentCode, componentCSS }) => {
//   const containerRef = React.useRef(null);
//   const rootRef = React.useRef(null);

//   React.useEffect(() => {
//     if (containerRef.current && componentCode) {
//       // Avoid calling createRoot multiple times on the same container
//       if (!rootRef.current) {
//         rootRef.current = createRoot(containerRef.current);
//       }

//       try {
//         // Debugging the generated component code and CSS
//         console.log("FIRST CODE: ");
//         console.log('Component Code:', componentCode); 
//         console.log("SECOND CODE: ");
//         console.log('Component CSS:', componentCSS);

//         // Inject the provided CSS into the document head
//         if (componentCSS) {
//           const styleElement = document.createElement('style');
//           styleElement.innerHTML = componentCSS;
//           document.head.appendChild(styleElement);
//         }

//         // Dynamically evaluate the component code and create a functional component

//         // eslint-disable-next-line no-new-func
//         const Component = new Function('React', `
//           return ${componentCode};
//         `)(React);

//         if (typeof Component !== 'function') {
//           throw new Error('Generated code does not return a valid React component');
//         }

//         // Render the component
//         rootRef.current.render(<Component />);
//       } catch (error) {
//         console.error('Error rendering component:', error);
//       }
//     }
//   }, [componentCode, componentCSS]);

//   return <div ref={containerRef} />;
// };

// export default DynamicComponent;


import React from 'react';
import { createRoot } from 'react-dom/client';


const DynamicComponent = ({ componentCode }) => {
  const containerRef = React.useRef(null);
  const rootRef = React.useRef(null);

  componentCode = `
  ({ label, color, size, onClick }) => {
    const buttonStyles = {
      backgroundColor: color,
      padding: size === 'small' ? '8px 16px' : size === 'medium' ? '12px 24px' : '16px 32px',
      fontSize: size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
    };
    
    return (
      <button
        style={buttonStyles}
        aria-label={label}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
`;

  React.useEffect(() => {
    if (containerRef.current && componentCode) {
      // Avoid calling createRoot multiple times on the same container
      if (!rootRef.current) {
        rootRef.current = createRoot(containerRef.current);
      }

      try {
        // Debugging to check the component code
        console.log('Component Code:', componentCode);

        // Check if componentCode is empty or invalid
        if (!componentCode || componentCode.trim() === '') {
          throw new Error('Component code is empty or invalid');
        }

        // Create a function that returns the evaluated component

        // eslint-disable-next-line
        const Component = new Function('React', `
          return ${componentCode};
        `)(React);

        console.log("MK: ",Component);
        // Ensure that the evaluated code returns a valid function (React Component)
        if (typeof Component !== 'function') {
          throw new Error('Generated code does not return a valid React component');
        }

        // Render the dynamically evaluated component
        rootRef.current.render(<Component />);
      } catch (error) {
        console.error('Error rendering component:', error.message);
      }
    }
  }, [componentCode]);

  return <div ref={containerRef} />;
};

export default DynamicComponent;
