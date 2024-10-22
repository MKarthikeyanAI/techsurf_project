import axios from 'axios';
import { isTokenExpired, refreshToken } from '../auth/authHelpers';

const createContentType = async (stackApiKey, accessToken, regionUrl, contentType) => {
    const url = `https://eu-api.contentstack.com/v3/content_types`;

    console.log("final token in create content ",accessToken)
    // Check if the token is expired

    if (isTokenExpired(accessToken)) {
        console.log('Token is expired, refreshing...');
        
        try {
            accessToken = await refreshToken(regionUrl);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw new Error('Unable to refresh token. Please re-authenticate.');
        }
    }

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
                'api_key': stackApiKey,
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Content Type Created:', response.data);
    } catch (error) {
        console.error('Error creating content type:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default createContentType;