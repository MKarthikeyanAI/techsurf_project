# src/fetch_svg_code.py

from database import Database

# Create a Database instance
db = Database()

# Function to fetch svg_code
def fetch_svg_code(page_type, template_name):
    svg_code = db.fetch_svg_code(page_type, template_name)
    print("svg_code MK:")

    
    if svg_code:
        print(f"SVG Code for {template_name}: {svg_code}")
    else:
        print(f"No SVG code found for {template_name} under {page_type}.")

# Specify the page type and template name
page_type = "HomePage"
template_name = "Blog Website"

# Call the function
fetch_svg_code(page_type, template_name)
