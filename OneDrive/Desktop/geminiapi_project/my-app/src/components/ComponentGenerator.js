import { GoogleGenerativeAI } from "@google/generative-ai";

export const generate_components = async (prompt_input) => {

    console.log("generate_components entered: ");
    console.log(prompt_input);
  
    const apiKey = "AIzaSyBbDcXwcxwcDYVKALosiDbGccCoCCGqLWA";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const promptforwebcomponents = `${prompt_input} 
                                    provide me the web components need for the above requirements in react return like structure:

Example:

components_list.push({
            name: 'Product Showcase',
            preview: <div>Product Showcase Component</div>,
            react_code: 
              <div className="product-showcase">
                <h2>Product Showcase</h2>
                <div className="product-card">
                  <img src="product-image.jpg" alt="Product Name" />
                  <h3>Product Name</h3>
                  <p>Price: $99.99</p>
                  <button>Add to Cart</button>
                </div>
                {/* Add more product cards */}
              </div>
            
          });

Provide me all the web components only.In all web components there should be example structure to display.I want like the above structure for the purpose of displaying the component_list in the  
<h3>{component.name}</h3>
            <div className="preview" dangerouslySetInnerHTML={{ __html: component.react_code }} /> for this.

Provide me Code Only like above structure format.`;

    try {
        // Generate content using the detailed prompt
        const responsee = await model.generateContent(promptforwebcomponents);
        console.log("Components code: ",responsee.response.text());
        const result = responsee.response.text();
      
        const regex = /components_list\.push\((\{[\s\S]*?\})\);/g;  // Define regex to match push calls
let matches = result.match(regex);  // Extract all matches

let newList = [];
matches.forEach(match => {
    // Extract the object between the curly braces, e.g., `{ name: 'Hero Banner', ... }`
    let objectStr = match.match(/\{[\s\S]*?\}/)[0];
    
    // Convert the extracted object string into a JS object
    let nameMatch = objectStr.match(/name:\s*'([^']+)'/); // Extract name
    let reactCodeMatch = objectStr.match(/react_code:\s*([\s\S]*)/); // Extract react_code

    if (nameMatch && reactCodeMatch) {
        // Extract the name and react_code
        let componentName = nameMatch[1];
        let reactCode = reactCodeMatch[1].trim();
        
        // Sanitize react_code by removing backticks and brackets
        let sanitizedReactCode = reactCode
          .replace(/`/g, '')         // Remove backticks
          .replace(/^\{|\}$/g, '');  // Remove opening and closing curly braces if any
        
        // Push the object to the new list in the required format
        newList.push({
          name: componentName,
          preview: `<div>${componentName} Component</div>`,
          react_code: sanitizedReactCode  // Use sanitized string
        });
    }
});

console.log("NewList of the Component Generator: ",newList);

return newList;



        } catch (error) {
            console.error('Error generating components:', error);
            return []; // Return an empty array in case of error
        }
  };