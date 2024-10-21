import axios from 'axios';
const tokenUrl = 'https://eu-app.contentstack.com/apps-api/apps/token';

// Redirect to Contentstack OAuth login page
export function redirectToContentstackOAuth(regionUrl) {
  const clientId = "u7ZmYJM3vkCrEQru";
  const redirectUri = "https://techsurf-project.onrender.com/";
  const appUID = "6714a525e15a8400128d6781";
  const scope = 'cm.content-types.management:write cm.stacks.management:read organizations:read';
  console.log(regionUrl);

  const authUrl = `${regionUrl}/apps/${appUID}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  window.location.href = authUrl;
}

// Store tokens and set the user as authenticated
export function storeTokens(accessToken, refreshToken, expiresIn) {
  localStorage.setItem('contentstackAccessToken', accessToken);
  localStorage.setItem('contentstackRefreshToken', refreshToken);
  
  // Calculate token expiration time
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem('contentstackTokenExpiration', expirationTime);
  
  // Set the user as authenticated
  localStorage.setItem('isAuthenticated', 'true');
  console.log("Tokens stored, user is authenticated");
}

// Check if the token is expired
export function isTokenExpired() {
  const expirationTime = localStorage.getItem('contentstackTokenExpiration');
  if (!expirationTime) {
    return true; // Token expiration time not set
  }
  return new Date().getTime() > expirationTime;
}

// Get access token from localStorage
export function getAccessToken() {
  return localStorage.getItem('contentstackAccessToken');
}

// Get refresh token from localStorage
export function getRefreshToken() {
  return localStorage.getItem('contentstackRefreshToken');
}

// Refresh the access token using the refresh token
export async function refreshToken() {
  const refreshToken = localStorage.getItem('contentstackRefreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', 'u7ZmYJM3vkCrEQru');
  params.append('client_secret', 'PbKOTCy5MsgM7Jdm1r1uqgZLu415HFcb');
  params.append('redirect_uri', 'https://www.google.com/');
  params.append('refresh_token', refreshToken);

  try {
    const response = await axios.post(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, refresh_token, expires_in } = response.data;
    storeTokens(access_token, refresh_token, expires_in);
    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    // Handle token refresh failure (e.g., redirect to login)
    throw error;
  }
}

// Function to check if the user is authenticated
export function isUserAuthenticated() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  // Check if the user is authenticated and if the token is not expired
  return isAuthenticated === 'true' && !isTokenExpired();
}

// Function to log out the user and clear localStorage
export function logOut() {
  localStorage.removeItem('contentstackAccessToken');
  localStorage.removeItem('contentstackRefreshToken');
  localStorage.removeItem('contentstackTokenExpiration');
  localStorage.removeItem('isAuthenticated');
  console.log("User logged out, tokens cleared");
}