# src/insert_component.py

from datetime import datetime
from database import Database

class ComponentInserter:
    def __init__(self, collection_name):
        self.collection = Database().get_collection(collection_name)

    def insert_component(self, component_document):
        result = self.collection.insert_one(component_document)
        print(f"Inserted document with ID: {result.inserted_id}")
