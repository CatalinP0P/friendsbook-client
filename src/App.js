import React, { useCallback, useEffect, useState } from "react";
import Layout from "./Layout";
import firebase from "./lib/firebase";
import SigninPage from "./pages/SigninPage";
import { useAuth } from "./context/authContext";
import LandingPage from "./pages/LandingPage";
import { useDB } from "./context/dbContext";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const authContext = useAuth();
  const db = useDB();

  return authContext.loaded ? (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          authContext.currentUser ? (
            <Layout>
              {/* <button
                onClick={async () => {
                  const token = await authContext.currentUser.getIdToken();
                  console.log(token);
                }}
              >
                Show token
              </button> */}
              <LandingPage />
            </Layout>
          ) : (
            <SigninPage />
          )
        }
      />

      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  ) : null;
}

export default App;
