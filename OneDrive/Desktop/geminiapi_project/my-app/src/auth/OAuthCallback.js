// src/components/OAuthCallback.js
import React, { useEffect } from 'react';
import { exchangeAuthorizationCodeForToken } from './ExchangeAuthForAccess';
import App from '../App';

const OAuthCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const location = params.get('location'); // For region
    console.log("in oauth callback.........");
    console.log(code);
    console.log(location);

    if (code) {
      exchangeAuthorizationCodeForToken(code, location);
    }
    else{
      console.log("in Else block");
    }
  }, []);

  // Render the App component as a JSX element
  return <App />;
};

export default OAuthCallback;