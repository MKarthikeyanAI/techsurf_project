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

# src/database.py

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from config import MONGO_URI, DATABASE_NAME, COLLECTION_NAME

class Database:
    def __init__(self):
        # Create a new client and connect to the server
        self.client = MongoClient(MONGO_URI, server_api=ServerApi('1'))

        # Send a ping to confirm a successful connection
        try:
            self.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")

        self.db = self.client[DATABASE_NAME]

    def get_collection(self, collection_name):
        return self.db[collection_name]

    def fetch_svg_code(self, page_type, template_name):
        """
        Fetches the svg_code from the templates array in the specified collection
        based on the page_type and template name.
        """
        collection = self.get_collection(COLLECTION_NAME)  # Ensure you specify your collection name

        pipeline = [
            {"$match": {"page_type": page_type}},  # Match the document by page_type
            {"$unwind": "$templates"},             # Unwind the templates array
            {"$match": {"templates.name": template_name}},  # Match the specific template name
            {"$project": {"_id": 0, "svg_code": "$templates.svg_code"}}  # Project only the svg_code field
        ]

        result = collection.aggregate(pipeline)

        for doc in result:
            return doc['svg_code']

        return None

