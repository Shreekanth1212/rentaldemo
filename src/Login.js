import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import Login_Back from "./assets/Signup_Back.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find(
        (user) =>
          (user.email === formData.emailOrPhone ||
            user.mobile === formData.emailOrPhone) &&
          user.password === formData.password
      );
      if (user) {
        if (user.role === "Buyer") {
          navigate("/buyer");
        } else if (user.role === "Seller") {
          navigate("/seller");
        } else if (user.role === "Agent") {
          navigate("/agent");
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
    navigate("/signup");
  };

  return (
    <div className="login-container">
    <div className="login-image-container">
      <img src={Login_Back} alt="Login Background" className="login-image" />
    </div>
  
    <div className="login-form-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Mobile No"
          value={formData.emailOrPhone}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />
  
        {loginFailed && <p className="login-error-message">Invalid email/phone or password. Please try again.</p>}
  
        <button type="submit" className="login-submit-button">
          Login
        </button>
  
        <div className="login-redirect-container">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="login-signup-redirect-button"
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
