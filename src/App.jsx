import "./App.css";
import Login from "./layout/Login";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./layout/Register";
import Home from "./pages/home/Home";
import { Button } from "./components/ui/button";
import {
  AuthenticateWithRedirectCallback,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import FavoriteSongsPage from "./pages/album/FavoriteSongsPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/albums/favorites" element={<FavoriteSongsPage />} />
        </Route>

        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
          }
        ></Route>
        <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
