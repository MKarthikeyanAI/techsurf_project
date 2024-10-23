import React from 'react';
import './ComponentCard.css'; // Import the CSS file

const ComponentCard = ({ component }) => {

    return (
        <div className="component-card">
            <h3>{component.name} Component</h3>
            <div className="preview" dangerouslySetInnerHTML={{ __html: component.react_code }} />
        </div>
    );
};

export default ComponentCard;
