from pymongo import MongoClient
import json
from bson import ObjectId  # Import ObjectId for conversion

# MongoDB connection details
MONGO_URI =  "mongodb+srv://karthikeyan:karthikeyanpassword@techsurf.d99mq.mongodb.net/?retryWrites=true&w=majority&appName=techsurf" # Update with your MongoDB connection string
DB_NAME = "svg_templates"  # Update with your database name
COLLECTION_NAME = "content_types"  # The collection containing your documents


def fetch_document_by_website_type(website_type):
    # Create a MongoDB client
    client = MongoClient(MONGO_URI)

    # Access the specified database and collection
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    # Query for the document with the specified website_type
    document = collection.find_one({"website_type": website_type})

    # Close the connection
    client.close()

    return document

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

# Test the function
if __name__ == '__main__':
    website_type = "Blog Website"  # Specify the website type to search for

    # Fetch the document
    document = fetch_document_by_website_type(website_type)

    # Check if the document was found and print the result
    if document:
        # Convert ObjectId to string for JSON serialization
        document = convert_objectid_to_str(document)
        print(json.dumps(document, indent=4))  # Pretty-print the document
        
    else:
        print(f"No document found for website type: {website_type}")
