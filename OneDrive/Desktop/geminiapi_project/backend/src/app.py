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

# Function to find matching components based on keywords
def find_matching_components(keywords):
    print("find_matching_components function is called")
    # Fetch the 'components' collection from the database
    components_collection = db.get_collection('components')

    # Fetch all components from the collection
    components = components_collection.find()  # This will return a cursor

    matching_components = {}

    # Convert input keywords to lowercase for case-insensitive comparison
    keywords_lower = [keyword.lower() for keyword in keywords]

    # Iterate through each component in the database
    for component in components:
        # Get the component name and keywords from the component
        component_name = component['component_name']
        component_keywords = component['keywords']
        
        # Convert component keywords to lowercase for case-insensitive comparison
        component_keywords_lower = [keyword.lower() for keyword in component_keywords]

        # Find common keywords between input keywords and component keywords
        common_keywords = set(keywords_lower).intersection(component_keywords_lower)

        # If there are any common keywords, store the component's svg_code
        if common_keywords:
            matching_components[component_name] = component['svg_code']
            print(f"Match found: Component '{component_name}' with common keywords: {common_keywords}")

    # # Iterate through each component in the database
    # for component in components:
    #     # Get the component name and keywords from the component
    #     component_name = component['component_name']
    #     component_keywords = component['keywords']

    #     # Check if any of the input keywords match the component name or component keywords
    #     # name_match_found = any(keyword.lower() in component_name.lower() for keyword in keywords)
    #     keyword_match_found = any(keyword.lower() in keyword_list.lower() for keyword in keywords for keyword_list in component_keywords)

    #     # Print when a name match is found
    #     # if name_match_found:
    #     #     print(f"Match found for component name '{component_name}' with keywords: {keywords}")
            
    #     # Print when a keyword match is found
    #     if keyword_match_found:
    #         print(f"Match found in keywords for component '{component_name}' with component keywords: {component_keywords}")
        
    #     # # If a match is found either by name or keywords, add the component to the matching_components dictionary
    #     # if name_match_found or keyword_match_found:
    #         matching_components[component_name] = component['svg_code']
    #         print(f"Component '{component_name}' with matching SVG code added.")


    print(f"Matching Components ghhh: {matching_components}")
    return matching_components


# Route to handle POST requests from the frontend
@app.route('/api/get-svg-code', methods=['POST'])

def get_svg_code():

    data = request.get_json()
    print(f"Received data: {data}")  # Add logging to check input

    # Extract the prompt from the request
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({"message": "No prompt provided"}), 400

    # Step 1: Extract tokens (page_type and template_name) from the prompt
    page_type, template_name = extract_tokens_from_prompt(prompt)

    print(f"Extracted page_type: {page_type}, template_name: {template_name}")  # Log extracted tokens
    
    # If both page_type and template_name are found, proceed to fetch the SVG code
    if page_type and template_name:
        # Step 2: Fetch the SVG code from the database based on the tokens
        svg_code = db.fetch_svg_code(page_type, template_name)

        if svg_code:
            print(f"SVG_CODE: {svg_code}")
            return jsonify({"svg_code": svg_code, "response_type": 1}), 200
        else:
            return jsonify({"message": f"No SVG code found for {template_name} under {page_type}."}), 404
        
    else:
        # If no SVG code found, search for components
        # Split the prompt into individual words (tokens) and use them as keywords
        keywords = prompt.lower().split()  # Split the prompt into lowercase words
        print(f"Extracted keywords from prompt: {keywords}")  # Log the extracted keywords

        matching_components = find_matching_components(keywords)
        # Print the matching components to the console
        print(f"Matching Components: {matching_components}")

        if matching_components:
            print("Matching components IN")
            print("Length: ",len(matching_components))
            return jsonify({"components": matching_components, "response_type": 2}), 200
        else:
            print("Last Else part")
            return jsonify({"hello": f"No SVG code found for under and no matching components.","response_type":3}), 200

if __name__ == '__main__':
    app.run(debug=True)
