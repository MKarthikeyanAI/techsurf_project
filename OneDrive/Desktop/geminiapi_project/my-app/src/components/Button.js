// import React from 'react';

// const Button = ({ label, onClick, style }) => {
//   return (
//     <button onClick={onClick} style={style}>
//       {label}
//     </button>
//   );
// };

// export default Button;

//2nd Try:

// import React from 'react';

// const Button = ({ children, onClick, className, ...props }) => {
//   return (
//     <button className={`button ${className}`} onClick={onClick} {...props}>
//       {children}
//     </button>
//   );
// };

// export default Button;


import React from 'react';

const buttonStyles = {
  primary: {
    backgroundColor: 'blue',
    color: 'white',
  },
  secondary: {
    backgroundColor: 'gray',
    color: 'white', 
  },
  danger: {
    backgroundColor: 'red',
    color: 'white',
  },
};

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button
      style={{ ...buttonStyles[variant], cursor: disabled ? 'not-allowed' : 'pointer' }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
