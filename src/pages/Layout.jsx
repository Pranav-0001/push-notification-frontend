import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignupPage from "./SignupPage";

export default function Layout() {
  return (
    <>
      <Navbar  />
      <Routes>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </>
  );
}
