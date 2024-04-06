import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests, if directly calling APIs
import './Login.css';
import apiService from '../../services/apiService';
import CryptoJS from "crypto-js";
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // Add OTP state
  const [requireOtp, setRequireOtp] = useState(false); // Flag to show/hide OTP input
  const [isLoggingIn, setIsLoggingIn] = useState(false); // New state to track login process


  useEffect(() => {
  setRequireOtp(false); // Reset OTP requirement on page load
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // Disable the login button
    const hashedPassword = CryptoJS.SHA256(password).toString(); // Hash the password

    try {
      let response;
      if (requireOtp) {
        // If OTP is required, modify your API service to handle this scenario
        response = await apiService.loginWithOtp(email, hashedPassword, otp);
      } else {
        response = await apiService.login(email, hashedPassword);
      }

      // Handle successful login here
      console.log('Login successful:', response.data);
      alert('Login successful!');
      navigate('/homepage');
      setIsLoggingIn(false); // Enable the login button on failure
      // Redirect or update state as needed
    } catch (error) {
      if (error.response?.data?.message === 'OTP verification required') {
        // Server requires OTP; show OTP input and prompt the user
        setRequireOtp(true);
        setIsLoggingIn(false); // Enable the login button on failure
        alert('Please enter the OTP sent to your email.');
        return; // Stop here to allow user to enter OTP
      }
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
      setIsLoggingIn(false); // Enable the login button on failure
    }
  };

  return (
    <div className='full-container-login'>

      <div className='welcomeback-container'>
        <h10>Welcome back! 👋</h10>
        <p>We're thrilled to have you back on our platform. Dive back into your learning journey with ease. Whether it's accessing your saved materials, continuing a course, or exploring new content, we're here to support your educational goals every step of the way!</p>
      </div>

    <div className="login-container">
      <h2>Login</h2>
      <div className="underline"></div>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>  
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        {requireOtp && (
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
            />
          </div>
        )}
        <button type="submit" onClick={handleSubmit} disabled={isLoggingIn}>Login</button>

        <div className="register-link">
            <p>Don't have an account? <a href="/signup">Register</a></p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
