import "./App.css";
import Login from "./layout/Login";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./layout/Register";
import Home from "./layout/Home";
import { Button } from "./components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/home" element={<Home />} />
    //   </Routes>
    // </Router>
    <header>
      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}

export default App;
