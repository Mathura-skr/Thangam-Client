import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Fertilizer' },
    { id: 2, name: 'Gardening Tools' },
    { id: 3, name: 'Plant Care' },
    { id: 4, name: 'Seeds' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSuggestions(query.length > 0 ? products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) : []);
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

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-green-600 px-5 py-3 shadow-md">
      <div className="cursor-pointer" onClick={() => navigate('/')}> 
        <img src={require('../../assets/images/logo1.png')} alt="Logo" className="w-36 md:w-44" />
      </div>

      <ul className="hidden md:flex gap-6 text-white font-semibold">
        <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>
        <li><Link to="/product" className="hover:text-yellow-300">Products</Link></li>
        <li><Link to="/about" className="hover:text-yellow-300">About</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-300">Contact</Link></li>
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
            <button type="submit" className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700">Search</button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white shadow-md rounded p-2 w-full">
              {suggestions.map(suggestion => (
                <li key={suggestion.id} className="p-1 hover:bg-gray-100">{suggestion.name}</li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/cart" className="flex flex-col items-center text-white hover:text-yellow-300">
          <FaShoppingCart className="text-2xl" />
          <span className="text-xs">Cart</span>
        </Link>
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
