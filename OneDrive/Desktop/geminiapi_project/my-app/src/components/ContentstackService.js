import axios from 'axios';

// Fetch organizations
export const fetchOrganizations = async (token) => {
  try {
    // const token = getAccessToken(); // Retrieve token from local storage
    const response = await axios.get(`https://eu-api.contentstack.com/v3/organizations`, {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    });
    return response.data.organizations; // Return the list of organizations
  } catch (error) {
    console.error('Error fetching organizations:', error);
    throw error;
  }
};

// Fetch stacks for a specific organization
export const fetchStacks = async (organizationId,token) => {
  try {
    // const token = getAccessToken(); // Retrieve token from local storage
    const response = await axios.get(`https://eu-api.contentstack.com/v3/stacks`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'organization_uid': organizationId
      },
    });
    return response.data.stacks; // Return the list of stacks
  } catch (error) {
    console.error('Error fetching stacks:', error);
    throw error;
  }
};