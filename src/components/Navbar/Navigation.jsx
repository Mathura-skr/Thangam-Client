import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaMoon, FaSun } from 'react-icons/fa';
import PersonIcon from '@mui/icons-material/Person';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Avatar, IconButton, Menu, MenuItem, Fade } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import useFetch from '../../hooks/useFetch';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);

  const { data: userData } = useFetch(user ? `/api/users/${user.userId}` : null);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
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
        ? 'outline outline-2 outline-black dark:outline-white'
        : 'hover:outline hover:outline-2 hover:outline-black dark:hover:outline-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white outline px-5 py-3 shadow-md">
      <div className="cursor-pointer" onClick={() => navigate('/')}>
        <img src={require('../../assets/images/logo1.png')} alt="Logo" className="w-36 md:w-44" />
      </div>

      <ul className="hidden md:flex gap-6">
        <li><Link to="/" className={navLinkClass('/')}>Home</Link></li>
        <li><Link to="/product" className={navLinkClass('/product')}>Products</Link></li>
        <li><Link to="/rent" className={navLinkClass('/rent')}>Rental</Link></li>
        <li><Link to="/about" className={navLinkClass('/about')}>About</Link></li>
        <li><Link to="/contact" className={navLinkClass('/contact')}>Contact</Link></li>
      </ul>

      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-xs">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search for fertilizer or tools"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full min-w-[150px] max-w-[250px] p-2 text-sm border rounded focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700">Search</button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white shadow-md rounded p-2 w-full z-50">
              {suggestions.map(suggestion => (
                <li key={suggestion.id} className="p-1 hover:bg-gray-100">{suggestion.name}</li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/cart" className={navLinkClass('/cart')}>
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
                sx={{ bgcolor: userData?.image_url ? 'transparent' : 'black', color: 'white', cursor: 'pointer' }}
              >
                {!userData?.image_url && user?.name ? user.name[0].toUpperCase() : ""}
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
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    backgroundColor: darkMode ? '#1f2937' : '#fff',
                    color: darkMode ? '#fff' : '#000',
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={() => navigate("/login")}> <PersonIcon /> </IconButton>
          )}
        </div>
      </div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </nav>
  );
};

export default Navbar;
