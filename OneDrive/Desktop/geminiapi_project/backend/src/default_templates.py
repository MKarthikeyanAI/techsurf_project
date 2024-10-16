from pymongo import MongoClient
from datetime import datetime

class TemplateInserter:
    def __init__(self, collection_name):
        # Replace 'your_connection_string' with your MongoDB connection string
        self.client = MongoClient('mongodb+srv://karthikeyan:karthikeyanpassword@techsurf.d99mq.mongodb.net/?retryWrites=true&w=majority&appName=techsurf')
        self.db = self.client["svg_templates"]
        self.collection = self.db[collection_name]

    def insert_template(self, template_document):
        # Insert the document into the collection
        result = self.collection.insert_one(template_document)
        print(f"Template inserted with ID: {result.inserted_id}")

def main():
    inserter = TemplateInserter("default_templates")

    # Define the document structure
    template_document = {
        "name": "Sign In Page",
        "svg_code": """<svg width="1440" height="600" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">

  
  <!-- Background Gradient -->
  <defs>
    <linearGradient id="ctaBackgroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e3f2fd;stop-opacity:1" /> <!-- Light Blue -->
      <stop offset="100%" style="stop-color:#bbdefb;stop-opacity:1" /> <!-- Deeper Blue -->
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1440" height="600" fill="url(#ctaBackgroundGradient)" />

  <g transform="translate(100, 100)">
    <text x="0" y="0" text-anchor="start" dominant-baseline="middle" font-size="48" font-weight="bold" fill="#333">
      WELCOME BACK
    </text>
    <text x="0" y="50" text-anchor="start" dominant-baseline="middle" font-size="16" fill="#333">
      Welcome back! Please enter your details.
    </text>

    <g transform="translate(0, 100)">
      <text x="0" y="0" text-anchor="start" dominant-baseline="middle" font-size="18" font-weight="bold" fill="#333">
        Email
      </text>
      <rect x="0" y="20" width="300" height="40" rx="10" fill="#fff" stroke="#ccc" stroke-width="1" />
      <text x="10" y="40" text-anchor="start" dominant-baseline="middle" font-size="14" fill="#999">
        Enter your email
      </text>
    </g>

    <g transform="translate(0, 180)">
      <text x="0" y="5" text-anchor="start" dominant-baseline="middle" font-size="18" font-weight="bold" fill="#333">
        Password
      </text>
      <rect x="0" y="20" width="300" height="40" rx="10" fill="#fff" stroke="#ccc" stroke-width="1" />
      <text x="10" y="40" text-anchor="start" dominant-baseline="middle" font-size="14" fill="#999">
        ********
      </text>
    </g>

    <g transform="translate(0, 250)">
      <rect x="0" y="0" width="20" height="20" fill="none" stroke="#ccc" stroke-width="1" />
      <circle cx="10" cy="10" r="8" fill="#fff" stroke="#ccc" stroke-width="1" />
      <text x="30" y="15" text-anchor="start" dominant-baseline="middle" font-size="14" fill="#333">
        Remember me
      </text>
      <text x="200" y="15" text-anchor="start" dominant-baseline="middle" font-size="14" fill="#333">
        Forgot password
      </text>
    </g>

    <g transform="translate(0, 280)">
      <rect x="0" y="0" width="300" height="50" rx="20" fill="#f00" stroke="none" />
      <text x="150" y="25" text-anchor="middle" dominant-baseline="middle" font-size="18" font-weight="bold" fill="#fff">
        Sign In
      </text>
    </g>

    <g transform="translate(0, 350)">
      <rect x="0" y="0" width="300" height="50" rx="20" fill="#fff" stroke="none" />
      <g transform="translate(10, 10)">
        <circle cx="20" cy="20" r="15" fill="#db4437" stroke="none" />
        <text x="50" y="20" text-anchor="start" dominant-baseline="middle" font-size="16" fill="#333">
          Sign In with Google
        </text>
      </g>
    </g>

    <text x="20" y="430" text-anchor="start" dominant-baseline="middle" font-size="14" fill="#333">
      Don't have an account? <a href="#">Sign Up</a> for free!
    </text>

  </g>

</svg>""",
        "prompts": ["login","sign in","sign up"]
    }

    # Insert the document
    inserter.insert_template(template_document)

if __name__ == "__main__":
    main()
