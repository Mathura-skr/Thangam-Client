
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Navigation from './components/Navbar/Navigation';


function App() {
  return (

    <Router>
    <div className="App">
      {/* Render Navbar */}
      <Navigation />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </div>
    </Router>



  );
}

export default App;
