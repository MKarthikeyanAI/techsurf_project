import re
import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask import json

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure Google Generative AI
genai.configure(api_key=os.getenv("API_KEY"))

# Predefined list of website types
WEBSITE_TYPES = [
    "Wedding Website", "Job Portal Website", "E-commerce Website", "Portfolio Website", 
    "Fashion Website", "Blog Website", "Technology/Product Website", "Personal Website"
]

# Function to detect website type
def detect_website(test_prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    # Generate response based on the prompt
    response = model.generate_content(f"{test_prompt}")
    website_type = response.text.strip()  # Get the generated content

    return {'website_type': website_type or 'generic_website'}  # Return generated website type or 'generic_website'

# Route to detect website type (used when running Flask app)
@app.route('/detect-website', methods=['POST'])
def detect_website_route():
    prompt = request.json.get('prompt')
    return jsonify(detect_website(prompt))

# Main function for testing
if __name__ == '__main__':
    # Simulate a test prompt

    # Dynamic variable
    sub_prompt = "Create me a figma for Personal Blog Website."

    test_prompt = f"""
WEBSITE_TYPES = [
    "Wedding Website", "Job Portal Website", "E-commerce Website", "Portfolio Website",
    "Corporate Website", "News Website", "Educational Website", "Non-profit Website",
    "Real Estate Website", "Event Website", "Personal Blog/Website", "Restaurant Website",
    "Photography Website", "Healthcare Website", "Fitness/Gym Website", "Music Website",
    "Fashion Website", "Blog Website", "Technology/Product Website", "Personal Website"
]

{sub_prompt}

For the above prompt what is the website_type from the WEBSITE_TYPES Array.Tell me in a single word(array element) if it matches any Website types in my array(Website_types) if nothing is matched tell me in a single word generic_website

I need output in single word only"""
    
    # Call the detect_website function with the test prompt
    result = detect_website(test_prompt)

    
    
    # Print the result
    print(result)

    # Optionally, run the Flask app if needed
    # app.run(debug=True)
