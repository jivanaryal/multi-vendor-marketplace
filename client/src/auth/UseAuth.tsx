import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // New loading state

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false); // Set loading to false once done
        return;
      }

      try {
        // Call a token validation endpoint on your backend
        const response = await fetch('http://localhost:5000/api/mv/users/validate-token', {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json(); // Parse the response JSON
          
          if (data.valid) {
            setIsAuthenticated(true); // Token is valid
          } else {
            setIsAuthenticated(false); // Token is invalid
            localStorage.removeItem('token');
          }
        } else {
          setIsAuthenticated(false); // Token is invalid
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };

    checkTokenValidity();
  }, []);

  return { isAuthenticated, loading };
};
