import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateFigmaDesignPrompt = async (prompt) => {
  const apiKey = "AIzaSyBbDcXwcxwcDYVKALosiDbGccCoCCGqLWA";

  // Step 1: Call the backend to get SVG code
  const svg_code = await fetchSvgFromBackend(prompt);

  if (!svg_code) {
      // throw new Error("SVG code not found for the specified template");
      console.log("SVG CODE NOT FOUND FAILURE");
  }

  console.log("SVG Code from Backend SUCCESS:", svg_code);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let detailedPrompt;

    //Login
    // Modified prompt to include SVG generation and Figma frame size
    if(!svg_code){
      detailedPrompt = `${prompt} Create me a Page,the frame size should be the desktop size.Provide the SVG code for the above requirements. Example SVG:
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
    else{
      detailedPrompt = `This is the sample SVG Code:
                          ${svg_code}

                          ${prompt}
                        
                        Provide the full SVG Code Only`;
     }
    

    // Generate content using the detailed prompt
    const responsee = await model.generateContent(detailedPrompt);
    console.log(responsee.response.text());
    const result = responsee.response.text()
    // const cleanedResult = result.replace(/```xml|```/g, '').trim();

    // Find the index of the closing </svg> tag
    const closingSvgIndex = result.indexOf('</svg>');

    // Extract the SVG part
    const svgContent = closingSvgIndex !== -1 ? result.slice(0, closingSvgIndex + 6) : ""; // +6 to include </svg>

    const cleanedResult = svgContent.replace(/```xml|```/g, '').trim();

    const generatehtmlcss = `${cleanedResult} Modify the above code into the HTML and CSS Code.Give me the Code Only`

     // Generate HTML and CSS using the detailed prompt
     const htmlCssResponse = await model.generateContent(generatehtmlcss);
     const HtmlcodeandCsscode = await htmlCssResponse.response.text();

     // Remove the first and last lines
     // Split the response into an array of lines
     const lines = HtmlcodeandCsscode.split('\n');

     // Remove the first and last lines
     lines.shift(); // Removes the first line
     lines.pop();   // Removes the last line

     // Join the remaining lines back into a single string
     let cleanedhtmlcssCode = lines.join('\n');
     // Check if the last part of the string contains backticks
     if (cleanedhtmlcssCode.endsWith("```")) {
      // Remove the backticks by slicing the string
      cleanedhtmlcssCode = cleanedhtmlcssCode.slice(0, -3);
     }
     console.log("Cleaned HTML and CSS CODE: ",cleanedhtmlcssCode);
 
     console.log("SVG CODE oF MK: ",cleanedResult); // Logs only the SVG code
     
     // Return both SVG and HTML/CSS code
     return { svgContent: cleanedResult, htmlCssCode: cleanedhtmlcssCode };
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};


// Function to call Flask backend
const fetchSvgFromBackend = async (prompt) => {
  try {
      const response = await fetch('http://localhost:5000/api/get-svg-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
          return data.svg_code;
      } else {
          console.error("Error fetching SVG code:", data.error);
          return null;
      }
  } catch (error) {
      console.error("Error communicating with backend:", error);
      return null;
  }
};
