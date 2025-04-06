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
import Contact from '../pages/Contact/Contact';
import HomePage from '../pages/home/HomePage';
import ProductPage from '../pages/Product/ProductPage';

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
import ReviewList from '../pages/Admin/ReviewList';
import AdminSettings from '../pages/Admin/StaffSettings';
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
import StaffReviewList from '../pages/Staff/ReviewList';
import StaffDashboard from '../pages/Staff/StaffDashboard';
import StaffSettings from '../pages/Staff/StaffSettings';
import StaffSupplierList from '../pages/Staff/SupplierList';
import StaffUpdateOrder from '../pages/Staff/UpdateOrder';
import StaffUpdateProduct from '../pages/Staff/UpdateProduct';
import StaffUpdateSupplier from '../pages/Staff/UpdateSupplier';

export default function RouteLayout() {
  
  const Protected = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (


      <div className="flex-1">
        <Routes>
          {/* Public */}
          <Route path='/' element={<HomePage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about' element={<Aboutus />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/resetPassword' element={<ResetPassword />} />

          {/* Admin */}
          <Route path='/admin/dashboard' element={<Protected> <Dashboard /> </Protected>} />
          <Route path='/admin/products' element={<Protected> <ProductList /> </Protected>} />
          <Route path='/admin/products/create' element={<Protected> <NewProduct /> </Protected>} />
          <Route path='/admin/product/:id' element={<Protected> <UpdateProduct /> </Protected>} />
          <Route path='/admin/orders' element={<Protected> <OrderList /> </Protected>} />
          <Route path='/admin/order/:id' element={<Protected> <UpdateOrder /> </Protected>} />
          <Route path='/admin/users' element={<Protected> <UserList /> </Protected>} />
          <Route path='/admin/users/create' element={<Protected> <AddUser /> </Protected>} />
          <Route path='/admin/user/:id' element={<Protected> <UpdateUser /> </Protected>} />
          <Route path='/admin/employees' element={<Protected> <EmployeeList /> </Protected>} />
          <Route path='/admin/employees/create' element={<Protected> <AddEmployee /> </Protected>} />
          <Route path='/admin/employee/:id' element={<Protected> <UpdateEmployee /> </Protected>} />
          <Route path='/admin/suppliers' element={<Protected> <SupplierList /> </Protected>} />
          <Route path='/admin/suppliers/create' element={<Protected> <AddSupplier /> </Protected>} />
          <Route path='/admin/supplier/:id' element={<Protected> <UpdateSupplier /> </Protected>} />
          <Route path='/admin/reviews' element={<Protected> <ReviewList /> </Protected>} />
          <Route path='/admin/rental' element={<Protected> <RentalList /> </Protected>} />
          <Route path='/admin/settings' element={<Protected> <AdminSettings /> </Protected>} />

          {/* Staff */}
          <Route path='/staff/dashboard' element={<Protected> <StaffDashboard /> </Protected>} />
          <Route path='/staff/products' element={<Protected> <StaffProductList /> </Protected>} />
          <Route path='/staff/products/create' element={<Protected> <StaffNewProduct /> </Protected>} />
          <Route path='/staff/product/:id' element={<Protected> <StaffUpdateProduct /> </Protected>} />
          <Route path='/staff/orders' element={<Protected> <StaffOrderList /> </Protected>} />
          <Route path='/staff/order/:id' element={<Protected> <StaffUpdateOrder /> </Protected>} />
          <Route path='/staff/suppliers' element={<Protected> <StaffSupplierList /> </Protected>} />
          <Route path='/staff/suppliers/create' element={<Protected> <StaffAddSupplier /> </Protected>} />
          <Route path='/staff/supplier/:id' element={<Protected> <StaffUpdateSupplier /> </Protected>} />
          <Route path='/staff/reviews' element={<Protected> <StaffReviewList /> </Protected>} />
          <Route path='/staff/rental' element={<Protected> <StaffRentalList /> </Protected>} />
          <Route path='/staff/settings' element={<Protected> <StaffSettings /> </Protected>} />
        </Routes>
      </div>
 
  );
}
