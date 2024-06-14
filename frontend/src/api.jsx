// api.jsx
/* eslint-disable no-useless-catch */
import axios from 'axios';

// const baseURL = ;
// Create an instance of the Axios HTTP client with a base URL and common headers
export const api = axios.create({
  // baseURL: 'http://localhost:8080', // The base URL for API requests
  baseURL: 'http://localhost:4000', // The base URL for API requests
  // withCredentials:true,
  headers: {
    'Content-Type': 'application/json', // Common content type header for JSON data
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control -Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
}); 

// Function to clear all cookies
const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    // Corrected the removal of the cookie by setting expiration to the past
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None;`;
  }
};

// Set up interceptor to handle 401 and 403 responses
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { status } = error.response;

//     if (status === 401 || status === 403) {
//       // Clear all cookies
//     clearAllCookies();

//       // Navigate to the registration page
//       window.location.href = '/';
//     }

//     return Promise.reject(error);
//   }
// );
/**
 * Function to set the authorization header.
 * 
 * @param {string} token - The user's access token.
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // console.log(token)
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
/**
 * Function to sign up a user.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} name - The user's name.
 * @returns {Promise} - A Promise that resolves to the response data if successful.
 * @throws {Error} - An error if the signup request fails.
 */
// api.js

export const signup = async ({ email, password, name, role, bio, skills, portfolio, projects, bids }) => {
  try {
    const response = await api.post('/user-api/auth/signup', {
      email,
      password,
      name,
      role,
      profile: {
        bio,
        skills,
        portfolio,
      },
      projects,
      bids,
    });
    console.log(response.data); // Log the response data (you can remove this line if not needed)
    return response.data; // Return the response data if the signup is successful.
  } catch (error) {
    throw error; // Throw an error if the signup request fails.
  }
};



/**
 * Function to log in a user.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise} - A Promise that resolves to the response data if successful.
 * @throws {Error} - An error if the login request fails.
 */
export const loginuser = async (name, password) => {
  try {
    const response = await api.post('/user-api/auth/login', { name, password });
    return response.data; // Return the response data if the login is successful.
  } catch (error) {
    throw error; // Throw an error if the login request fails.
  }
};


/**
 * Function to change the user's password.
 *
 * @param {string} oldPassword - The user's current password.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise} - A Promise that resolves to the response data if successful.
 * @throws {Error} - An error if the change password request fails.
 */
export const changePassword = async (currentPassword, newPassword, accessToken) => {
  try {
    const response = await api.post('/auth/change-password', { currentPassword, newPassword }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // Return the response data if the password change is successful.
  } catch (error) {
    throw error; // Throw an error if the password change request fails.
  }
};

export const logout = async (accessToken) => {
  try {
    const response = await api.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // You can return a response if needed.
  } catch (error) {
    throw error; // Throw an error if the logout request fails.
  }
};


// ... existing imports and functions ...

// Function to fetch all jobs
export const getJobs = async () => {
  try {
    const response = await api.get('/job/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getspecificJobs = async (userId) => {
  try {
    const response = await api.get(`/job/user/${userId}`); // Assuming the backend endpoint is /job/user/:userId
 
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to save a new job
export const saveJob = async (jobData, token) => {
  try {
      const response = await api.post('/job/new', jobData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};




// Function to update a job
export const updateJob = async (jobId, updatedData) => {
  try {
    // Correctly format the URL to include jobId as a path parameter, not a query string
    const response = await api.put(`/job/save/${jobId}`, updatedData); // Adjusted the endpoint to match typical REST API conventions
    return response.data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};


// Function to delete a job
export const deleteJob = async (jobId) => {
  console.log(jobId)
  try {
    const response = await api.delete(`/job/delete/${jobId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getJobById = async (jobId) => {
  console.log("Job ID:", jobId);  // This will show what jobId is being passed
  try {
    const response = await api.get(`/job/view/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

export const getBidsByJobId = async (jobId) => {
  try {
    const response = await api.get(`/bids/job/${jobId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching bids:', error);
    throw error;
  }
};

// export const postBid = async (bidData) => {
//   try {
//     const response = await api.post('/job/save', bidData);
//     return response.data;
//   } catch (error) {
//     console.error('Error posting bid:', error);
//     throw error;
//   }
// };

export const acceptBid = async (bidId) => {
  try {
    const response = await api.get(`/bids/accept/${bidId}`);
    return response.data;
  } catch (error) {
    console.error('Error accepting bid:', error);
    throw error;
  }
};
export const getJobByIdWithBids = async (jobId) => {
  try {
      const response = await api.get(`/job/view/${jobId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching job with bids:', error);
      throw error;
  }
};
export const closeBid = async (bidId) => {
  try {
    const response = await api.get(`/bids/close/${bidId}`);
    return response.data;
  } catch (error) {
    console.error('Error accepting bid:', error);
    throw error;
  }
};


// Post feedback
export const postFeedback = async (feedbackData) => {
  try {
    console.log(feedbackData)
    const response = await api.post('/feedback/save', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error posting feedback:', error);
    throw error;
  }
};

// Get feedback by bid ID
export const getFeedbackById = async (bidId) => {
  try {
    const response = await api.get(`/feedback/view/${bidId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw error;
  }
};


export const getContracts = async () => {
  try {
    const response = await api.get('/bids/myjobs');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching contracts:', error);
    throw error;
  }
};

// In your API utility file

export const viewProfile = async () => {
  try {
    const response = await api.get('/user-api/profile/');
    return response.data;
  } catch (error) {
    console.error('Error viewing profile:', error);
    throw error;
  }
};

export const saveProfile = async (profileData) => {
  try {
    const response = await api.post('/profile/save', profileData);
    return response.data;
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
};

export const placeBid = async (bidData) => {
  console.log('Placing bid with data:', bidData);  // Log data being sent
  try {
    const response = await api.post('/bids/save', bidData);
    return response.data;
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error;
  }
};

export const getChatMessages = async (jobId) => {
  try {
    // Adjust the URL and data format as per your backend API's requirements
    const response = await api.get(`/message/job_room/${jobId}`);
    console.log(response.data)
    return response.data; // Return the response data if the bid submission is successful.
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error; // Throw an error if the bid submission request fails.
  }
};
export const sendChatMessage = async (messageData) => {
  try {
    // Adjust the URL and data format as per your backend API's requirements
    const response = await api.post(`/message/job_room/send`, messageData);
    return response.data; // Return the response data if the bid submission is successful.
  } catch (error) {
    console.error('Error placing bid:', error);
    throw error; // Throw an error if the bid submission request fails.
  }
};
export const getContractsByUser = async (userId) => {
  console.log(userId)
  try {
    // Check if userId is present
    if (!userId) {
      throw new Error('No user ID provided');
    }
    const response = await api.get(`/contracts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch contracts', error);
    throw error;
  }
};

// In your API management file (e.g., api.js)
export const getContractById = async (contractId) => {
  try {
    const response = await api.get(`/contracts/${contractId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contract by ID', error);
    throw error;
  }
};
// api.js

export const getMessagesByContract = async (contractId) => {
  try {
      const response = await api.get(`/messages/${contractId}`);
      return response.data;
  } catch (error) {
      throw error;
  }
};

export const postMessage = async (messageData) => {
  try {
      const response = await api.post('/messages/', messageData);
      return response.data;
  } catch (error) {
      throw error;
  }
};



// Note: This code defines functions for making API requests using Axios. Each function sends a request to a specific endpoint and returns the response data if the request is successful or throws an error if it fails.
