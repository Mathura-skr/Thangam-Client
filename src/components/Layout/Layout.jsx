// import React from "react";
// import { useLocation } from "react-router-dom";
// import RouteLayout from "../../Routes/RouteLayout";
// import AdminNav from "../Navbar/AdminNav";
// import StaffNav from "../Navbar/StaffNav";
// import Navigation from "../Navbar/Navigation";

// const Layout = () => {
//   const location = useLocation();

//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isStaffRoute = location.pathname.startsWith("/staff");

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar based on role */}
//       {isAdminRoute && <AdminNav />}
//       {isStaffRoute && <StaffNav />}
//       {!isAdminRoute && !isStaffRoute && <Navigation />}

//       <div className="flex-1 p-4">
//         <RouteLayout />
//       </div>
//     </div>
//   );
// };

// export default Layout;
