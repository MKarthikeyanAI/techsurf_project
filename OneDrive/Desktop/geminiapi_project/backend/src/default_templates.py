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
    inserter = TemplateInserter("content_types")

    
    # Define the document structure
    template_document = {
    "website_type": "General Website",
    "content_types": [
        {
            "name": "Home Page",
            "fields": [
                {"field_name": "Title", "type": "text"},
                {"field_name": "Hero Image", "type": "file"},
                {"field_name": "Intro Text", "type": "multi-line text"}
            ],
            "template_type": "Single",  # Only one Home Page
            "grouping": "ungroup"
        },
        {
            "name": "About Us",
            "fields": [
                {"field_name": "Company Name", "type": "text"},
                {"field_name": "Description", "type": "multi-line text"},
                {"field_name": "Mission Statement", "type": "multi-line text"},
                {"field_name": "Team Photo", "type": "file"}
            ],
            "template_type": "Single",  # Only one About Us page
            "grouping": "group"  # Fields are grouped for company info
        },
        {
            "name": "Services/Products",
            "fields": [
                {"field_name": "Service/Product Name", "type": "text"},
                {"field_name": "Description", "type": "multi-line text"},
                {"field_name": "Price", "type": "number"},
                {"field_name": "Image", "type": "file"}
            ],
            "template_type": "Multiple",  # Multiple services or products
            "grouping": "group"  # Fields are grouped by service/product details
        },
        {
            "name": "Contact Page",
            "fields": [
                {"field_name": "Contact Title", "type": "text"},
                {"field_name": "Phone Number", "type": "text"},
                {"field_name": "Email", "type": "text"},
                {"field_name": "Address", "type": "multi-line text"}
            ],
            "template_type": "Single",  # Only one contact page
            "grouping": "group"  # Group fields for contact info
        },
        {
            "name": "Blog",
            "fields": [
                {"field_name": "Post Title", "type": "text"},
                {"field_name": "Post Content", "type": "multi-line text"},
                {"field_name": "Author", "type": "text"},
                {"field_name": "Published Date", "type": "date"}
            ],
            "template_type": "Multiple",  # Multiple blog posts
            "grouping": "ungroup"
        },
        {
            "name": "Privacy Policy/Terms and Conditions",
            "fields": [
                {"field_name": "Title", "type": "text"},
                {"field_name": "Content", "type": "multi-line text"}
            ],
            "template_type": "Single",  # Only one Privacy Policy/Terms page
            "grouping": "ungroup"
        }
    ]
}
    # Insert the document
    inserter.insert_template(template_document)

if __name__ == "__main__":
    main()
