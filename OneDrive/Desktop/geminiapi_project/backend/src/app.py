from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Database
from dotenv import load_dotenv
import google.generativeai as genai
import os
import re
from bson import ObjectId  # Import ObjectId for conversion

# Load environment variables from .env file
load_dotenv()
# Configure Google Generative AI
genai.configure(api_key=os.getenv("API_KEY"))


app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication
# Load the NLP model

# Initialize the Database instance
db = Database()




def match_website_type(prompt):
    
    if re.search(r'(job\s*portal|portal\s*job)(\s*website)?', prompt, re.IGNORECASE):
            website_type = 'Job Portal Website'

    elif re.search(r'e[-\s]*commerce\s*website|e[-\s]*commerce', prompt, re.IGNORECASE):
        website_type = 'E-commerce Website'

    elif re.search(r'\bwedding\b', prompt, re.IGNORECASE):
        website_type = 'Wedding Website'
        print(website_type)

    elif re.search(r'\bportfolio\b', prompt, re.IGNORECASE):
        website_type = 'Portfolio Website'
        print(website_type)

    elif re.search(r'\bcorporate\b', prompt, re.IGNORECASE):
        website_type = 'Corporate Website'
        print(website_type)

    elif re.search(r'\bnews\b', prompt, re.IGNORECASE):
        website_type = 'News Website'
        print(website_type)

    elif re.search(r'\beducational\b', prompt, re.IGNORECASE):
        website_type = 'Educational Website'
        print(website_type)

    elif re.search(r'non\s*-?\s*profit\s*website|not\s*for\s*profit\s*website|non\s*for\s*profit\s*website|non\s*-?\s*profit', prompt, re.IGNORECASE):
        website_type = 'Non-Profit Website'
        print(website_type)

    elif re.search(r'\b(real\s*estate\s*website|estate\s*real\s*website|real\s*estate|estate\s*real)\b', prompt, re.IGNORECASE):
        website_type = 'Real Estate Website'
        print(website_type)

    elif re.search(r'\bevent\b', prompt, re.IGNORECASE):
        website_type = 'Event Website'
        print(website_type)

    # Check for different variations of 'Personal Blog'
    elif re.search(r'(personal\s*blog|blog\s*for\s*personal)', prompt, re.IGNORECASE):
        website_type = 'Personal Blog/Website'
        print(website_type)

    elif re.search(r'\bphotography\b', prompt, re.IGNORECASE):
        website_type = 'Photography Website'
        print(website_type)

    elif re.search(r'\btravel\b', prompt, re.IGNORECASE):
        website_type = 'Travel Website'
        print(website_type)

    elif re.search(r'\bhealthcare\b', prompt, re.IGNORECASE):
        website_type = 'Healthcare Website'
        print(website_type)

    elif re.search(r'\bfitness\b', prompt, re.IGNORECASE):
        website_type = 'Fitness/Gym Website'
        print(website_type)

    elif re.search(r'\bgym\b', prompt, re.IGNORECASE):
        website_type = 'Fitness/Gym Website'
        print(website_type)

    elif re.search(r'\bmusic\b', prompt, re.IGNORECASE):
        website_type = 'Music Website'
        print(website_type)

    elif re.search(r'\bfashion\b', prompt, re.IGNORECASE):
        website_type = 'Fashion Website'
        print(website_type)

    elif re.search(r'\btechnology\b', prompt, re.IGNORECASE):
        website_type = 'Technology/Product Website'
        print(website_type)

    elif re.search(r'\bproduct\b', prompt, re.IGNORECASE):
        website_type = 'Technology/Product Website'
        print(website_type)

    elif re.search(r'\brestaurant\b', prompt, re.IGNORECASE):
        website_type = 'Restaurant Website'
        print(website_type)

    elif re.search(r'\bblog\b', prompt, re.IGNORECASE):
        website_type = 'Blog Website'
        print(website_type)

    else:
        model = genai.GenerativeModel("gemini-1.5-flash")

        test_prompt = f"""
        WEBSITE_TYPES = [
            "Wedding Website", "Job Portal Website", "E-commerce Website", "Portfolio Website",
            "Corporate Website", "News Website", "Educational Website", "Non-profit Website",
            "Real Estate Website", "Event Website", "Personal Blog/Website", "Restaurant Website",
            "Photography Website", "Healthcare Website", "Fitness/Gym Website", "Music Website",
            "Fashion Website", "Blog Website", "Technology/Product Website", "Personal Website"
        ]

        {prompt}

        For the above prompt which website_type is related to it.Tell me in a single word(array element) if it matches any Website types in my array(Website_types) if nothing is matched tell me in a single word generic_website

        I need output in single word only"""

        # Generate response based on the prompt
        response = model.generate_content(f"{test_prompt}")
        print("Response GEMINI WEBSITE TYPE: ",response)
        website_type = response.text.strip()  # Get the generated content

        result = {'website_type': website_type or 'generic_website'}  # Return generated website type or 'generic_website'

        return result['website_type']
        
    return website_type

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

def convert_objectid_to_str(data):
    """Recursively convert ObjectId fields in the document to string."""
    if isinstance(data, dict):
        return {key: convert_objectid_to_str(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [convert_objectid_to_str(item) for item in data]
    elif isinstance(data, ObjectId):
        return str(data)
    else:
        return data
    
def create_field_metadata(field_type,field_name):
    """Generate the field_metadata based on the field type."""
    if field_name == "Title":
        return{
            "_default": True
        }
    elif field_type == "multi-line text":
        return {
            "description": "",
            "default_value": "",
            "multiline": True
        }
    elif field_type == "reference":
        return{
            "ref_multiple": False
        }
    elif field_type == "link":
        return{
            "description": "",
            "default_value": {
                "title": "",
                "url": ""
            }
        }
    elif field_type == "file":
        return {
            "description": "",
            "rich_text_type": "standard"
        }
    else:  # Default for "text"
        return {
            "description": "",
            "default_value": ""
        }
    
def set_data_type(field_type):
    if field_type == "date":
        return "isodate"
    elif field_type == "number":
        return "number"
    elif field_type == "multi-line text":
        return "text"
    elif field_type == "file":
        return "file"
    elif field_type == "link":
        return "text"
    elif field_type == "boolean":
        return "boolean"
    elif field_type == "text":
        return "text"
    else:
        return "text"  

def process_content_type(content_type):
    """Process each content type to create the schema based on the input."""
    title = content_type['name']
    uid = title.lower().replace(" ", "")

    schema = []

    for field in content_type['fields']:
        field_name = field['field_name']
        field_type = field['type']

        # Create the field schema
        field_schema = {
            "display_name": field_name,
            "uid": field_name.lower().replace(" ", ""),
            "data_type": set_data_type(field_type),
            "field_metadata": create_field_metadata(field_type,field_name),
            "unique": field_name == "Title",
            "mandatory": field_name == "Title",
            "multiple": False
        }

        schema.append(field_schema)

    # Options based on the template type
    options = {
        "singleton": content_type['template_type'] == "Single"
    }

    # Final output for the content type
    output = {
        "content_type": {
            "title": title,
            "uid": uid,
            "schema": schema,
            "options": options
        }
    }

    return output


@app.route('/api/generate-design', methods=['POST'])
def generate_design():
    data = request.get_json()

    prompt = data.get('prompt')
    design_type = data.get('designType')

    if not prompt or not design_type:
        return jsonify({"message": "Prompt and designType are required"}), 400

    try:

        # Step 2: Match extracted keywords to a predefined website type
        matched_website_type = match_website_type(prompt)
        
        print("Matched Website Type: ", matched_website_type)

        if(matched_website_type == "generic_website"):
            matched_website_type = "General Website"

        # Step 3: Query the MongoDB using the Database class for the matched website_type
        document = db.fetch_document_by_website_type(matched_website_type)

        if document:
            print(f"Document for {matched_website_type}: {document}")
                # Convert ObjectId to string for JSON serialization
            document = convert_objectid_to_str(document)

            # Iterate over the content_types and generate output
            final_output = [process_content_type(content_type) for content_type in document['content_types']]

            return jsonify({"content_types": final_output})

        else:

            print(f"No document found for website type: {match_website_type}")


        

        # Step 5: Return the data as JSON
        return jsonify({"content_types": final_output})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Server error"}), 500
    

# Route to get all SVG codes from the websites collection
@app.route('/api/get-all-svg-codes', methods=['GET'])
def get_all_svg_codes():
    print("Fetching all SVG codes from the websites collection")
    
    # Fetch the 'websites' collection from the database
    websites_collection = db.get_collection('websites')
    
    # Fetch all documents from the collection
    websites = websites_collection.find()  # This returns a cursor
    
    # Create a dictionary to hold page_type and svg_code pairs
    all_svg_codes = {}
    
    # Iterate through each document and collect the page_type and svg_code
    for website in websites:
        page_type = website.get('page')
        svg_code = website.get('svg code')
        
        if page_type and svg_code:
            print("all page type loop")
            all_svg_codes[page_type] = svg_code
    
    print(({"svgs_codes": all_svg_codes}))

    # Return the dictionary of all page_type: svg_code pairs
    return jsonify({"svg_codes": all_svg_codes}), 200



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
    # Use Gunicorn in production
    app.run(host='0.0.0.0', port=8000, debug=False)  # Disable debug mode for production

    
