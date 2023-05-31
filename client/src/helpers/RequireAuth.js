import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
    const location = useLocation();
    const role = localStorage.getItem('user_role');
    const user_id = localStorage.getItem('user_id');
    console.log(role);
    return (
        role === allowedRole
            ? <Outlet />
            : user_id
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;