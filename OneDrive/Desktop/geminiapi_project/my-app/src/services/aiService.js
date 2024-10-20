// import axios from 'axios';

// Replace the URL and API key with your actual AI API endpoint and credentials

// const API_KEY = '';
// const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}';


// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`;
// const API_KEY = 'AIzaSyBbDcXwcxwcDYVKALosiDbGccCoCCGqLWA'; 

// const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
// const API_KEY = 'AIzaSyBbDcXwcxwcDYVKALosiDbGccCoCCGqLWA'; // Replace with your actual API key

// src/services/aiService.js

// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";


export const generateComponentFromPrompt = async (userPrompt) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBbDcXwcxwcDYVKALosiDbGccCoCCGqLWA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const promptTemplate = `Give me the enhanced prompt for the above content for code snippets for this user prompt and I need the Web Component Code in React: ${userPrompt}`;

     
      const result1 = await model.generateContent(promptTemplate);

      console.log("Result1: ")
      console.log(result1.response.text());

      
      const result2 = result1.response.text();

      const res = `${result2} Give me the code Code Only in a Professional Manner`

      // const prompt = userPrompt;
      const result = await model.generateContent(res);
      console.log("Result2: ")
      console.log(result.response.text());
      
      return result.response.text(); // Return the response data
    } catch (error) {
      console.error('Error making API call:', error); // Log any API call errors
      throw error; // Rethrow the error for handling in the component
    }
};


