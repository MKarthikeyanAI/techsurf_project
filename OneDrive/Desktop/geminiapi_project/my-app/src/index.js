import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from React 18
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import App from './App';
import OAuthCallback from './auth/OAuthCallback'; // Import the OAuth Callback component
import './index.css'; // If you have any styles
// changing

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
);