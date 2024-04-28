import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

  // Redirect to home page after 5 seconds (adjust the delay as needed)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        navigate('/');
        }, 1000);

        // Clear the timeout to avoid redirection if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [navigate]);
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '4rem', color: 'Blue' }}>Oops, something went wrong!</h1>
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="Funny cat with a computer"
        style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '20px' }}
      />
      <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
        Error 404 : Page Not Found
      </p>
      <p style={{ fontSize: '1rem', marginTop: '20px' }}>Don't worry, our team of highly trained cats is on it!</p>
      <p>Redirecting to Home page...</p>
    </div>
  );
};

export default ErrorPage;