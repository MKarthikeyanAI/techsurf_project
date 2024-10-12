# src/insert_svg_template.py

from datetime import datetime
from database import Database
from pymongo import UpdateOne

class SVGTemplateInserter:
    def __init__(self, collection_name):
        self.collection = Database().get_collection(collection_name)

    def insert_template(self, page_type, templates):
        # Find the existing document with the same page_type
        existing_document = self.collection.find_one({"page_type": page_type})

        if existing_document:
            # If the document exists, update it by adding the new templates
            result = self.collection.update_one(
                {"page_type": page_type},
                {"$push": {"templates": {"$each": templates}}}
            )
            print(f"Updated document with page_type '{page_type}'. Number of templates added: {len(templates)}")
        else:
            # If the document does not exist, create a new one
            document = {
                "page_type": page_type,
                "templates": templates
            }
            result = self.collection.insert_one(document)
            print(f"Inserted document with ID: {result.inserted_id}")

if __name__ == "__main__":
    inserter = SVGTemplateInserter("svgTemplates")

    # Example SVG templates
    templates = [
        {
        "name": "E-commerce Website",
        "svg_code": """<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" viewBox="0 0 1440 1024">
  
  <defs>
    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0e0e0" />
      <stop offset="100%" stop-color="#f0f0f0" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect id="Background" width="1440" height="1024" fill="#f9f9f9" />

  <!-- Header -->
  <g id="Header">
    <rect width="1440" height="80" fill="#4CAF50" />
    <text x="100" y="50" fill="white" font-size="24" font-family="Arial" font-weight="bold">Your Logo</text>
    <g id="Navigation" transform="translate(600, 0)">
      <text x="0" y="50" fill="white" font-size="18" font-family="Arial">Home</text>
      <text x="80" y="50" fill="white" font-size="18" font-family="Arial">Shop</text>
      <text x="160" y="50" fill="white" font-size="18" font-family="Arial">About</text>
      <text x="240" y="50" fill="white" font-size="18" font-family="Arial">Contact</text>
    </g>
    <g id="UserActions" transform="translate(1200, 0)">
      <text x="0" y="50" fill="white" font-size="18" font-family="Arial">Login</text>
      <text x="80" y="50" fill="white" font-size="18" font-family="Arial">Sign Up</text>
    </g>
  </g>

  <!-- Hero Section -->
  <g id="HeroSection" transform="translate(0, 80)"> 
    <rect width="1440" height="400" fill="url(#heroGradient)" />
    <text x="720" y="150" fill="#333" font-size="64" font-family="Arial" font-weight="bold" text-anchor="middle">Shop Now</text>
    <text x="720" y="220" fill="#666" font-size="24" font-family="Arial" text-anchor="middle">Find the best deals on your favorite products.</text>
    <rect x="620" y="280" width="200" height="40" rx="20" fill="#4CAF50" />
    <text x="720" y="305" fill="white" font-size="18" font-family="Arial" text-anchor="middle" font-weight="bold">Explore Products</text>
  </g>

  <!-- Featured Products Section -->
  <g id="FeaturedProducts" transform="translate(0, 480)">
    <text x="80" y="40" fill="#333" font-size="36" font-family="Arial" font-weight="bold">Featured Products</text>

    <g id="ProductGrid" transform="translate(80, 80)">
      <!-- Product 1 -->
      <g id="Product1" transform="translate(0, 0)">
        <rect width="300" height="380" fill="white" stroke="#ddd" rx="10" />
        <!-- Placeholder for product image -->
        <rect x="10" y="10" width="280" height="200" fill="#eee" /> 
        <text x="150" y="230" fill="#333" font-size="20" font-family="Arial" text-anchor="middle">Product Name 1</text>
        <text x="150" y="260" fill="#666" font-size="16" font-family="Arial" text-anchor="middle">Short description here</text>
        <text x="150" y="300" fill="#4CAF50" font-size="24" font-family="Arial" text-anchor="middle">$29.99</text>
      </g>

      <!-- Product 2 -->
      <g id="Product2" transform="translate(350, 0)"> 
        <rect width="300" height="380" fill="white" stroke="#ddd" rx="10" />
        <rect x="10" y="10" width="280" height="200" fill="#eee" /> 
        <text x="150" y="230" fill="#333" font-size="20" font-family="Arial" text-anchor="middle">Product Name 2</text>
        <text x="150" y="260" fill="#666" font-size="16" font-family="Arial" text-anchor="middle">Short description here</text>
        <text x="150" y="300" fill="#4CAF50" font-size="24" font-family="Arial" text-anchor="middle">$49.99</text>
      </g>

      <!-- Product 3 -->
      <g id="Product3" transform="translate(700, 0)">
        <rect width="300" height="380" fill="white" stroke="#ddd" rx="10" />
        <rect x="10" y="10" width="280" height="200" fill="#eee" /> 
        <text x="150" y="230" fill="#333" font-size="20" font-family="Arial" text-anchor="middle">Product Name 3</text>
        <text x="150" y="260" fill="#666" font-size="16" font-family="Arial" text-anchor="middle">Short description here</text>
        <text x="150" y="300" fill="#4CAF50" font-size="24" font-family="Arial" text-anchor="middle">$39.99</text>
      </g>

      
    </g>
  </g>

  <!-- Footer -->
  <g id="Footer" transform="translate(0, 900)"> 
    <rect width="1440" height="124" fill="#333" />
    <text x="720" y="60" fill="white" font-size="16" font-family="Arial" text-anchor="middle">© 2024 Your Store. All rights reserved.</text>
  </g>

</svg>""",
        "tags": ["ecommerce", "homepage", "products", "categories", "promotions", "search"],
        "level":"easy",
        "created_at": datetime(2024, 10, 12, 12, 34, 56)
        }
    ]

    inserter.insert_template("HomePage", templates)

    # # Insert another template to demonstrate appending to the existing document
    # additional_templates = [
    #     {
    #         "name": "Ecommerce Home Page",
    #         "svg_code": "<svg xmlns='...'></svg>",
    #         "tags": ["ecommerce", "home"],
    #         "created_at": datetime(2024, 10, 12, 12, 40, 00)
    #     }
    # ]

    # inserter.insert_template("HomePage", additional_templates)
