import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignupPage from "./SignupPage";
import PrivateRoute from "../routes/PrivateRoute";
import Homepage from "./Homepage";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/signin"
          element={
            <PrivateRoute>
              <SignInPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute>
              <SignupPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
