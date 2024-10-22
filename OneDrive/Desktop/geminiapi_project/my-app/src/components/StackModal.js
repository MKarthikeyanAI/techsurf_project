import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // For portal rendering
import './StackModal.css'; // Import CSS for modal styling
import { fetchStacks } from './ContentstackService'; // Import the fetchStacks function
import { getAccessToken } from '../auth/authHelpers';

const StackModal = ({ organizationId, onClose, onSubmit }) => {
  const [selectedStack, setSelectedStack] = useState('');
  const [stacks, setStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStacks = async () => {
      try {
        const token = getAccessToken();
        const stacks = await fetchStacks(organizationId,token); // Fetch stacks for the selected organization
        setStacks(stacks);
      } catch (error) {
        console.error('Error fetching stacks:', error);
        setError('Failed to load stacks. Please try again.');
      } finally {
        setLoading(false); // Stop loading after fetching stacks
      }
    };

    loadStacks();
  }, [organizationId]);

  const handleChange = (event) => {
    setSelectedStack(event.target.value); // Update the selected stack
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedStack) {
      onSubmit(selectedStack); // Submit the selected stack to the parent component
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select a Stack</h2>
        {loading ? (
          <p>Loading stacks...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <select id="stack" value={selectedStack} onChange={handleChange} required>
              <option value="">-- Select a Stack --</option>
              {stacks.map((stack) => (
                <option key={stack.api_key} value={stack.api_key}>
                  {stack.name}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="connect-button">
                Connect
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body 
  );
};

export default StackModal;