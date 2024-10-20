from datetime import datetime
from insert_component import ComponentInserter

def main():
    # Create an instance of the ComponentInserter for the "components" collection
    inserter = ComponentInserter("components")
    component_document={
    "component_name": "User-Generated Content",
    "category": "UI Components",
    "description": "A section showcasing customer-generated content, such as posts from social media feeds, that feature products purchased from the brand.",
    "keywords": [
        "User-generated content",
        "Social media feeds",
        "Customer posts",
        "Instagram gallery",
        "Customer showcase",
        "Social proof",
        "Brand hashtag feed",
        "User photos",
        "Customer testimonials",
        "Community highlights",
        "Social wall",
        "Feed of customer images",
        "User contributions"
    ],
    "prompt_examples": [
        "Create a section to display user-generated content from Instagram",
        "Design a social media feed showcasing customer posts with our products"
    ],
    "svg_code": """<svg width="1440" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient Definition -->
    <linearGradient id="userGeneratedContentBackgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffe5b4;stop-opacity:1" /> <!-- Light Peach -->
      <stop offset="100%" style="stop-color:#ffcc80;stop-opacity:1" /> <!-- Slightly Darker Peach -->
    </linearGradient>
  </defs>
  
  <!-- Background Layer -->
  <g id="backgroundLayer">
    <rect x="0" y="0" width="1440" height="500" fill="url(#userGeneratedContentBackgroundGradient)" />
  </g>

  <!-- User-Generated Content Group -->
  <g transform="translate(140, 80)">
    <!-- Title Layer -->
    <g id="titleLayer">
      <text x="720" y="0" font-family="Arial" font-size="40" fill="#d84315" text-anchor="middle" font-weight="bold">User-Generated Content</text>
      <text x="720" y="40" font-family="Arial" font-size="20" fill="#3e2723" text-anchor="middle" font-weight="normal">Check out how our customers style their favorite products!</text>
    </g>

    <!-- Instagram Feed Layer -->
    <g id="instagramFeedLayer" transform="translate(0, 60)">
      <!-- Feed Item 1 -->
      <g id="feedItem1" >
        <rect x="0" y="0" width="200" height="200" rx="15" fill="#ffffff" stroke="rgba(0,0,0,0.1)" stroke-width="2" />
        <image href="https://via.placeholder.com/200" x="0" y="0" width="200" height="200" rx="15" />
        <text x="100" y="220" font-family="Arial" font-size="16" fill="#616161" text-anchor="middle">@customer1</text>
        <text x="100" y="240" font-family="Arial" font-size="14" fill="#757575" text-anchor="middle">“Love this product! Highly recommend!”</text>
      </g>

      <!-- Feed Item 2 -->
      <g id="feedItem2" transform="translate(300, 0)">
        <rect x="0" y="0" width="200" height="200" rx="15" fill="#ffffff" stroke="rgba(0,0,0,0.1)" stroke-width="2" />
        <image href="https://via.placeholder.com/200" x="0" y="0" width="200" height="200" rx="15" />
        <text x="100" y="220" font-family="Arial" font-size="16" fill="#616161" text-anchor="middle">@customer2</text>
        <text x="100" y="240" font-family="Arial" font-size="14" fill="#757575" text-anchor="middle">“This is my go-to brand for everything!”</text>
      </g>

      <!-- Feed Item 3 -->
      <g id="feedItem3" transform="translate(600, 0)">
        <rect x="0" y="0" width="200" height="200" rx="15" fill="#ffffff" stroke="rgba(0,0,0,0.1)" stroke-width="2" />
        <image href="https://via.placeholder.com/200" x="0" y="0" width="200" height="200" rx="15" />
        <text x="100" y="220" font-family="Arial" font-size="16" fill="#616161" text-anchor="middle">@customer3</text>
        <text x="100" y="240" font-family="Arial" font-size="14" fill="#757575" text-anchor="middle">“Fantastic quality and fast shipping!”</text>
      </g>

      <g id="feedItem4" transform="translate(900, 0)">
        <rect x="0" y="0" width="200" height="200" rx="15" fill="#ffffff" stroke="rgba(0,0,0,0.1)" stroke-width="2" />
        <image href="https://via.placeholder.com/200" x="0" y="0" width="200" height="200" rx="15" />
        <text x="100" y="220" font-family="Arial" font-size="16" fill="#616161" text-anchor="middle">@customer4</text>
        <text x="100" y="240" font-family="Arial" font-size="14" fill="#757575" text-anchor="middle">“Fantastic super and fast shopping!”</text>
      </g>
    </g>

    <!-- Call-to-Action Layer -->
    <g id="ctaLayer" transform="translate(600, 350)">
      <rect x="-100" y="0" width="200" height="50" rx="25" fill="#d32f2f" />
      <text x="0" y="30" font-family="Arial" font-size="18" fill="#ffffff" text-anchor="middle" font-weight="bold">Share Your Style!</text>
    </g>

    <!-- Decorative Elements Layer -->
    <g id="decorativeElementsLayer" transform="translate(0, -40)">
      <circle cx="0" cy="0" r="30" fill="#ffffff" opacity="0.2" />
      <circle cx="1220" cy="320" r="40" fill="#ffffff" opacity="0.1" />
    </g>
  </g>
</svg>""",
    "created_at": datetime.now()  # Correct usage of datetime.now()
}


    # Insert the Header Section component document
    inserter.insert_component(component_document)

if __name__ == "__main__":
    main()
