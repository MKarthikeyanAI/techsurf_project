import axios from 'axios';

const apiKey = 'bltb39f9ce1e39a0fae'; // Replace with your actual API key

const createContentType = async (authToken) => {
    console.log("AuthToken: ",authToken);
    const url = 'https://api.contentstack.io/v3/content_types';

    const contentTypeData = {
        "content_type": {
            "title": "Foodee",
            "uid": "foodee",
            "schema": [
                {
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
                    "data_type":"json",
                    "display_name":"JSON RTE",
                    "uid":"json_rte",
                    "field_metadata":{
                      "allow_json_rte":true,
                      "rich_text_type":"advanced",
                      "description":"",
                      "default_value":""
                    },
                    "reference_to":[
                      "character"
                    ],
                    "non_localizable":false,
                    "multiple":false,
                    "mandatory":false,
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
            ]
            // "options": {
            //     "title": "title",
            //     "publishable": true,
            //     "is_page": true,
            //     "singleton": false,
            //     "sub_title": ["url"],
            //     "url_pattern": "/:title",
            //     "url_prefix": "/"
            // }
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
    } catch (error) {
        console.error('Error creating content type:', error.response ? error.response.data : error.message);
    }
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
