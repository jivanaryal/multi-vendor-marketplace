// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/UseAuth'; // Adjust the path if needed

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // While loading, you can show a loading spinner or some placeholder content
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component if needed
  }

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected component(s)
  return <Outlet />;
};

export default ProtectedRoute;
