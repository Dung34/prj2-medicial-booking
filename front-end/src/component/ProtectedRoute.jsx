import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    // Check if user is authenticated
    if (!isAuthenticated()) {
        // Redirect to login page with return url
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user has required role (if specified)
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page or home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 