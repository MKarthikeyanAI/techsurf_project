import json

# Mock function for matching website types (replace with your actual implementation)
def match_website_type(prompt):
    # Example matching logic (this should be your actual matching logic)
    if "blog" in prompt.lower():
        return "Blog Website"
    if "ecommerce" in prompt.lower():
        return "E-commerce Website"
    return "Generic Website"

# Mock database class for fetching documents (replace with your actual implementation)
class Database:
    def fetch_document_by_website_type(self, website_type):
        # Simulated document retrieval (replace with actual database query)
        mock_documents = {
            "Blog Website": {"_id":{"$oid":"6712aca4ae72ffb84acd9303"},"website_type":"Blog Website","content_types":[{"name":"Home Page","fields":[{"field_name":"Title","type":"text"},{"field_name":"Hero Image","type":"file"},{"field_name":"Intro Text","type":"multi-line text"}],"template_type":"Single","grouping":"ungroup"},{"name":"Blog Post","fields":[{"field_name":"Post Title","type":"text"},{"field_name":"Content","type":"multi-line text"},{"field_name":"Author","type":"reference"},{"field_name":"Categories","type":"array"},{"field_name":"Featured Image","type":"file"},{"field_name":"Publish Date","type":"date"}],"template_type":"Multiple","grouping":"ungroup"},{"name":"Author","fields":[{"field_name":"Full Name","type":"text"},{"field_name":"Bio","type":"multi-line text"},{"field_name":"Profile Picture","type":"file"},{"field_name":"Social Links","type":"array"}],"template_type":"Multiple","grouping":"ungroup"},{"name":"Categories","fields":[{"field_name":"Category Name","type":"text"},{"field_name":"Description","type":"multi-line text"}],"template_type":"Multiple","grouping":"ungroup"},{"name":"Tags","fields":[{"field_name":"Tag Name","type":"text"}],"template_type":"Multiple","grouping":"ungroup"},{"name":"About Us","fields":[{"field_name":"Title","type":"text"},{"field_name":"Content","type":"multi-line text"},{"field_name":"Team Members","type":"array"}],"template_type":"Single","grouping":"ungroup"}]}
        }
        return mock_documents.get(website_type)

# Main function for testing
def generate_design(prompt, design_type):
    if not prompt or not design_type:
        return {"message": "Prompt and designType are required"}, 400

    try:
        # Step 2: Match extracted keywords to a predefined website type
        matched_website_type = match_website_type(prompt)
        print("Matched Website Type:", matched_website_type)

        # Step 3: Query the Database for the matched website type
        db = Database()
        document = db.fetch_document_by_website_type(matched_website_type)

        if not document:
            return {"message": "No matching website type found"}, 404

        # Step 4: Process the document (you can add custom logic here)
        content_types = document.get("content_types", [])

        # Step 5: Return the data as JSON
        return {
            "design_type": design_type,
            "website_type": matched_website_type,
            "content_types": content_types,
        }

    except Exception as e:
        print(f"Error: {e}")
        return {"message": "Server error"}, 500

# Test the function
if __name__ == '__main__':
    # Sample input for testing
    test_prompt = "Create me a design for a blog"
    test_design_type = "Web Design"

    # Call the generate_design function
    result = generate_design(test_prompt, test_design_type)

    # Print the result
    print(json.dumps(result, indent=4))
