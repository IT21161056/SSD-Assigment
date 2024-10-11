import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  //navigating user back to login is not authenticated
  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
