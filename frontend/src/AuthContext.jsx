// AuthContext.jsx
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken } from './api'; // Import the setAuthToken function
import { useCookies } from 'react-cookie';

// Create a context to manage authentication state
const AuthContext = createContext();

/**
 * AuthProvider component responsible for managing the authentication state.
 * 
 * @param {Object} children - React components to be wrapped by AuthProvider.
 */
export function AuthProvider({ children }) {
  // State variables to manage authentication status, access token, user role, and user ID
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['role', 'accessToken', 'userId']);
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  
  useEffect(() => {
    // Check if the access token is valid when the component is mounted
    const savedAccessToken = cookies.accessToken;
    const role1 = cookies.role;
    const savedUserId = cookies.userId;
    
    if (savedAccessToken) {
      setAuthenticated(true);
      setAccessToken(savedAccessToken);
      setAuthToken(savedAccessToken); // Set the authorization header
      setUserRole(role1);
      setUserId(savedUserId); // Set the userId retrieved from cookies
    }
  }, [cookies]);
  

  /**
   * Function to get a specific cookie value by name.
   * 
   * @param {string} name - The name of the cookie to retrieve.
   * @returns {string} - The value of the cookie if found, or null.
   */
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  /**
   * Function to log in a user and set their access token.
   * 
   * @param {string} token - The user's access token.
   * @param {string} role - The user's role.
   * @param {string} id - The user's ID.
   */
  const login = (token, role, id) => {
    console.log("Setting cookies and context values:", token, role, id);
  
    setCookie('accessToken', token, {path: '/', secure: true, sameSite: 'None' });
    setCookie('role', role, {path: '/', secure: true, sameSite: 'None' });
    setCookie('userId', id, {path: '/', secure: true, sameSite: 'None' });
    setAccessToken(token);
    setAuthenticated(true);
    setUserRole(role);
    setUserId(id);  // Log to ensure this is being set
    console.log("After setting in context:", userId);
    setAuthToken(token); // Update the authorization header
  }
  
  

  /**
   * Function to log out a user by clearing their access token and authentication status.
   */
  const logout = () => {
    removeCookie('accessToken', { path: '/' });
    removeCookie('role', { path: '/' });
    removeCookie('userId', { path: '/' });
    setAccessToken(null);
    setAuthenticated(false);
    setUserRole("");
    setUserId("");
    setAuthToken(null); // Clear the authorization header
  
    // Additional step: Force a re-render or handle navigation
    window.location.href = '/'; // Redirect to login or home page
  }
  

  // Provide the authentication state and functions to child components using the context.
  return (
    <AuthContext.Provider value={{ authenticated, accessToken, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access the authentication context values.
 * 
 * @returns {Object} - An object with authentication state and functions.
 */
export function useAuth() {
  return useContext(AuthContext);
}
