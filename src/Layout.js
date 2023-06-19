import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col text-white text-xl font-medium">
      <Header />
      <div className="flex-1 text-black bg-gray-100 py-8">{children}</div>
      <Footer />
    </div>
  );
}
