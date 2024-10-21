import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateFigmaDesignPrompt = async (prompt,designType) => {

  console.log("AiForFigma File is Running");
  
  const apiKey = "AIzaSyBbDcXwcxwcDYVKALosiDbGccCoCCGqLWA";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  console.log("Before content_types running...");
  const content_types = await fetchcontenttypes(prompt,designType);

  console.log("Content_Data in aiforFigma.js file:",content_types)

  if(designType === "Page"){

    console.log("Page: In Page");
    // Step 1: Call the backend to get SVG code
    const datas = await fetchSvgFromBackend(prompt);
    console.log("Data: ",datas);
    let svg_code = null;
    
    // const svg_code = await fetchSvgFromBackend(prompt);
    console.log("svg_code in aiforFigma.js File(fetching the svg_code from backend): ",svg_code);

    if (!svg_code) {
        // throw new Error("SVG code not found for the specified template");
        console.log("SVG CODE NOT FOUND FAILURE");
    }

    console.log("SVG Code from Backend SUCCESS:", svg_code);

    try {

      let detailedPrompt;

      //Login
      // Modified prompt to include SVG generation and Figma frame size
      if(datas.response_type === 2){
          console.log("Components collecting involved: ");
          const componentKeys = Object.keys(datas.components); // Get the keys of the components object
          const componentsLength = componentKeys.length; // Find the length of the components
          console.log("this is the components structure");
          for (const [componentName, svgCode] of Object.entries(datas.components)) {
            console.log(`Component: ${componentName}, SVG: ${svgCode}`);
      
            // Create detailed prompt for each component
            const  training_of_svg_code = `${svgCode}.This is the example SVG code for ${componentName} Component.`;
      
            console.log("training:", training_of_svg_code);  // You can verify the prompt
      
            // Generate content based on the detailed prompt
            const response_of_training_prompt = await model.generateContent(training_of_svg_code);
            // Log or handle the generated response
            console.log("Generated Response for Component:", response_of_training_prompt);
      
          }
      
          // After the loop, append the prompt for the final part
          detailedPrompt = `${prompt} Create me a Page with full width. Provide the SVG code for the above requirements.This for the Purpose of Figma Design and when it copy and paste it in the figma editor it should follow the figma principles like grouping,alignment,et...like that.
                              Give me the SVG Code Only(Full Code).`;
    
          console.log("length of components: ",componentsLength);
          console.log("Matching Components:", datas.components);
      }
      else if(datas.response_type === 1){
        console.log("Direct SVG Template");
        svg_code = datas.svg_code
        detailedPrompt = `This is the sample SVG Code for the template:
                            ${svg_code}

                            ${prompt}
                          Modify the above template to the user requirement and their topic
                          This for the Purpose of Figma Design and when it copy and paste it in the figma editor it should follow the figma principles like grouping,alignment,et...like that.
                          Provide the full SVG Code Only`;
      }
      else{
          console.log("Default Template Rendered");
          detailedPrompt = `${prompt} Create me a Page,the with full width.Provide the SVG code for the above requirements.This for the Purpose of Figma Design and when it copy and paste it in the figma editor it should follow the figma principles like grouping,alignment,et...like that. Example SVG:
        <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" viewBox="0 0 1024 600">
      <!-- Gradient Background -->
      <g id="Background">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f2f2f2" />
            <stop offset="100%" stop-color="#e6e6e6" />
          </linearGradient>
        </defs>
        <rect width="1024" height="600" fill="url(#bgGradient)" />
      </g>
    
      <!-- Login Box Group -->
      <g id="LoginBox">
        <!-- Box -->
        <rect x="302" y="125" width="420" height="350" fill="white" rx="20" stroke="#ddd" stroke-width="2" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"/>
        
        <!-- Header Group -->
        <g id="Header">
          <text x="512" y="180" fill="#4CAF50" font-size="36" font-family="Arial" font-weight="bold" text-anchor="middle">Login</text>
        </g>
    
        <!-- Username Input Group -->
        <g id="UsernameInput">
          <rect x="350" y="230" width="320" height="40" fill="#fff" stroke="#ddd" rx="8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.08))"/>
          <text x="360" y="258" fill="#777" font-size="16" font-family="Arial">Username</text>
        </g>
    
        <!-- Password Input Group -->
        <g id="PasswordInput">
          <rect x="350" y="290" width="320" height="40" fill="#fff" stroke="#ddd" rx="8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.08))"/>
          <text x="360" y="318" fill="#777" font-size="16" font-family="Arial">Password</text>
        </g>
    
        <!-- Login Button Group -->
        <g id="LoginButton">
          <rect x="350" y="360" width="320" height="40" fill="#4CAF50" rx="8" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.15))"/>
          <text x="512" y="388" fill="white" font-size="18" font-family="Arial" font-weight="bold" text-anchor="middle">Log In</text>
        </g>
      </g>
    </svg> Provide only the SVG code.`;

      }
                            
      // Generate content using the detailed prompt
      const responsee = await model.generateContent(detailedPrompt);
      console.log(responsee.response.text());
      const result = responsee.response.text();

      //Find the index of the closing </svg> tag
      const closingSvgIndex_for_result = result.indexOf('</svg>');

      //Extract the SVG part
      const svgContent_for_result = closingSvgIndex_for_result !== -1 ? result.slice(0, closingSvgIndex_for_result + 6) : ""; // +6 to include </svg>

      let cleanedResult = svgContent_for_result.replace(/```xml|```/g, '').trim();

      // Find the index of the opening <!DOCTYPE html> tag
      let cleansvg = cleanedResult.indexOf('<svg');

      // Check if <!DOCTYPE html> exists in the string
      if (cleansvg !== -1) {
        // Remove everything before the <!DOCTYPE html> tag
        cleanedResult = cleanedResult.substring(cleansvg);
      }

      const generatehtmlcss = `${cleanedResult} Modify the above code into the HTML and CSS Code.Give me the Code Only`

      // Generate HTML and CSS using the detailed prompt
      const htmlCssResponse = await model.generateContent(generatehtmlcss);
      let HtmlcodeandCsscode = await htmlCssResponse.response.text();


      // Find the index of the opening <!DOCTYPE html> tag
      let openingHtmlIndex = HtmlcodeandCsscode.indexOf('<!DOCTYPE html>');

      // Check if <!DOCTYPE html> exists in the string
      if (openingHtmlIndex !== -1) {
        // Remove everything before the <!DOCTYPE html> tag
        HtmlcodeandCsscode = HtmlcodeandCsscode.substring(openingHtmlIndex);
      }

      // Find the index of the closing </html> tag
      let closingHtmlIndex = HtmlcodeandCsscode.indexOf('</html>');

      // Check if </html> exists in the string
      if (closingHtmlIndex !== -1) {
        // Slice the string up to the end of </html> (including the length of </html> which is 7 characters)
        HtmlcodeandCsscode = HtmlcodeandCsscode.substring(0, closingHtmlIndex + 7);
      }

      const cleanedhtmlcssCode = HtmlcodeandCsscode;
      console.log("HTML and CSS CODE ONLY: ",HtmlcodeandCsscode);
      
      // Return both SVG and HTML/CSS code
      return { svgContent: cleanedResult, htmlCssCode: cleanedhtmlcssCode, prompt_input: prompt ,design_type : "Page", content_types: content_types};
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  }
  else{    
    // Step 1: Call the backend to get SVG codes for multiple pages
    const websitedata = await fetchSvgFromBackendForWebsite();
    console.log("Website Data: ", websitedata);
    
    const allPageSVGs = []; // Array to store SVG codes for all pages
    const allPageHTMLCSS = []; // Array to store HTML/CSS codes for all pages
    const prompts = {}; // Object to store prompt inputs for each paged
    try {
      for (const [pageName, svgCode] of Object.entries(websitedata)) {

          console.log(`Processing page: ${pageName}`);

          let detailedPrompt = `.Create me a ${pageName} like this.Provide the SVG code and change the texts according to this ${prompt}. This is for the purpose of Figma Design,it should follow the Figma principles like grouping. Example SVG: ${svgCode}.Provide only the SVG code.`;

          // Generate content using the detailed prompt for each page
          const responsee = await model.generateContent(detailedPrompt);
          const result = responsee.response.text();

          // Find the index of the closing </svg> tag
          const closingSvgIndex_for_result = result.indexOf('</svg>');

          // Extract the SVG part
          const svgContent_for_result = closingSvgIndex_for_result !== -1 ? result.slice(0, closingSvgIndex_for_result + 6) : ""; // +6 to include </svg>

          let cleanedResult = svgContent_for_result.replace(/```xml|```/g, '').trim();

          // Find the index of the opening <svg> tag
          let cleansvg = cleanedResult.indexOf('<svg');

          if (cleansvg !== -1) {
              // Remove everything before the <svg> tag
              cleanedResult = cleanedResult.substring(cleansvg);
          }

          // Generate HTML and CSS using the detailed prompt
          const generatehtmlcss = `${cleanedResult} Modify the above code into the HTML and CSS Code. Give me the Code Only`;
          const htmlCssResponse = await model.generateContent(generatehtmlcss);
          let HtmlcodeandCsscode = await htmlCssResponse.response.text();

          // Find the index of the opening <!DOCTYPE html> tag
          let openingHtmlIndex = HtmlcodeandCsscode.indexOf('<!DOCTYPE html>');

          // Check if <!DOCTYPE html> exists in the string
          if (openingHtmlIndex !== -1) {
              // Remove everything before the <!DOCTYPE html> tag
              HtmlcodeandCsscode = HtmlcodeandCsscode.substring(openingHtmlIndex);
          }

          // Find the index of the closing </html> tag
          let closingHtmlIndex = HtmlcodeandCsscode.indexOf('</html>');

          // Check if </html> exists in the string
          if (closingHtmlIndex !== -1) {
              // Slice the string up to the end of </html>
              HtmlcodeandCsscode = HtmlcodeandCsscode.substring(0, closingHtmlIndex + 7);
          }

          // Store SVG and HTML/CSS codes in respective arrays
          allPageSVGs.push({ page: pageName, svg: cleanedResult });
          allPageHTMLCSS.push({ page: pageName, htmlCss: HtmlcodeandCsscode });
          prompts[pageName] = prompt; // Store prompt for each page
          
      }
      console.log("All Pages: ",allPageSVGs);
      console.log("All HTML AND CSS: ",allPageHTMLCSS);
      console.log("All Prompts: ",prompts)

      console.log("DesignType in AIFORFIGMA MULTIPLE PAGES: ",designType);
      // Return all SVG and HTML/CSS codes
      return { allPageSVGs, allPageHTMLCSS, prompts ,design_type: "Website", content_types: content_types};
      
    } catch (error) {
        console.error("Error generating content for website:", error);
        throw error;
    }

  }

};


// Function to call Flask backend
const fetchSvgFromBackend = async (prompt) => {
  try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/get-svg-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      console.log("Data is retrieved from the mongoDB: ",data);
      if (response.ok) {
        return data;
      } else {
        console.log("Error in getting SVG CODE");
        console.error("Error fetching SVG code:", data.error);
        return null;
      }
  } catch (error) {
      console.error("Error communicating with backend:", error);
      return null;
  }
};

// Function to call the Flask backend and fetch all page_type:svg_code pairs
const fetchSvgFromBackendForWebsite = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/get-all-svg-codes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log("All SVG codes retrieved from MongoDB:", data);

    if (response.ok) {
      return data.svg_codes;  // Return the svg_codes dictionary
    } else {
      console.error("Error fetching SVG codes:", data.error);
      return null;
    }
  } catch (error) {
    console.log("Error in getting all website svg code");
    console.error("Error communicating with the backend:", error);
    return null;
  }
};

// Function to call the Flask backend and fetch all page_type:svg_code pairs
const fetchcontenttypes = async (prompt,designType) => {
try {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/generate-design`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, designType }),
    credentials: 'include'
  });
  
  const data = await response.json();
  console.log("Fetched the Matched content type: ",data);

  if (!response.ok) {
    console.log("fetched the matched content tye: ",data);
    return null;
    // throw new Error(data.message || 'Something went wrong');
  }
  return data.content_types;
} catch (err) {
  console.log("Error in fetch content types");
  console.error("Error in generateFigmaDesignPrompt:", err);
  return null;
  // throw err;
}

};

//Only prompt based code:
// let detailedPromptsd = `${prompt}.
//                        Give me the HTML and CSS code for the above userprompt and it should be design like a pro
//                        Provide me the Code Only.
//                        provide me in a single code(combine the css code in the style tag within HTML).`;

//                       //  Give the HTML and CSS Code with full structure,

// console.log("DETAILED PROMPT FOR HTML AND CSS CODE: ",detailedPromptsd);

// // Generate content using the detailed prompt
// let sampling = await model.generateContent(detailedPromptsd);
// sampling = sampling.response.text();

// //Removing all the lines except HTML CODE:
// // Find the index of the opening <!DOCTYPE html> tag
// let openingHtmlIndex = sampling.indexOf('<!DOCTYPE html>');

// // Check if <!DOCTYPE html> exists in the string
// if (openingHtmlIndex !== -1) {
//   // Remove everything before the <!DOCTYPE html> tag
//   sampling = sampling.substring(openingHtmlIndex);
// }

// // Find the index of the closing </html> tag
// let closingHtmlIndex = sampling.indexOf('</html>');

// // Check if </html> exists in the string
// if (closingHtmlIndex !== -1) {
//   // Slice the string up to the end of </html> (including the length of </html> which is 7 characters)
//     sampling = sampling.substring(0, closingHtmlIndex + 7);
// }

// const cleanedhtmlcssCode = sampling;
// console.log("HTML and CSS CODE ONLY: ",sampling);

// let html_to_svg = `${sampling}.
// Convert the above code into SVG Code for the purpose of designing in figma editor when this SVG is copied and pasted to the figma,the design looks attractive.
// And the frame size width should be the 1440
// Give me the SVG code in figma structure such that Grouped elements,Layering,with Image,Consistent Naming,Responsive Design,Styling and Colors,Text Accessibility,etc,...
// Provide me the Code Only which means full SVG CODE.`;

// // Generate content using the detailed prompt
// let sampling2 = await model.generateContent(html_to_svg);
// sampling2 = sampling2.response.text();

// // Find the index of the closing </svg> tag
// const closingSvgIndex_for_sampling2 = sampling2.indexOf('</svg>');

// // Extract the SVG part
// const svgContent_for_sampling2 = closingSvgIndex_for_sampling2 !== -1 ? sampling2.slice(0, closingSvgIndex_for_sampling2 + 6) : ""; // +6 to include </svg>

// const cleanedResult = svgContent_for_sampling2.replace(/```xml|```/g, '').trim();


// console.log("Sampling SVG: ",cleanedResult);

// // //static example svg prompt:
// detailedPrompt = `${prompt} Create me a Page,the frame size should be the desktop size.Provide the SVG code for the above requirements. Example SVG:
//     <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" viewBox="0 0 1024 600">
//   <!-- Gradient Background -->
//   <g id="Background">
//     <defs>
//       <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stop-color="#f2f2f2" />
//         <stop offset="100%" stop-color="#e6e6e6" />
//       </linearGradient>
//     </defs>
//     <rect width="1024" height="600" fill="url(#bgGradient)" />
//   </g>

//   <!-- Login Box Group -->
//   <g id="LoginBox">
//     <!-- Box -->
//     <rect x="302" y="125" width="420" height="350" fill="white" rx="20" stroke="#ddd" stroke-width="2" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"/>
    
//     <!-- Header Group -->
//     <g id="Header">
//       <text x="512" y="180" fill="#4CAF50" font-size="36" font-family="Arial" font-weight="bold" text-anchor="middle">Login</text>
//     </g>

//     <!-- Username Input Group -->
//     <g id="UsernameInput">
//       <rect x="350" y="230" width="320" height="40" fill="#fff" stroke="#ddd" rx="8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.08))"/>
//       <text x="360" y="258" fill="#777" font-size="16" font-family="Arial">Username</text>
//     </g>

//     <!-- Password Input Group -->
//     <g id="PasswordInput">
//       <rect x="350" y="290" width="320" height="40" fill="#fff" stroke="#ddd" rx="8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.08))"/>
//       <text x="360" y="318" fill="#777" font-size="16" font-family="Arial">Password</text>
//     </g>

//     <!-- Login Button Group -->
//     <g id="LoginButton">
//       <rect x="350" y="360" width="320" height="40" fill="#4CAF50" rx="8" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.15))"/>
//       <text x="512" y="388" fill="white" font-size="18" font-family="Arial" font-weight="bold" text-anchor="middle">Log In</text>
//     </g>
//   </g>
// </svg> Provide only the SVG code.`;


// // // Components training code

// else if (datas.response_type === 2) {
//   console.log("Components training entered");
//   const componentKeys = Object.keys(datas.components); // Get the keys of the components object
//   const componentsLength = componentKeys.length; // Find the length of the components
//   console.log("this is the components structure");
//   for (const [componentName, svgCode] of Object.entries(datas.components)) {
//     console.log(`Component: ${componentName}, SVG: ${svgCode}`);

//      // Create detailed prompt for each component
//      const  training_of_svg_code = `${svgCode}.This is the example SVG code for ${componentName} Component.`;

//      console.log("training:", training_of_svg_code);  // You can verify the prompt

//      // Generate content based on the detailed prompt
//      const response_of_training_prompt = await model.generateContent(training_of_svg_code);
//      // Log or handle the generated response
//      console.log("Generated Response for Component:", response_of_training_prompt);

//   }

//   // After the loop, append the prompt for the final part
//   const finalPrompt = `${prompt} Create me a Page with full width. Provide the SVG code for the above requirements.
//                       Give me the SVG Code Only(Full Code).`;

//   console.log("Final Prompt:", finalPrompt);

//   // Generate content for the final prompt as well if needed
//   const finalResponse = await model.generateContent(finalPrompt);

//   console.log("final Response: ",finalResponse);

//   console.log("length of components: ",componentsLength);
//   console.log("Matching Components:", datas.components);
// }