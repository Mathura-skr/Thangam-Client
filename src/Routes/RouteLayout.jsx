import React, { useContext } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import '../App';
import { AuthContext } from "../context/authContext";

// Public pages
import Aboutus from '../pages/AboutUs/Aboutus';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ResetPassword from '../pages/Auth/ResetPassword';
import Cart from '../pages/Cart/Cart';
import Rent from '../pages/Rent/Rent';
import Contact from '../pages/Contact/Contact';
import HomePage from '../pages/home/HomePage';
import ProductPage from '../pages/Product/ProductPage';
import UserProfile from '../pages/Profile/UserProfile';

// Admin pages
import AddEmployee from '../pages/Admin/AddEmployee';
import AddSupplier from '../pages/Admin/AddSupplier';
import AddUser from '../pages/Admin/AddUser';
import Dashboard from '../pages/Admin/Dashboard';
import EmployeeList from '../pages/Admin/EmployeeList';
import NewProduct from '../pages/Admin/NewProduct';
import OrderList from '../pages/Admin/OrderList';
import ProductList from '../pages/Admin/ProductList';
import RentalList from '../pages/Admin/RentalList';
import RentalProduct from '../pages/Admin/NewRentalProduct';
import UpdateRentalProduct from '../pages/Admin/UpdateRentalProduct';
import ReviewList from '../pages/Admin/ReviewList';
import AdminSettings from '../pages/Admin/AdminSettings';
import SupplierList from '../pages/Admin/SupplierList';
import UpdateEmployee from '../pages/Admin/UpdateEmployee';
import UpdateOrder from '../pages/Admin/UpdateOrder';
import UpdateProduct from '../pages/Admin/UpdateProduct';
import UpdateSupplier from '../pages/Admin/UpdateSupplier';
import UpdateUser from '../pages/Admin/UpdateUser';
import UserList from '../pages/Admin/UserList';

// Staff pages
import StaffAddSupplier from '../pages/Staff/AddSupplier';
import StaffNewProduct from '../pages/Staff/NewProduct';
import StaffOrderList from '../pages/Staff/OrderList';
import StaffProductList from '../pages/Staff/ProductList';
import StaffRentalList from '../pages/Staff/RentalList';
import StaffRentalProduct from '../pages/Staff/NewRentalProduct';
import StaffUpdateRentalProduct from '../pages/Staff/UpdateRentalProduct';
import StaffReviewList from '../pages/Staff/ReviewList';
import StaffDashboard from '../pages/Staff/StaffDashboard';
import StaffSettings from '../pages/Staff/StaffSettings';
import StaffSupplierList from '../pages/Staff/SupplierList';
import StaffUpdateOrder from '../pages/Staff/UpdateOrder';
import StaffUpdateProduct from '../pages/Staff/UpdateProduct';
import StaffUpdateSupplier from '../pages/Staff/UpdateSupplier';

import Forbidden403 from '../pages/ErrorPages/Forbidden403';
import Checkout from "../pages/Checkout/Checkout";
import ProductDetail from "../pages/Product/ProductDetail";


export default function RouteLayout() {
  
  const Protected = ({ children, role }) => {
    const { user } = useContext(AuthContext); 
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (role && user.role !== role) {
      return <Forbidden403 />;
    }
  
    return children;
  };
  
  
  return (

<div className="flex-1">
<Routes>

  {/* Public */}
  <Route path='/' element={<HomePage />} />
  <Route path='/product' element={<ProductPage />} />
  <Route path='/product/:id' element={<ProductDetail />} />
  <Route path='/cart' element={<Protected role="user"> <Cart /></Protected>} />
  <Route path='/checkout' element={<Protected role="user"><Checkout /></Protected>} />
    {/* <Route path='/cart' element={ <Cart />} />
    <Route path='/checkout' element={<Checkout />} /> */}
  <Route path='/rent' element={<Rent />} />
  <Route path='/about' element={<Aboutus />} />
  <Route path='/contact' element={<Contact />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/resetPassword' element={<ResetPassword />} />

  <Route path='/userProfile' element={<Protected role="user"><UserProfile /></Protected>} />

  {/* Admin */}
  <Route path='/admin/dashboard' element={<Protected role="admin"><Dashboard /></Protected>} />
  <Route path='/admin/products' element={<Protected role="admin"><ProductList /></Protected>} />
  <Route path='/admin/products/create' element={<Protected role="admin"><NewProduct /></Protected>} />
  <Route path='/admin/product/:id' element={<Protected role="admin"><UpdateProduct /></Protected>} />
  <Route path='/admin/orders' element={<Protected role="admin"><OrderList /></Protected>} />
  <Route path='/admin/order/:id' element={<Protected role="admin"><UpdateOrder /></Protected>} />
  <Route path='/admin/users' element={<Protected role="admin"><UserList /></Protected>} />
  <Route path='/admin/users/create' element={<Protected role="admin"><AddUser /></Protected>} />
  <Route path='/admin/user/:id' element={<Protected role="admin"><UpdateUser /></Protected>} />
  <Route path='/admin/employees' element={<Protected role="admin"><EmployeeList /></Protected>} />
  <Route path='/admin/employees/create' element={<Protected role="admin"><AddEmployee /></Protected>} />
  <Route path='/admin/employee/:id' element={<Protected role="admin"><UpdateEmployee /></Protected>} />
  <Route path='/admin/suppliers' element={<Protected role="admin"><SupplierList /></Protected>} />
  <Route path='/admin/suppliers/create' element={<Protected role="admin"><AddSupplier /></Protected>} />
  <Route path='/admin/supplier/:id' element={<Protected role="admin"><UpdateSupplier /></Protected>} />
  <Route path='/admin/reviews' element={<Protected role="admin"><ReviewList /></Protected>} />
  <Route path='/admin/rental' element={<Protected role="admin"><RentalList /></Protected>} />
  <Route path='/admin/rental/create' element={<Protected role="admin"><RentalProduct /></Protected>} />
  <Route path='/admin/rental/:id' element={<Protected role="admin"><UpdateRentalProduct /></Protected>} />
  <Route path='/admin/settings' element={<Protected role="admin"><AdminSettings /></Protected>} />

  {/* Staff */}
  <Route path='/staff/dashboard' element={<Protected role="staff"><StaffDashboard /></Protected>} />
  <Route path='/staff/products' element={<Protected role="staff"><StaffProductList /></Protected>} />
  <Route path='/staff/products/create' element={<Protected role="staff"><StaffNewProduct /></Protected>} />
  <Route path='/staff/product/:id' element={<Protected role="staff"><StaffUpdateProduct /></Protected>} />
  <Route path='/staff/orders' element={<Protected role="staff"><StaffOrderList /></Protected>} />
  <Route path='/staff/order/:id' element={<Protected role="staff"><StaffUpdateOrder /></Protected>} />
  <Route path='/staff/suppliers' element={<Protected role="staff"><StaffSupplierList /></Protected>} />
  <Route path='/staff/suppliers/create' element={<Protected role="staff"><StaffAddSupplier /></Protected>} />
  <Route path='/staff/supplier/:id' element={<Protected role="staff"><StaffUpdateSupplier /></Protected>} />
  <Route path='/staff/reviews' element={<Protected role="staff"><StaffReviewList /></Protected>} />
  <Route path='/staff/rental' element={<Protected role="staff"><StaffRentalList /></Protected>} />
  <Route path='/staff/rental' element={<Protected role="staff"><StaffRentalList /></Protected>} />
  <Route path='/staff/rental/create' element={<Protected role="staff"><StaffRentalProduct /></Protected>} />
  <Route path='/staff/rental/:id' element={<Protected role="staff"><StaffUpdateRentalProduct /></Protected>} />
  <Route path='/staff/settings' element={<Protected role="staff"><StaffSettings /></Protected>} />

</Routes>
</div>
 
  );
}
