import axios from 'axios';

const email = 'mkarthikeyan00100010@gmail.com'; 
const password = 'Mj#@YSiE@YjK8un'; 
const tfaToken = 'cs114441072927fffb47025159'; // Two-factor authentication token if enabled

// Function to login to Contentstack and retrieve auth token
export const loginToContentstack = async () => {
    const url = 'https://api.contentstack.io/v3/user-session';
    
    const userCredentials = {
        user: {
            email: email,
            password: password,
            tfa_token: tfaToken, // Include if 2FA is enabled
        },
    };

    try {
        const response = await axios.post(url, userCredentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        console.log("Logged In Response", response.data.user.authtoken);
        const authToken = response.data.user.authtoken; // Extract the authtoken from the response
        console.log('Logged in successfully. Authtoken:', authToken);
        return authToken; // Return the authtoken for further requests
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};

export default loginToContentstack;
