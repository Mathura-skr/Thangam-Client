
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navbar/Navigation';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/Product/ProductPage';


function App() {
  return (

    <Router>
    <div className="App">
      {/* Render Navbar */}
      <Navigation />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/product" element={<ProductPage />} />

    </Routes>
    </div>
    </Router>



  );
}

export default App;
