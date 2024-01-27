import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("currentUser");
  const location = useLocation();

  // Check if the current route is either "signin" or "signup"
  const isSignInOrSignUp =
    location.pathname.includes("/signin") ||
    location.pathname.includes("/signup");

  if (token && isSignInOrSignUp) {
    Navigate({ to: "/" });
    return null;
  } else if (!token && isSignInOrSignUp) {
    return children;
  }else if(!token){
    Navigate({ to: "/signin" });
  }
   else {
    return children;
  }
};

export default PrivateRoute;
