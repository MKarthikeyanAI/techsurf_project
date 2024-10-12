import React, { useRef } from 'react';

const ButtonComponent = ({ text, color, size, onClick }) => {
  const buttonRef = useRef(null);

  return (
    <button
      ref={buttonRef}
      style={{ backgroundColor: color, fontSize: size }}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;