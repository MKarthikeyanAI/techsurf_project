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
    "website_type": "Blog Website",
    "content_types": [
        {
            "name": "Home Page",
            "fields": [
                {"field_name": "Title", "type": "text"},
                {"field_name": "Hero Image", "type": "file"},
                {"field_name": "Intro Text", "type": "multi-line text"}
            ],
            "template_type": "Single",
            "grouping": "ungroup"
        },
        {
            "name": "Blog Post",
            "fields": [
                {"field_name": "Post Title", "type": "text"},
                {"field_name": "Content", "type": "multi-line text"},
                {"field_name": "Author", "type": "reference"}, 
                {"field_name": "Categories", "type": "array"},       
                {"field_name": "Featured Image", "type": "file"},
                {"field_name": "Publish Date", "type": "date"}
            ],
            "template_type": "Multiple",
            "grouping": "ungroup"
        },
        {
            "name": "Author",
            "fields": [
                {"field_name": "Full Name", "type": "text"},
                {"field_name": "Bio", "type": "multi-line text"},
                {"field_name": "Profile Picture", "type": "file"},
                {"field_name": "Social Links", "type": "array"} 
            ],
            "template_type": "Multiple",
            "grouping": "ungroup"
        },
        {
            "name": "Categories",
            "fields": [
                {"field_name": "Category Name", "type": "text"},
                {"field_name": "Description", "type": "multi-line text"}
            ],
            "template_type": "Multiple",
            "grouping": "ungroup"
        },
        {
            "name": "Tags",
            "fields": [
                {"field_name": "Tag Name", "type": "text"}
            ],
            "template_type": "Multiple",
            "grouping": "ungroup"
        },
        {
            "name": "About Us",
            "fields": [
                {"field_name": "Title", "type": "text"},
                {"field_name": "Content", "type": "multi-line text"},
                {"field_name": "Team Members", "type": "array"}  
            ],
            "template_type": "Single",
            "grouping": "ungroup"
        }
    ]
}

    # Insert the document
    inserter.insert_template(template_document)

if __name__ == "__main__":
    main()
