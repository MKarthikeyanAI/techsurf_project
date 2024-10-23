import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM for portals
import { redirectToContentstackOAuth } from '../auth/authHelpers'; // Adjust the import path accordingly
import './RegionModal.css'; // Import CSS for styling

const RegionModal = ({ onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const regions = [
    { label: 'North America', value: 'https://app.contentstack.com' },
    { label: 'Europe', value: 'https://eu-app.contentstack.com' },
    { label: 'Azure NA', value: 'https://azure-na-app.contentstack.com' },
    { label: 'Azure EU', value: 'https://azure-eu-app.contentstack.com' },
    { label: 'GCP NA', value: 'https://gcp-na-app.contentstack.com' },
  ];

  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedRegion) {
      // Call the redirect function with the selected region
      console.log("selected region url ",selectedRegion);
      redirectToContentstackOAuth(selectedRegion); 
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select Your Region</h2>
        <form onSubmit={handleSubmit}>
          <select id="region" value={selectedRegion} onChange={handleChange} required>
            <option value="">-- Select a Region --</option>
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="connect-button">Connect</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RegionModal;