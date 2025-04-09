import "./App.css";
import Login from "./layout/Login";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./layout/Register";
import Home from "./pages/Home";
import { Button } from "./components/ui/button";
import {
  AuthenticateWithRedirectCallback,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { axiosInstance } from "./lib/axios";

function App() {
  // const getData = async () => {
  //   const res = await axiosInstance.get("/users", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(res);
  // };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
          }
        ></Route>
        <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
