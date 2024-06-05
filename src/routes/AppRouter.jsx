import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
//import Profile from "../pages/Profile/profile";
import Signup from "../pages/Signup/signup";
import VideoChat from "../pages/VideoChat/videochat";
import Analysis from "../pages/Analysis/analysis";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/videochat" element={<VideoChat />} />
                <Route path="/analysis" element={<Analysis />} />
            </Routes>
        </BrowserRouter>
    );
}
