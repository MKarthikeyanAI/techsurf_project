import axios from 'axios';

const apiKey = 'bltb39f9ce1e39a0fae'; // Replace with your actual API key

const createContentType = async (authToken) => {
    console.log("AuthToken: ",authToken);
    const url = 'https://api.contentstack.io/v3/content_types';

    const contentTypeData = {
            "content_type": {
                "title": "Pagqe",
                "uid": "pagqe",
                "schema": [{
                        "display_name": "Title",
                        "uid": "title",
                        "data_type": "text",
                        "field_metadata": {
                            "_default": true
                        },
                        "unique": false,
                        "mandatory": true,
                        "multiple": false
                    },
                    {
                        "display_name": "URL",
                        "uid": "url",
                        "data_type": "text",
                        "field_metadata": {
                            "_default": true
                        },
                        "unique": false,
                        "multiple": false
                    }
                ],
                "options": {
                    "singleton": true,
        
                }
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
        console.log("ERROR IN CREATING CONTENT TYPE MK");
        console.error('Error creating content type:', error.response ? error.response.data : error.message);
    }
    console.log("CATCH FINISHED");
};

// // Main function to execute the login and create content type
// const main = async () => {
//     try {
//         const authToken = await loginToContentstack(); // Login and get the authtoken
//         await createContentType(authToken); // Create content type with the authtoken
//     } catch (error) {
//         console.error('Failed to complete operations:', error.message);
//     }
// };

// main(); // Run the main function

export default createContentType; // You can still export the createContentType if needed
