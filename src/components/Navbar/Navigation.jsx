import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";

import { AuthContext } from "../../context/authContext";
import useFetch from "../../hooks/useFetch";
import axios from "../../utils/axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);

  const { data: userData } = useFetch(user ? `/api/users/${user.userId}` : null);

  // Handle live suggestions with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchSuggestions = async () => {
        if (!searchQuery.trim()) {
          setSuggestions([]);
          return;
        }

        try {
          const res = await axios.get(`/api/products?search=${searchQuery}`);
          const filtered = res.data.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered);
        } catch (error) {
          console.error("Search error:", error);
          setSuggestions([]);
        }
      };

      fetchSuggestions();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1); // Reset the selected index when the query changes
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (suggestions.length > 0 && selectedIndex >= 0) {
      navigate(`/product/${suggestions[selectedIndex].id}`);
    } else {
      setSnackbar({
        open: true,
        message: "No matching products found.",
        severity: "info",
      });
    }

    setSearchQuery("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      navigate(`/product/${suggestions[selectedIndex].id}`);
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleAvatarClick = (event) => {
    user ? setAnchorEl(event.currentTarget) : navigate("/login");
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const handleProfile = () => {
    const role = user?.role;
    if (role === "user") navigate("/userProfile");
    else if (role === "admin") navigate("/admin/dashboard");
    else if (role === "staff") navigate("/staff/dashboard");
    else navigate("/");

    handleCloseMenu();
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    handleCloseMenu();
    navigate("/");
  };

  const navLinkClass = (path) => `
    px-4 py-2 rounded-md font-semibold 
    ${location.pathname === path
      ? "outline outline-2 outline-black dark:outline-white"
      : "hover:outline hover:outline-2 hover:outline-black dark:hover:outline-white"}
  `;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white outline px-5 py-3 shadow-md">
      {/* Logo */}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={require("../../assets/images/logo1.png")}
          alt="Logo"
          className="w-36 md:w-44"
        />
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-6">
        <li><Link to="/" className={navLinkClass("/")}>Home</Link></li>
        <li><Link to="/product" className={navLinkClass("/product")}>Products</Link></li>
        <li><Link to="/rent" className={navLinkClass("/rent")}>Rental</Link></li>
        <li><Link to="/about" className={navLinkClass("/about")}>About</Link></li>
        <li><Link to="/contact" className={navLinkClass("/contact")}>Contact</Link></li>
      </ul>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex items-center">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md w-48 md:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r hover:bg-green-700 transition"
            >
              Search
            </button>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded shadow z-50 mt-1 max-h-60 overflow-auto">
                {suggestions.map((item, index) => (
                  <li
                    key={item.id}
                    className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${selectedIndex === index ? "bg-gray-200" : ""}`}
                    onMouseDown={() => {
                      navigate(`/product/${item.id}`);
                      setSearchQuery("");
                      setSuggestions([]);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* Cart */}
        <Link to="/cart" className={navLinkClass("/cart")}>
          <FaShoppingCart className="text-2xl" />
        </Link>

        {/* User Avatar / Login */}
        <div>
          {user ? (
            <>
              <Avatar
                src={userData?.image_url}
                onClick={handleAvatarClick}
                sx={{
                  bgcolor: userData?.image_url ? "transparent" : "black",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {!userData?.image_url && user?.name
                  ? user.name[0].toUpperCase()
                  : ""}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                TransitionComponent={Fade}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 160,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    backgroundColor: darkMode ? "#1f2937" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={() => navigate("/login")}>
              <PersonIcon />
            </IconButton>
          )}
        </div>
      </div>

      {/* Snackbar */}
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
    </nav>
  );
};

export default Navbar;
