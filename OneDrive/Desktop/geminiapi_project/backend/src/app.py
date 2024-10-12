from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Database
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Initialize the Database instance
db = Database()

# Function to extract page_type and template_name from the prompt
def extract_tokens_from_prompt(prompt):
    # You can use regex or keyword matching to extract tokens from the prompt
    # For simplicity, we'll assume the prompt has words like "create" and "for"

    page_type = None
    template_name = None

    # Check for 'HomePage', 'Home Page', or variations where 'Home' and 'Page' are separated by other text
    if re.search(r'home.*page', prompt, re.IGNORECASE):
        page_type = 'HomePage'
    
    # Check for different types of websites like 'Blog Website' or 'Blog'
    if re.search(r'blog\s*website|blog', prompt, re.IGNORECASE):
        template_name = 'Blog Website'
    elif re.search(r'e[-\s]*commerce\s*website|e[-\s]*commerce', prompt, re.IGNORECASE):
        template_name = 'E-commerce Website'
    
    return page_type, template_name

# Route to handle POST requests from the frontend
@app.route('/api/get-svg-code', methods=['POST'])

def get_svg_code():
    data = request.get_json()

    # Extract the prompt from the request
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({"message": "No prompt provided"}), 400

    # Step 1: Extract tokens (page_type and template_name) from the prompt
    page_type, template_name = extract_tokens_from_prompt(prompt)
    
    if not page_type or not template_name:
        return jsonify({"message": "Unable to extract page_type or template_name from prompt"}), 400

    # Step 2: Fetch the SVG code from the database based on the tokens
    svg_code = db.fetch_svg_code(page_type, template_name)

    if svg_code:
        return jsonify({"svg_code": svg_code}), 200
    else:
        return jsonify({"message": f"No SVG code found for {template_name} under {page_type}"}), 404

if __name__ == '__main__':
    app.run(debug=True)
