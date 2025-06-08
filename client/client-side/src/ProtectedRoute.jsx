import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ( {children}) =>{//children is predefined
     const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

    return isLoggedIn? children : <Navigate to="/"></Navigate>
}

export default ProtectedRoute