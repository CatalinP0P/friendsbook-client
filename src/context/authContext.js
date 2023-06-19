import firebase from "../lib/firebase";
import React, { createContext, useContext, useState } from "react";
import { useDB } from "./dbContext";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState();
  const [loaded, setLoaded] = useState(false);

  const db = useDB();

  firebase.auth().onAuthStateChanged(async (user) => {
    setUser(user);
    setLoaded(true)
    if (!user) return;
    const token = await user.getIdToken();
    db.setIdToken(token);
  });

  return (
    <AuthContext.Provider value={{ currentUser: currentUser, loaded: loaded }}>
      {children}
    </AuthContext.Provider>
  );
};
