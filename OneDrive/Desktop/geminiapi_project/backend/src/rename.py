import re

def extract_page_and_template(prompt):
    page_type = None
    template_name = None

    # Check for 'HomePage', 'Home Page', or variations where 'Home' and 'Page' are separated by other text
    if re.search(r'home.*page', prompt, re.IGNORECASE):
        page_type = 'HomePage'
    
    # Check for different types of websites like 'Blog Website' or 'Blog'
    if re.search(r'blog\s*website|blog', prompt, re.IGNORECASE):
        template_name = 'Blog Website'
    elif re.search(r'e[-\s]*commerce\s*website|e[-\s]*commerce', prompt, re.IGNORECASE):
        template_name = 'E-commerce Website'
    
    return page_type, template_name

prompt1 = "Create me a Home for the Page Blog Website"
prompt2 = "I need a HomePage for my blog"
prompt3 = "Can you design the homepage for a portfolio?"
prompt4 = "Make a website for my Blog"

page_type1, template_name1 = extract_page_and_template(prompt1)
page_type2, template_name2 = extract_page_and_template(prompt2)
page_type3, template_name3 = extract_page_and_template(prompt3)
page_type4, template_name4 = extract_page_and_template(prompt4)

print(f"Prompt 1 - Page Type: {page_type1}, Template Name: {template_name1}")
# Output: Prompt 1 - Page Type: HomePage, Template Name: Blog Website

print(f"Prompt 2 - Page Type: {page_type2}, Template Name: {template_name2}")
# Output: Prompt 2 - Page Type: HomePage, Template Name: Blog Website

print(f"Prompt 3 - Page Type: {page_type3}, Template Name: {template_name3}")
# Output: Prompt 3 - Page Type: HomePage, Template Name: None

print(f"Prompt 4 - Page Type: {page_type4}, Template Name: {template_name4}")
# Output: Prompt 4 - Page Type: None, Template Name: Blog Website

