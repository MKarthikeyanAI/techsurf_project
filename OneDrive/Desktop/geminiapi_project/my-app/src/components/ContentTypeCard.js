import React, { useState } from 'react';
import './ContentTypeCard.css';
import { isUserAuthenticated, redirectToContentstackOAuth, getAccessToken } from '../auth/authHelpers.js';
import RegionModal from './RegionModal.js';
import StackModal from './StackModal.js';
import { fetchOrganizations } from './ContentstackService'; // Service for fetching organizations
import { PulseLoader } from "react-spinners"; // Import the spinner component
import createContentType from './createContentType.js'; // Import the function to create 

const ContentTypeCard = ({ contentType }) => {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // New state variable for success status
  const [loading, setLoading] = useState(false); // New state variable for loading status
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [regionUrl, setRegionUrl] = useState(''); // State to hold the selected region URL
  const [isStackModalOpen, setIsStackModalOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState('');

  

  const handleCreateClick = async () => {
    try {
      // Access the stored stack API key from localStorage
      const storedStackApiKey = localStorage.getItem('selectedStack');
      // Check if user is authenticated
      if (!isUserAuthenticated()) {
        setMessage('🔒Login required');
        return; // Stop the function execution here
      }
      console.log("Using stored stack API KEY: ",storedStackApiKey)
      if (storedStackApiKey) {
        const accessToken = getAccessToken(); // Retrieve access token from localStorage
        console.log('Using stored stack API key:', storedStackApiKey);
        await createContentType(stackApiKey, accessToken, regionUrl, contentType); // Call content type creation function
        setMessage('Created Successfully.');
      	setIsSuccess(true); // Set success state to true
        return;
      } 
      else {
        // If no stack API key is stored, fetch organizations and prompt the user to select a stack
        const accessToken = getAccessToken();
        console.log("Access token-- ", accessToken); 
        const organizations = await fetchOrganizations(accessToken);
        console.log("Organizations: ", organizations);

        if (organizations.length === 0) {
          setMessage('No organizations found.');
          return;
        }

        // Automatically select the first organization for this example
        setOrganizationId(organizations[1].uid);
        console.log("Organization ID: ", organizations[1].uid);
        setIsStackModalOpen(true); // Open stack modal to select the stack
      }
      

      // Clear the message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }catch (error) {
      console.error('Error during creating content type:', error.message);
      setMessage('Oops...Try Again Later');
      setIsSuccess(false); // Ensure success state is false on error
    } finally {
      setLoading(false); // Reset loading state regardless of success or error
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

  const handleStackSubmit = async (stackApiKey) => {
    // Store the selected stack API key in localStorage
    localStorage.setItem('selectedStack', stackApiKey);
    console.log('Selected Stack API Key:', stackApiKey);

    setIsStackModalOpen(false);

    const accessToken = getAccessToken();
    
    try {
      await createContentType(stackApiKey, accessToken, regionUrl, contentType); // Call content type creation function
      setMessage('Content type created successfully.');
    } catch (error) {
      setMessage('Error creating content type.');
      console.error(error);
    }
  };
  
  return (
    <div className={`content-type-card ${isSuccess ? 'success' : ''}`}> {/* Conditional class for success */}
      <h3 className="content-type-title">{contentType.title}</h3>
      <button 
        onClick={handleCreateClick} 
        className="create-button" 
        disabled={isSuccess || loading} // Disable the button if the content type is created or loading
      >
        {loading ? (
          <PulseLoader color="#ffffff" size={8} /> // Show spinner when loading
        ) : (
          isSuccess ? 'Created' : 'Create' // Change button text based on state
        )}
      </button>
      {message && (
        <p className={`status-message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
      {isModalOpen && (
        <RegionModal onClose={() => setIsModalOpen(false)} onSubmit={handleRegionSubmit} />
      )}
      {isStackModalOpen && (
        <StackModal
          organizationId={organizationId}
          onClose={() => setIsStackModalOpen(false)}
          onSubmit={handleStackSubmit}
        />
      )}
    </div>
  );
};

export default ContentTypeCard;

