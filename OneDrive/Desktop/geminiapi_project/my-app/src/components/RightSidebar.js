import React from 'react';
import './RightSidebar.css';
import ContentTypeCard from './ContentTypeCard';

const RightSidebar = ({ contentTypes }) => {
  return (
    <div className="right-sidebar">
      <h2>Content Types</h2>
      <div className="content-types-list">
        {contentTypes.map((contentType, index) => (
          <ContentTypeCard 
            key={index} 
            contentType={contentType.content_type} 
          />
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
