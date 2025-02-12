import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import Navbar from "./Navbar";
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect if no user is logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear stored user data
    navigate("/logout", { replace: true }); // Prevent back navigation
};


  return (
    <><Navbar/>
    <div className="profile-container">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3>Dashboard</h3>
        <ul>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/buyer">Buyer</a></li>
          <li><a href="/seller">Seller</a></li>
          <li><a href="/agent">Agent</a></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Sign Out</button>
      </div>

      {/* Main Profile Content */}
      <div className="profile-content">
        {user ? (
          <>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.mobile}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div></>
  );
};

export default Profile;
