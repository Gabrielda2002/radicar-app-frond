import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
