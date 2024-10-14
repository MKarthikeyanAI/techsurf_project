import base64
import pyperclip

def image_to_base64(image_path):
    """Convert an image file to a Base64 string with the correct MIME type."""
    with open(image_path, "rb") as image_file:
        # Read the image and encode it to base64
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    
    # Get the file extension to determine MIME type
    if image_path.lower().endswith('.png'):
        mime_type = 'image/png'
    elif image_path.lower().endswith('.jpg') or image_path.lower().endswith('.jpeg'):
        mime_type = 'image/jpeg'
    elif image_path.lower().endswith('.gif'):
        mime_type = 'image/gif'
    elif image_path.lower().endswith('.webp'):
        mime_type = 'image/webp'
    else:
        raise ValueError("Unsupported image format. Supported formats: .png, .jpg, .jpeg, .gif, .webp")

    # Format for use in HTML or SVG
    base64_string = f"data:{mime_type};base64,{encoded_image}"
    return base64_string

# Specify the path to your image
image_path = "C:/Users/mkart/OneDrive/Desktop/geminiapi_project/backend/src/images/blog1.jpg"

# Convert the image to Base64
base64_string = image_to_base64(image_path)

# Print the Base64 encoded image
print("Base64 Encoded Image:")
print(base64_string)

# Copy the Base64 string to the clipboard
pyperclip.copy(base64_string)
print("Base64 string copied to clipboard!")



# image_path = "C:/Users/mkart/OneDrive/Desktop/geminiapi_project/backend/src/images/best-about-us-pages.png"