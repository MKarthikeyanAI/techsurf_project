import json

# Sample document (you can replace this with your MongoDB document)
document = {
    "_id": "6712aca4ae72ffb84acd9303",
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
            "name": "Author",
            "fields": [
                {"field_name": "Full Name", "type": "text"},
                {"field_name": "Bio", "type": "multi-line text"},
                {"field_name": "Profile Picture", "type": "file"}
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
            "name": "About Us",
            "fields": [
                {"field_name": "Title", "type": "text"},
                {"field_name": "Content", "type": "multi-line text"}
            ],
            "template_type": "Single",
            "grouping": "ungroup"
        }
    ]
}

def create_field_metadata(field_type):
    """Generate the field_metadata based on the field type."""
    if field_type == "multi-line text":
        return {
            "description": "",
            "default_value": "",
            "multiline": True
        }
    elif field_type == "file":
        return {
            "description": "",
            "rich_text_type": "standard"
        }
    else:  # Default for "text"
        return {
            "_default": True
        }

def process_content_type(content_type):
    """Process each content type to create the schema based on the input."""
    title = content_type['name']
    uid = title.lower().replace(" ", "")

    schema = []

    for field in content_type['fields']:
        field_name = field['field_name']
        field_type = field['type']

        # Create the field schema
        field_schema = {
            "display_name": field_name,
            "uid": field_name.lower().replace(" ", ""),
            "data_type": field_type,
            "field_metadata": create_field_metadata(field_type),
            "unique": field_name == "Title",
            "mandatory": field_name == "Title",
            "multiple": False
        }

        schema.append(field_schema)

    # Options based on the template type
    options = {
        "singleton": content_type['template_type'] == "Single"
    }

    # Final output for the content type
    output = {
        "content_type": {
            "title": title,
            "uid": uid,
            "schema": schema,
            "options": options
        }
    }

    return output

# Iterate over the content_types and generate output
final_output = [process_content_type(content_type) for content_type in document['content_types']]

# Print the final result
print(json.dumps(final_output, indent=4))


