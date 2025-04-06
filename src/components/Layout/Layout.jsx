import React from "react";
import { useLocation } from "react-router-dom";
import RouteLayout from "../../Routes/RouteLayout";
import AdminNav from "../Navbar/AdminNav";
import StaffNav from "../Navbar/StaffNav";
import Navigation from "../Navbar/Navigation";

export const Layout = () => {
  const location = useLocation(); // Move this inside the component
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStaffRoute = location.pathname.startsWith("/staff");

  return (
    <div>
      {isAdminRoute ? (
        <AdminNav />
      ) : isStaffRoute ? (
        <StaffNav />
      ) : (
        <Navigation />
      )}

      <RouteLayout />
    </div>
  );
};

export default Layout;