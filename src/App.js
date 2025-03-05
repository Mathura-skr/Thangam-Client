
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navbar/Navigation';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart/Cart';

import Dashboard from './pages/Admin/Dashboard';
import ProductList from './pages/Admin/ProductList';
import NewProduct from './pages/Admin/NewProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import OrderList from './pages/Admin/OrderList';
import UpdateOrder from './pages/Admin/UpdateOrder';
import UserList from './pages/Admin/UserList';
import UpdateUser from './pages/Admin/UpdateUser';
import EmployeeList from './pages/Admin/EmployeeList';
import UpdateEmployee from './pages/Admin/UpdateEmployee';
import ReviewList from './pages/Admin/ReviewList';
import SupplierList from './pages/Admin/SupplierList';
import UpdateSupplier from './pages/Admin/UpdateSupplier';
import AdminSettings from './pages/Admin/AdminSettings';
import AddEmployee from './pages/Admin/AddEmployee';
import AddUser from './pages/Admin/AddUser';
import AddSupplier from './pages/Admin/AddSupplier';
import RentalList from './pages/Admin/RentalList';






function App() {
  return (

    <Router>
      <div className="App">
        {/* Render Navbar */}
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />

          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<ProductList />} />
          <Route path='/admin/products/create' element={<NewProduct />} />
          <Route path='/admin/product/:id' element={<UpdateProduct />} />
          <Route path='/admin/orders' element={<OrderList />} />
          <Route path='/admin/order/:id' element={<UpdateOrder />} />
          <Route path='/admin/users' element={<UserList />} />
          <Route path='/admin/users/create' element={<AddUser />} />
          <Route path='/admin/user/:id' element={<UpdateUser />} />
          <Route path='/admin/employees' element={<EmployeeList />} />
          <Route path='/admin/employees/create' element={<AddEmployee />} />
          <Route path='/admin/employee/:id' element={<UpdateEmployee />} />
          <Route path='/admin/suppliers' element={<SupplierList />} />
          <Route path='/admin/suppliers/create' element={<AddSupplier />} />
          <Route path='/admin/supplier/:id' element={<UpdateSupplier />} />
          <Route path='/admin/reviews' element={<ReviewList />} />
          <Route path='/admin/rental' element={<RentalList />} />
          <Route path='/admin/settings' element={<AdminSettings />} />

        </Routes>
      </div>
    </Router>



  );
}

export default App;
