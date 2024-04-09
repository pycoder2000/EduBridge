import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login/Login"; // Assume you have this component
import Signup from './components/signup/Signup';
import StudentLandingPage from "./components/Landing/StudentLanding/StudentLandingPage"
import './App.css'; // Your CSS file
import AdminPage from "./components/Landing/Admin/AdminPage";
import InstructorLandingPage from "./components/Landing/InstructorLanding/InstructorLandingPage";
import UploadContentPage from './components/Landing/InstructorLanding/UploadContentPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage/student" element={<StudentLandingPage />} />
          <Route path="/homepage/instructor" element={<InstructorLandingPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin"element={<AdminPage/>} />
          <Route path="/upload-content"element={<UploadContentPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
