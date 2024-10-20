// src/components/Card.js
import React from 'react';

const Card = ({ contentType, onCreate }) => {
  const { title } = contentType; // Access title and uid from content_type

  return (
    <div className="card">
      <h3>{title}</h3>
      <button onClick={() => onCreate(contentType)}>Create</button>
    </div>
  );
};

export default Card;
