import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Story from "../pages/Story/Story";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/story/:id"
          element={<Story />}
        />

      </Routes>

    </BrowserRouter>
  );
}