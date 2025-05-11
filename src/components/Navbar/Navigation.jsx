import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Avatar, IconButton, Menu, MenuItem, Fade } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import useFetch from "../../hooks/useFetch";
 import { useEffect } from "react";
import axios from "../../utils/axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);

  const { data: userData } = useFetch(
    user ? `/api/users/${user.userId}` : null
  );

 

useEffect(() => {
  console.log("Fetched products:", products);
  const delayDebounce = setTimeout(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(`/api/products?search=${searchQuery}`);
        setSuggestions(res.data);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, 400); // Delay in milliseconds (400ms is a good balance)

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);


  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`/api/products?search=${query}`);
      setSuggestions(res.data); 
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
  e.preventDefault();

  if (!searchQuery.trim()) return;

  const exactMatch = suggestions.find(
    (item) => item.name.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  if (exactMatch) {
    navigate(`/product/${exactMatch.id}`);
  } else if (suggestions.length > 0) {
    navigate(`/product/${suggestions[0].id}`);
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


  const handleAvatarClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/login");
    }
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

  // const handleToggleTheme = () => {
  //   const newTheme = !darkMode;
  //   setDarkMode(newTheme);
  //   localStorage.setItem("theme", newTheme ? "dark" : "light");
  //   document.documentElement.classList.toggle("dark", newTheme);
  // };

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md font-semibold ${
      location.pathname === path
        ? "outline outline-2 outline-black dark:outline-white"
        : "hover:outline hover:outline-2 hover:outline-black dark:hover:outline-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white outline px-5 py-3 shadow-md">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          src={require("../../assets/images/logo1.png")}
          alt="Logo"
          className="w-36 md:w-44"
        />
      </div>

      <ul className="hidden md:flex gap-6">
        <li>
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/product" className={navLinkClass("/product")}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/rent" className={navLinkClass("/rent")}>
            Rental
          </Link>
        </li>
        <li>
          <Link to="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md w-48 md:w-64"
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
            >
              Search
            </button>
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border rounded shadow z-50 mt-1">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setSearchQuery("");
                      setSuggestions([]);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        <Link to="/cart" className={navLinkClass("/cart")}>
          <FaShoppingCart className="text-2xl" />
        </Link>

        {/* <button onClick={handleToggleTheme} className="text-xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button> */}

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
              {" "}
              <PersonIcon />{" "}
            </IconButton>
          )}
        </div>
      </div>

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
