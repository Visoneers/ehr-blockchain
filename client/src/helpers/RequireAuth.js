import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    
    return (
        auth?.roles === allowedRole
            ? <Outlet />
            : auth?.name
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;