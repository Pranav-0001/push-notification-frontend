import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("currentUser");
  const navigate = useNavigate();

  if (!token) {
    Navigate({to:"/signin"})
    return null;
  } else {
    return children;
  }
};

export default PrivateRoute;
