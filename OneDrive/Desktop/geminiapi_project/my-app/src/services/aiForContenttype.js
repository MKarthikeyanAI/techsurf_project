// src/services/contentApi.js
export const fetchContentTypes = async (prompt, designType) => {
    try {
      const response = await fetch('http://localhost:5000/api/generate-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, designType }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      return data.content_types; // Return the array of content_types
    } catch (err) {
      console.error('Error fetching content types:', err);
      throw err;
    }
  };
  