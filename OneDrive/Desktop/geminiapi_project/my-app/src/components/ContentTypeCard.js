import React, { useState } from 'react';
import './ContentTypeCard.css';
// import createContentType from './ContentTypeService'; // Ensure the correct import path
// import loginToContentstack from './loginToContentstack'; // Ensure the correct import path
import { isUserAuthenticated, redirectToContentstackOAuth } from '../auth/authHelpers.js'; // Import auth helpers
import RegionModal from './RegionModal.js'; // Import the RegionModal component

const ContentTypeCard = ({ contentType }) => {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [regionUrl, setRegionUrl] = useState(''); // State to hold the selected region URL

  const handleCreateClick = async () => {
    try {
      // Check if user is authenticated
      if (!isUserAuthenticated()) {
        // If not authenticated, open the region modal
        setIsModalOpen(true);
        return; // Stop the function execution here
      }

      // If authenticated, proceed to login and get the auth token
      // const authToken = await loginToContentstack();
      // console.log("AuthToken in ContentTypeCard.js: ", authToken);

      // // Create content type
      // const message = await createContentType(authToken, contentType); // Pass the contentType to create
      // console.log("Message: ", message);
      // setMessage(Successfully created content type: ${contentType.title});

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

  const handleRegionSubmit = (url) => {
    setRegionUrl(url); // Set the selected region URL
    redirectToContentstackOAuth(url); // Redirect to Contentstack OAuth
    setIsModalOpen(false); // Close the modal after selection
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
      {isModalOpen && (
        <RegionModal onClose={() => setIsModalOpen(false)} onSubmit={handleRegionSubmit} />
      )}
    </div>
  );
};

export default ContentTypeCard;