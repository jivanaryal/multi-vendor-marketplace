// src/App.tsx
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Index from './pages/homepage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Profile from './pages/cart/ProductCart'; 
import ProtectedRoute from './hoc/ProtectedRoute';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Index />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />

    {/* Protect routes under the "dashboard" path */}
    <Route path="dashboard" element={<ProtectedRoute />}>
      <Route path="profile" element={<Profile />} />
    </Route>
  </Route>
));

const App:React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
