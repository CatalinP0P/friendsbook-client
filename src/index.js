import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Modal from "./components/Modal";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { DbProvider } from "./context/dbContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DbProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DbProvider>
  </BrowserRouter>
);
