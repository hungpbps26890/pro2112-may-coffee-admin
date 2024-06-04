import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideBar from "./components/SideBar/SideBar";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <div className="templatemo-flex-row">
        <SideBar />

        {/* Main content */}
        <div className="templatemo-content col-1 light-gray-bg">
          {/* Top Navigation Bar */}
          <NavBar />

          {/* Content */}
          <div className="templatemo-content-container"></div>

          <Routes></Routes>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Tostify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  );
};

export default App;
