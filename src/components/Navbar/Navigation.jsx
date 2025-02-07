import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle, FaEye, FaEyeSlash, FaShoppingCart } from 'react-icons/fa';
// import { useAuth } from '../../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { authAPI } from '../../axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions

  const navigate = useNavigate();
  // const { user, logout } = useAuth();

  // Sample product data for search suggestions
  const products = [
    { id: 1, name: 'Fertilizer'},
    { id: 2,name: 'Gardening Tools' },
    { id: 3, name: 'Plant Care' },
    { id: 4,name: 'Seeds' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleLogout = async () => {
    // try {
    //   await authAPI.logout();
    //   logout();
    //   setShowProfile(false);
    //   setSnackbar({
    //     open: true,
    //     message: 'Logged out successfully!',
    //     severity: 'success'
    //   });
    //   navigate('/login');
    // } catch (error) {
    //   console.error('Logout error:', error);
    //   setSnackbar({
    //     open: true,
    //     message: 'Error logging out. Please try again.',
    //     severity: 'error'
    //   });
    // }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Close profile dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfile && !event.target.closest('.navbar__profile')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfile]);

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={require('../../assets/images/logo1.png')} alt="Logo" />
      </div>

      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/product">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="navbar__search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for plants or tools"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        {suggestions.length > 0 && (
          <ul className="search-suggestions">
            {suggestions.map(suggestion => (
              <li key={suggestion.id}>{suggestion.name}</li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/cart" className="navbar__cart">
        <div className="cart-icon-container">
          <FaShoppingCart className="cart-icon" />
          <span className="cart-label">Cart</span>
        </div>
      </Link>

      {/* {user ? (
        <div className="navbar__profile">
          <div className="profile-icon" onClick={toggleProfile}>
            <div className="profile-icon-container">
              <FaUserCircle className="avatar-icon" />
              <span className="profile-label">Profile</span>
            </div>
            <span className="username">{user.fullName}</span>
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <h3>{user.fullName}</h3>
                <p>{user.email}</p>
                <div className="password-field">
                  <span>Password: </span>
                  <span>{showPassword ? user.password : '••••••••'}</span>
                  <button 
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="navbar__login">
          <div className="profile-icon-container">
            <FaUserCircle className="avatar-icon" />
            <span className="profile-label">Profile</span>
          </div>
        </Link>
      )} */}

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </nav>
  );
};

export default Navbar;