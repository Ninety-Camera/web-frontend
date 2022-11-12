import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ForgotPasswordPage from "../pages/ForgotPassword";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgotPW" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
