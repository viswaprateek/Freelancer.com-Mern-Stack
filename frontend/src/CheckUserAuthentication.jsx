// checkUserAuthentication.jsx
function checkUserAuthentication() {
    // Check if an authentication token exists in cookies
    const accessToken = getCookie('accessToken'); // Implement getCookie function
  
    // Return true if the token exists; otherwise, the user is not authenticated
    return Boolean(accessToken);
  }
  
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
  