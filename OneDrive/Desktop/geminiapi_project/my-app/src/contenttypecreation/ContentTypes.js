import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import loginToContentstack from './loginToContentstack';

const ContentTypes = () => {
    const [contentTypes, setContentTypes] = useState([]);

    const fetchContentTypes = useCallback(async () => {
        try {
            // createContentType();
            // Step 1: Login and get the auth token
            const authToken = await loginToContentstack();
            console.log("AuthToken in ContentTypes.js file:", authToken);

            const response = await axios.get('https://api.contentstack.io/v3/content_types', {
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': authToken,
                    'api_key': 'bltb39f9ce1e39a0fae'
                },
                params: {
                    include_count: false,
                    include_global_field_schema: true,
                    include_branch: false
                }
            });
            console.log(response.data);
            setContentTypes(response.data.content_types);
        } catch (error) {
            console.error('Error fetching content types:', error);
        }
    }, []); // Empty array means the function will only be created once

    useEffect(() => {
        fetchContentTypes();
    }, [fetchContentTypes]);

    return (
        <div>
            <h1>Content Types</h1>
            <ul>
                {contentTypes.map(contentType => (
                    <li key={contentType.uid}>{contentType.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ContentTypes;
