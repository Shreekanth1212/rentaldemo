import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook for React Router v6
import './css/Login.css';
import Login_Back from  "./assets/Signup_Back.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();  // For React Router v6

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users"); // Fetch all users from db.json
      const user = response.data.find((user) =>
        (user.email === formData.emailOrPhone || user.mobile === formData.emailOrPhone) &&
        user.password === formData.password
      );
      if (user) {
        // Successful login, redirect based on user role
        if (user.role === "Buyer") {
          navigate("/buyer"); // Redirect to the Buyer page
        } else if (user.role === "Seller") {
          navigate("/seller"); // Redirect to the Seller page
        } else if (user.role === "Agent") {
          navigate("/agent"); // Redirect to the Agent page
        }
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginFailed(true);
    }
  };

  const handleRedirectToSignup = () => {
    navigate("/signup"); // Redirect to Signup page
  };

  return (
    <div className="container">
      {/* Left Side - Image */}
      <div className="image-container">
        <img src={Login_Back} alt="Login Background" className="image" />
      </div>

      {/* Right Side - Form */}
      <div className="form-container">
        <h2 className="title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Mobile No"
            value={formData.emailOrPhone}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />

          {loginFailed && <p className="error-message">Invalid email/phone or password. Please try again.</p>}

          <button type="submit" className="submit-button">
            Login
          </button>

          <div className="redirect-container">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="signup-redirect-button"
              onClick={handleRedirectToSignup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


