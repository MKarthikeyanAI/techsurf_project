import React, { useState } from 'react';
import './ContentTypeCard.css';
import createContentType from './ContentTypeService'; // Ensure the correct import path
import loginToContentstack from './loginToContentstack'; // Ensure the correct import path

const ContentTypeCard = ({ contentType }) => {

  const [message, setMessage] = useState('');

  const handleCreateClick = async () => {
    try {
      // Login and get the auth token
      const authToken = await loginToContentstack();
      console.log("AuthToken in ContentTypeCard.js: ", authToken);

      // Create content type
      const message = await createContentType(authToken, contentType); // Pass the contentType to create
      console.log("Message: ",message);
      setMessage(`Successfully created content type: ${contentType.title}`);

      // Clear the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error during creating content type:', error.message);
      setMessage('Oops, something went wrong while creating the content type.');

      // Clear the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="content-type-card">
      <h3 className="content-type-title">{contentType.title}</h3>
      <button onClick={handleCreateClick} className="create-button">
        Create
      </button>
      {message && (
        <p className={`status-message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ContentTypeCard;
