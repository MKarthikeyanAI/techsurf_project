import React, { useState } from 'react';
import './RightSidebar.css';
import ContentTypeCard from './ContentTypeCard';
import { isUserAuthenticated, redirectToContentstackOAuth, logOut } from '../auth/authHelpers'; // Import authentication helpers
import RegionModal from './RegionModal'; // Import modal for login

const RightSidebar = ({ contentTypes }) => {

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [regionUrl, setRegionUrl] = useState(''); // State to hold the selected region URL
  const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());

  console.log(regionUrl);


  const handleLoginClick = () => {
    // if (isUserAuthenticated) {
    //   // If already authenticated, log out
    //   setIsModalOpen(true);

      
    // } else {
    //   // If not authenticated, open the modal to login
    //   logOut();
    // }
    if (isAuthenticated) {
      // If already authenticated, log out the user
      logOut();
      setIsAuthenticated(false); // Update the state to reflect the logout
    } else {
      // If not authenticated, open the modal to log in
      setIsModalOpen(true);
    }
  };

  const handleRegionSubmit = (url) => {
    setRegionUrl(url); // Set the selected region URL
    redirectToContentstackOAuth(url); // Redirect to Contentstack OAuth
    setIsModalOpen(false); // Close the modal after selection
  };

  // console.log("ContentTypes in RightSideBar.js file: ",contentTypes)
  // Check if contentTypes is null, undefined, or an empty array
  if (!contentTypes || contentTypes.length === 0) {
    return (
      <div className="right-sidebar">
        <h2>Content Types for ContentStack</h2>
      </div>
    );
  }
  return (
    <div className="right-sidebar">

       {/* Login/Logout Button in the top right corner */}
      <button
        onClick={handleLoginClick}
        className="login-button-top-right"
      >
        {isAuthenticated ? 'Logout' : 'Login'} {/* Display appropriate label */}
      </button>


      <h2>Content Types</h2>
      <div className="content-types-list">
        {contentTypes.map((contentType, index) => (
          <ContentTypeCard 
            key={index} 
            contentType={contentType.content_type} 
          />
        ))}
      </div>

      {/* Modal for region selection */}
      {isModalOpen && (
        <RegionModal onClose={() => setIsModalOpen(false)} onSubmit={handleRegionSubmit} />
      )}
    </div>
  );  
};

export default RightSidebar;