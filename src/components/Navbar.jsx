import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../assets/Brand-logo.png";
import ProfileIcon from "../assets/profile-icon.png";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(() => localStorage.getItem("profileImg") || ProfileIcon);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Save profile image to localStorage when updated
  useEffect(() => {
    localStorage.setItem("profileImg", profileImg);
  }, [profileImg]);

  // Handle profile image upload
  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target.result);
        localStorage.setItem("profileImg", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout function (Removes JWT & redirects)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark py-2">
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={Brand} alt="Brand Logo" className="img-fluid" style={{ height: "50px" }} />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar */}
        <div className={`collapse navbar-collapse ${isNavCollapsed ? "" : "show"}`}>
          <ul className="navbar-nav me-auto text-center">
            <li className="nav-item">
              <Link to="/home" className="nav-link" onClick={() => setIsNavCollapsed(true)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setIsNavCollapsed(true)}>About</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setIsNavCollapsed(true)}>Contact</Link>
            </li> */}
          </ul>

          {/* Center Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link to="/recipes" className="btn btn-primary" onClick={() => setIsNavCollapsed(true)}>All Recipes</Link>
            <Link to="/saved" className="btn btn-primary" onClick={() => setIsNavCollapsed(true)}>Saved Recipes ❤️</Link>
          </div>

          {/* Right Side - Auth & Profile */}
          <div className="d-flex align-items-center gap-3 ms-lg-auto mt-2 mt-lg-0">
            {isAuthenticated ? (
              <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-primary" to="/login" onClick={() => setIsNavCollapsed(true)}>Login</Link>
                <Link className="btn btn-secondary" to="/register" onClick={() => setIsNavCollapsed(true)}>Register</Link>
              </>
            )}

            {/* Profile Picture */}
            <div className="position-relative">
              <label htmlFor="profile-upload" className="cursor-pointer">
                <img 
                  src={profileImg} 
                  alt="Profile" 
                  className="rounded-circle border border-light shadow-sm"
                  style={{ height: "40px", width: "40px", objectFit: "cover", cursor: "pointer" }}
                />
              </label>
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleProfileChange} 
                className="d-none"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
