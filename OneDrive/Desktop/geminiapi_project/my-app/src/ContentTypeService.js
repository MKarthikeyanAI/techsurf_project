import axios from 'axios';

const apiKey = 'bltb39f9ce1e39a0fae'; // Replace with your actual API key
// const email = 'mkarthikeyan00100010@gmail.com'; // Your Contentstack account email
// const password = 'Mj#@YSiE@YjK8un'; // Your Contentstack account password
// const tfaToken = 'cs114441072927fffb47025159'; // Two-factor authentication token if enabled

// const loginToContentstack = async () => {
//     const url = 'https://api.contentstack.io/v3/user-session';
    
//     const userCredentials = {
//         user: {
//             email: email,
//             password: password,
//             tfa_token: tfaToken, // Include this line if using 2FA
//         },
//     };

//     try {
//         const response = await axios.post(url, userCredentials, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
        
//         console.log("Logged In Response",response.data.user.authtoken);
//         const authToken = response.data.user.authtoken; // Extract the authtoken from the response
//         console.log('Logged in successfully. Authtoken:', authToken);
//         return authToken; // Return the authtoken for further requests
//     } catch (error) {
//         console.error('Error logging in:', error.response ? error.response.data : error.message);
//         throw error; // Rethrow the error for further handling
//     }
// };


const createContentType = async (authToken) => {
    console.log("AuthToken: ",authToken);
    const url = 'https://api.contentstack.io/v3/content_types';

    const contentTypeData = {
        "content_type": {
            "title": "Pagee",
            "uid": "pagee",
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
                "title": "title",
                "publishable": true,
                "is_page": true,
                "singleton": false,
                "sub_title": ["url"],
                "url_pattern": "/:title",
                "url_prefix": "/"
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
