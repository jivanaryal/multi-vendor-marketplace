import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                // Call a token validation endpoint on your backend
                const response = await fetch('http://localhost:5000/api/validate-token', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsAuthenticated(true); // Token is valid
                } else {
                    setIsAuthenticated(false); // Token is invalid/expired
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        };

        checkTokenValidity();
    }, []);

    return { isAuthenticated };
};
