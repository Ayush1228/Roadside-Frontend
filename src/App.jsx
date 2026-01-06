// src/App.jsx
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import GarageLogin from "./components/garage/GarageLogin";
import GarageRegister from "./components/garage/GarageRegister";
import GarageDashboard from "./components/garage/GrageDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./components/PrivateRoute";
import CreateGarage from "./pages/CreateGarage"

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
      <Route path="api/v1/auth/password/reset" element={<UpdatePassword />} />

      {/*  Protected Route */}
      <Route
        path="/create-garage"
        element={
          <PrivateRoute>
            <CreateGarage />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;
