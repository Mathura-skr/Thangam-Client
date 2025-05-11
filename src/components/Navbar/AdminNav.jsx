import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Box } from "@mui/material";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminNav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Fertilizer" },
    { id: 2, name: "Gardening Tools" },
    { id: 3, name: "Plant Care" },
    { id: 4, name: "Seeds" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSuggestions(
      query.length > 0
        ? products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
        : []
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfile && !event.target.closest(".profile-dropdown")) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfile]);

  return (
    <Box className="fix top-0 z-50 relative flex justify-between w-full bg-white px-5 outline py-[.8rem] lg:px-20 shadow-md">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={require("../../assets/images/logo1.png")}
          alt="Logo"
          className="w-36 md:w-44"
        />
      </div>

      {/* Centered Administrator Text */}
      <p className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
        Administrator
      </p>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminNav;
