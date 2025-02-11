import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find(
        (user) =>
          (user.email === formData.emailOrPhone || user.mobile === formData.emailOrPhone) &&
          user.password === formData.password
      );

      if (user) {
        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on role
        if (user.role === "Buyer") {
          navigate("/profile");
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

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Mobile No"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {loginFailed && <p className="error-message">Invalid credentials</p>}
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
