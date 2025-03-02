import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container py-5">
      {/* About Section */}
      <h1 className="text-center text-primary mb-4">About Us 🍽️</h1>
      <p className="text-center text-muted">
        🎉 Welcome to <strong>[Recipe Sharing Platform]</strong>, the ultimate hub for food lovers and home chefs! Whether you're a seasoned cook or just starting your culinary journey, our platform is here to inspire, connect, and bring out the chef in you.
      </p>

      {/* Mission Section */}
      <div className="card bg-light shadow-sm p-4 my-4">
        <h2 className="text-success text-center">🌍 Our Mission</h2>
        <p className="text-center text-muted">
          At <strong>[Recipe Sharing Platform]</strong>, we believe that food is more than just sustenance—it’s a universal language that brings people together. Our goal is to create a thriving community where users can explore, learn, and share their favorite recipes while celebrating diverse culinary traditions.
        </p>
      </div>

      {/* Features Section */}
      <h2 className="text-center text-info">🚀 What We Offer</h2>
      <div className="row mt-3">
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">✅ <strong>Endless Culinary Inspiration:</strong> Discover a vast collection of user-submitted recipes.</li>
            <li className="list-group-item">📸 <strong>Create & Share:</strong> Upload your own recipes with images & instructions.</li>
            <li className="list-group-item">💬 <strong>Engage & Connect:</strong> Rate, comment, and share tips with food lovers.</li>
            <li className="list-group-item">🔍 <strong>Smart Search:</strong> Find recipes by cuisine, dietary preferences, or ingredients.</li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">🎥 <strong>Video Tutorials:</strong> Watch expert cooking videos.</li>
            <li className="list-group-item">⭐ <strong>Recipe Ratings:</strong> Get feedback from fellow chefs.</li>
            <li className="list-group-item">🔥 <strong>Weekly Contests:</strong> Participate in fun cooking challenges.</li>
            <li className="list-group-item">💾 <strong>Save Recipes:</strong> Bookmark and organize your favorite dishes.</li>
          </ul>
        </div>
      </div>

      {/* Join Section */}
      <div className="card bg-success text-white text-center p-4 my-4 shadow-lg">
        <h2>👩‍🍳 Join Our Community</h2>
        <p>
          Whether you’re looking to master new techniques, experiment with bold flavors, or simply share your love for food, **[Recipe Sharing Platform]** is the place for you!
        </p>
        <button className="btn btn-warning btn-lg mt-3">Get Started 🚀</button>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <h5>📞 Get in Touch</h5>
        <p>Email: <a href="mailto:support@[yourplatform].com" className="text-warning">support@Recipe Sharing Platform.com</a></p>
        <p>📍 Location: [Pune, India]</p>
        <div className="d-flex justify-content-center">
          <a href="https://www.instagram.com/p_r_a_t_h_a_m_e_s_h_2312?igsh=MWk3MDEyOWFnb3d6NA== " className="text-white mx-3">📷 Instagram</a>
          <a href="https://www.facebook.com/share/18hJWvG12C/" className="text-white mx-3">📘 Facebook</a>
          <a href="https://www.twitter.com/" className="text-white mx-3">🐦 Twitter</a>
        </div>
        <p className="mt-3">© [Recipe Sharing Platform] 2025. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
