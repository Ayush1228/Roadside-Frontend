// src/App.jsx
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import GarageDashboard from "./components/garage/GrageDashboard";
import GarageLogin from "./components/garage/GarageLogin";
import GarageRegister from "./components/garage/GarageRegister";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Garage routes */}
      <Route path="/garage-login" element={<GarageLogin />} />
      <Route path="/garage-register" element={<GarageRegister />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/garage-dashboard" element={<GarageDashboard />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
