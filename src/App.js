import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import firebase from "./lib/firebase";
import SigninPage from "./pages/SigninPage";
import { useAuth } from "./context/authContext";
import LandingPage from "./pages/LandingPage";
import { useDB } from "./context/dbContext";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  const authContext = useAuth();
  const db = useDB();

  return authContext.loaded ? (
    <Routes>
      <Route
        path="/"
        element={
          authContext.currentUser ? (
            <Layout>
              <LandingPage />
            </Layout>
          ) : (
            <SigninPage />
          )
        }
      />

      <Route path="/profile/:id" element={<Profile/>}/>
    </Routes>
  ) : null;
}

export default App;
