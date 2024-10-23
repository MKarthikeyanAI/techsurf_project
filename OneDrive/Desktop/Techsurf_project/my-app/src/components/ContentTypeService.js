import axios from 'axios';

const apiKey = 'bltb39f9ce1e39a0fae'; // Replace with your actual API key

const createContentType = async (authToken, contentType) => {
    console.log("AuthToken: ", authToken);
    const url = 'https://api.contentstack.io/v3/content_types';

    // Prepare contentTypeData based on the passed contentType
    const contentTypeData = {
        "content_type": {
            "title": contentType.title,
            "uid": contentType.uid,
            "schema": contentType.schema, // Use the passed schema
            "options": contentType.options // Use the passed options
        }
    };

    try {
        const response = await axios.post(url, contentTypeData, {
            headers: {
                'api_key': apiKey,
                'authtoken': authToken, // Use the token obtained from the login
                'Content-Type': 'application/json',
            },
        });
      
        console.log('Content Type Created:', response.data);
    } 
    catch (error) {
        console.log("In error of content type creation: ");
        console.log("IN ERROR ENTRY ID",error);
        console.error('Error creating content type:', error.response ? error.response.data : error.message);

        throw error; // Rethrow the error for handling in the caller
    }
    console.log("ERROR ENTRY FINISHED");
};

export default createContentType;