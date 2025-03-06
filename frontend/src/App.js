import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import SavedRecipes from "./pages/SavedRecipes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("token") ? true : false;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If token exists, set to true
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/About" element={<About/>} />
       
        {/* Protected Routes */}
        <Route path="/home" element={isAuthenticated ? <Home/> : <Navigate to="/login" />} />
        <Route path="/saved" element={isAuthenticated ? <SavedRecipes /> : <Navigate to="/login" />} />
        
        {/* Default Route Handling */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
