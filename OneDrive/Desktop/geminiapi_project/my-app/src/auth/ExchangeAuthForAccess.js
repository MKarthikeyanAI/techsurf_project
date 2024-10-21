// src/services/contentstackAPI.js
import axios from 'axios';
import { storeTokens } from './authHelpers';

const tokenUrl = 'https://eu-app.contentstack.com/apps-api/apps/token';

// Function to exchange authorization code for tokens
export async function exchangeAuthorizationCodeForToken(code, region) {
  console.log("authorization code ",code);

  const qs = new URLSearchParams();
  qs.append('grant_type', 'authorization_code');
  qs.append('client_id', 'u7ZmYJM3vkCrEQru');   // Stored in .env
  qs.append('client_secret', 'PbKOTCy5MsgM7Jdm1r1uqgZLu415HFcb'); // Stored in .env
  qs.append('redirect_uri', "https://techsurf-project-1.onrender.com/"); // Same as used in your curl
  qs.append('code', code);  // Authorization code

  // console.log("after parsing data");
    try {
      const response = await axios.post(tokenUrl, qs, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
  
      // Successfully exchanged code for token
      console.log("response--");
      console.log(response);  
      console.log('Access token:', response.data.access_token);
  
      const { access_token, refresh_token } = response.data;
      storeTokens(access_token, refresh_token);
      console.log("response code ",response.status);
  
      // You can redirect the user or trigger some action after obtaining tokens
      console.log('Access Token:', access_token);
      console.log('refresh Token:', refresh_token);
    } catch (error) {
      console.log("in catching error");
      console.error('Error exchanging code for token:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }

}