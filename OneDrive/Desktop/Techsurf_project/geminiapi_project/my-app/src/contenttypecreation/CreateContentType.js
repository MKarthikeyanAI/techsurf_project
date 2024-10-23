import React from 'react';
import createContentType from '../components/ContentTypeService';
import loginToContentstack from '../components/loginToContentstack';
const CreateContentType = () => {
    const handleCreateContentType = async () => {
        // createContentType();
        try {
            // Login and get the auth token
            const authToken = await loginToContentstack();
            console.log("AuthToken in CreateContentType.js file: ",authToken);
            // Use the auth token to create content type
            await createContentType(authToken);
            console.log("MK Content type created successfully");
        } catch (error) {
            console.error('Error during creating content type:', error.message);
        }
    };
    return (
        <div>
            <h1>Create Content Type</h1>
            <button onClick={handleCreateContentType}>Create Content Type</button>
        </div>
    );
};

export default CreateContentType;
