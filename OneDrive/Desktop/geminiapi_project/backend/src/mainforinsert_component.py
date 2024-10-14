from datetime import datetime
from insert_component import ComponentInserter

def main():
    # Create an instance of the ComponentInserter for the "components" collection
    inserter = ComponentInserter("components")

    # Define the Header Section component document
    component_document = {
        "component_name": "Header Section",
        "category": "UI Components",
        "description": "A header section containing a logo, search bar, account icon, and cart icon.",
        "keywords": ["header", "logo", "search bar", "account", "cart"],
        "prompt_examples": [
            "Create a header with a logo and search bar",
            "Design a header section with account and cart icons"
        ],
        "svg_code": """<svg width="1440" height="100" xmlns="http://www.w3.org/2000/svg">
  <!-- Navbar Background -->
  <rect x="0" y="0" width="1440" height="100" fill="#ffffff" stroke="#e0e0e0" />
  
  <!-- Logo -->
  <rect x="40" y="25" width="150" height="50" rx="5" fill="#333" />
  <text x="115" y="60" font-family="Arial" font-size="18" fill="#ffffff" text-anchor="middle">BrandLogo</text>
  
  <!-- Menu Items -->
  <text x="400" y="60" font-family="Arial" font-size="16" fill="#333">Home</text>
  <text x="500" y="60" font-family="Arial" font-size="16" fill="#333">Shop</text>
  <text x="600" y="60" font-family="Arial" font-size="16" fill="#333">About Us</text>
  <text x="720" y="60" font-family="Arial" font-size="16" fill="#333">Contact</text>
  
  <!-- Search Bar -->
  <rect x="900" y="25" width="300" height="50" rx="25" fill="#f5f5f5" />
  <text x="920" y="60" font-family="Arial" font-size="14" fill="#888">Search...</text>
  
  <!-- Login Button -->
  <rect x="1230" y="25" width="90" height="40" rx="20" fill="url(#loginGradient)" />
  <text x="1275" y="52" font-family="Arial" font-size="16" fill="#ffffff" text-anchor="middle">Login</text>
  
  <!-- Signup Button -->
  <rect x="1330" y="25" width="90" height="40" rx="20" fill="url(#signupGradient)" />
  <text x="1375" y="52" font-family="Arial" font-size="16" fill="#ffffff" text-anchor="middle">Signup</text>
  
  <!-- Gradients for Buttons -->
  <defs>
    <!-- Login Button Gradient -->
    <linearGradient id="loginGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
    </linearGradient>
    
    <!-- Signup Button Gradient -->
    <linearGradient id="signupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e74c3c;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c0392b;stop-opacity:1" />
    </linearGradient>
  </defs>
</svg>""",
        "created_at": datetime.now()  # Correct usage of datetime.now()
    }

    # Insert the Header Section component document
    inserter.insert_component(component_document)

if __name__ == "__main__":
    main()
