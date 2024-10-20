import React from 'react';
import './ContentTypeCard.css';

const ContentTypeCard = ({ contentType }) => {
  const handleCreateClick = () => {
    console.log(`Creating new content for ${contentType.title}`);
    // Logic for creating new content goes here
  };

  return (
    <div className="content-type-card">
      <h3>{contentType.title}</h3>
      <button onClick={handleCreateClick} className="create-button">
        Create
      </button>
    </div>
  );
};

export default ContentTypeCard;
