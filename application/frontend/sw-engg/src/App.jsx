import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from './components/signup/Signup';
import StudentLandingPage from "./components/Landing/StudentLanding/StudentLandingPage";
import InstructorLandingPage from "./components/Landing/InstructorLanding/InstructorLandingPage";
import UploadContentPage from './components/Landing/InstructorLanding/UploadContentPage';
import AdminPage from "./components/Landing/Admin/AdminPage";
import DiscussionForum from './components/DiscussionForum/DiscussionForum';
import DiscussionList from './components/DiscussionForum/DiscussionList';
import DiscussionDetail from './components/DiscussionForum/DiscussionDetail';
import ProtectedRoute from "./components/routing/ProtectedRoute";
import StudentRoute from "./components/routing/StudentRoute";
import InstructorRoute from "./components/routing/InstructorRoute";
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import AdministratorRoute from "./components/routing/AdministratorRoute";

const Layout = ({children}) => {
    const location = useLocation();
    const hideNavbarOnRoutes = ["/login", "/signup"];
    const showNavbar = !hideNavbarOnRoutes.includes(location.pathname);

    return (<>
            {showNavbar && <Navbar userName="John Doe"/>} {/* Placeholder for the user's name */}
            <div>{children}</div>
        </>);
};

function App() {
    return (<Router>


            <div className="app">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    {/* Protected and role-based routes for Student */}
                    <Route path="/student" element={<ProtectedRoute>
                        <StudentRoute>
                            <StudentLandingPage/>
                        </StudentRoute>
                    </ProtectedRoute>}/>
                    {/* Protected and role-based routes for Instructor */}
                    <Route path="/instructor" element={<ProtectedRoute>
                        <InstructorRoute>
                            <InstructorLandingPage/>
                        </InstructorRoute>
                    </ProtectedRoute>}/>
                    <Route path="/instructor/upload-content" element={<ProtectedRoute>
                        <InstructorRoute>
                            <UploadContentPage/>
                        </InstructorRoute>
                    </ProtectedRoute>}/>
                    {/* Admin route */}
                    <Route path="/admin" element={<ProtectedRoute>
                        <AdministratorRoute>
                            <AdminPage/>
                        </AdministratorRoute>
                    </ProtectedRoute>}/>
                    {/* Discussion Forum routes */}
                    <Route path="/forum" element={<DiscussionForum/>}/>
                    <Route path="/discussions" element={<DiscussionList/>}/>
                    <Route path="/discussion/:id" element={<DiscussionDetail/>}/>
                    {/* Redirect / to Login for now */}
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </div>
        </Router>);
}

export default App;

