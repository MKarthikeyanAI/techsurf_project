# src/database.py

# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# from config import MONGO_URI, DATABASE_NAME

# class Database:
#     def __init__(self):
#         # Create a new client and connect to the server
#         self.client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
        
#         # Send a ping to confirm a successful connection
#         try:
#             self.client.admin.command('ping')
#             print("Pinged your deployment. You successfully connected to MongoDB!")
#         except Exception as e:
#             print(f"Failed to connect to MongoDB: {e}")
        
#         self.db = self.client[DATABASE_NAME]

#     def get_collection(self, collection_name):
#         return self.db[collection_name]


# src/database.py

#storing svg_templates
# src/database.py

# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

# class Database:
#     def __init__(self):
#         # Create a new client and connect to the server
#         self.client = MongoClient(MONGO_URI, server_api=ServerApi('1'))

#         # Send a ping to confirm a successful connection
#         try:
#             self.client.admin.command('ping')
#             print("Pinged your deployment. You successfully connected to MongoDB!")
#         except Exception as e:
#             print(f"Failed to connect to MongoDB: {e}")

#         self.db = self.client[DATABASE_NAME]

#     def get_collection(self, collection_name):
#         return self.db[collection_name]

#     def fetch_svg_code(self, page_type, template_name):
#         """
#         Fetches the svg_code from the templates array in the specified collection
#         based on the page_type and template name.
#         """
#         collection = self.get_collection(COLLECTION_NAME)  # Ensure you specify your collection name

#         pipeline = [
#             {"$match": {"page_type": page_type}},  # Match the document by page_type
#             {"$unwind": "$templates"},             # Unwind the templates array
#             {"$match": {"templates.name": template_name}},  # Match the specific template name
#             {"$project": {"_id": 0, "svg_code": "$templates.svg_code"}}  # Project only the svg_code field
#         ]

#         result = collection.aggregate(pipeline)

#         for doc in result:
#             return doc['svg_code']

#         return None

# storing documents:

# src/database.py

# src/database.py

from pymongo import MongoClient
from pymongo.server_api import ServerApi
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME_TEMPLATES

class Database:
    def __init__(self):
        self.client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
        # self.client = MongoClient(MONGO_URI)
        self.db = self.client[DATABASE_NAME]

        # Send a ping to confirm a successful connection
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")        

    def get_collection(self, collection_name):
        return self.db[collection_name]
    

     # Function to fetch a document based on the website_type
    def fetch_document_by_website_type(self, website_type):
        collection = self.get_collection('content_types')  # Replace with your collection name
        try:
            document = collection.find_one({"website_type": website_type})
            return document
        except Exception as e:
            print(f"Error fetching document: {e}")
            return None
    

    # Function to fetch svg_code from the database based on page_type and template_name
    def fetch_svg_code(self,page_type, template_name):

        print("Page_Type: ",page_type)
        print("Templage_name: " ,template_name)
        # Access the collection
        collection = self.get_collection('svgTemplates')

        # Query to find the document with the specified page_type
        document = collection.find_one({"page_type": page_type})

        # Check if the document exists
        if not document:
            print(f"No document found for page_type: {page_type}")
            return None
        
        temp = document.get("templates")
        print(temp[0]["name"])

        # Iterate through the templates array to find the matching template name
        for template in document.get("templates", []):
            print("Inside for loop")
            if template['name'] == template_name:
                print(f"Found SVG Code for {template_name}: {template['svg_code']}")
                print("for loop reached")
                return template['svg_code']

        print(f"No SVG code found for template name: {template_name} under page_type: {page_type}.")
        return None

    # Function to fetch a document based on the website_type
    def fetch_document_by_website_type(self, website_type):
        # Access the 'content_types' collection
        collection = self.get_collection('content_types')
        try:
            # Query for the document with the specified website_type
            document = collection.find_one({"website_type": website_type})
            return document
        except Exception as e:
            print(f"Error fetching document: {e}")
            return None
