import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import PersonIcon from "@mui/icons-material/Person";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Avatar, IconButton } from '@mui/material';
import { AuthContext } from '../../context/authContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // You can filter suggestions based on query
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfile && !event.target.closest('.profile-dropdown')) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfile]);

  const handleAvatarClick = () => {
    if (auth.user?.role === "user") {
      navigate("/userProfile");
    } else if (auth.user?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/staff/dashboard");
    }
  };

  // Helper for active nav class
  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md font-semibold ${
      location.pathname === path
        ? 'outline outline-2 outline-black'
        : 'hover:outline hover:outline-2 hover:outline-black'
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
            <ul className="absolute top-12 left-0 bg-white shadow-md rounded p-2 w-full">
              {suggestions.map(suggestion => (
                <li key={suggestion.id} className="p-1 hover:bg-gray-100">{suggestion.name}</li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/cart" className={navLinkClass('/cart')}>
          <FaShoppingCart className="text-2xl" />
        </Link>

        <div>
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "black", color: "white", cursor: "pointer" }}
            >
              {auth.user?.name ? auth.user.name[0].toUpperCase() : "?"}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/login")}>
              <PersonIcon />
            </IconButton>
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
