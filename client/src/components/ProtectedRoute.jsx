import React from "react";
import {Navigate, useLocation} from "react-router-dom";

function ProtectedRoute({children}) {
    const location = useLocation();
    
    let authorization;
    try {
        authorization = location.state.loginStatus;
    } catch (err) {
        authorization = false;
    }
    
    if (!authorization) {
        return <Navigate to="/" state={{path: location.pathname}} />;
    }
    return children;
}

export default ProtectedRoute;