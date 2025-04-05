import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import '../../App.css';
import Navigation from '../Navbar/Navigation';

// Public pages
import HomePage from '../../pages/home/HomePage';
import ProductPage from '../../pages/Product/ProductPage';
import Cart from '../../pages/Cart/Cart';
import Aboutus from '../../pages/AboutUs/Aboutus';
import Contact from '../../pages/Contact/Contact';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';
import ResetPassword from '../../pages/Auth/ResetPassword';

// Admin pages
import Dashboard from '../../pages/Admin/Dashboard';
import ProductList from '../../pages/Admin/ProductList';
import NewProduct from '../../pages/Admin/NewProduct';
import UpdateProduct from '../../pages/Admin/UpdateProduct';
import OrderList from '../../pages/Admin/OrderList';
import UpdateOrder from '../../pages/Admin/UpdateOrder';
import UserList from '../../pages/Admin/UserList';
import UpdateUser from '../../pages/Admin/UpdateUser';
import EmployeeList from '../../pages/Admin/EmployeeList';
import UpdateEmployee from '../../pages/Admin/UpdateEmployee';
import ReviewList from '../../pages/Admin/ReviewList';
import SupplierList from '../../pages/Admin/SupplierList';
import UpdateSupplier from '../../pages/Admin/UpdateSupplier';
import AdminSettings from '../../pages/Admin/StaffSettings';
import AddEmployee from '../../pages/Admin/AddEmployee';
import AddUser from '../../pages/Admin/AddUser';
import AddSupplier from '../../pages/Admin/AddSupplier';
import RentalList from '../../pages/Admin/RentalList';
import AdminNav from '../Navbar/AdminNav';

// Staff pages
import StaffDashboard from '../../pages/Staff/StaffDashboard';
import StaffProductList from '../../pages/Staff/ProductList';
import StaffNewProduct from '../../pages/Staff/NewProduct';
import StaffUpdateProduct from '../../pages/Staff/UpdateProduct';
import StaffOrderList from '../../pages/Staff/OrderList';
import StaffUpdateOrder from '../../pages/Staff/UpdateOrder';
import StaffReviewList from '../../pages/Staff/ReviewList';
import StaffSupplierList from '../../pages/Staff/SupplierList';
import StaffUpdateSupplier from '../../pages/Staff/UpdateSupplier';
import StaffSettings from '../../pages/Staff/StaffSettings';
import StaffAddSupplier from '../../pages/Staff/AddSupplier';
import StaffRentalList from '../../pages/Staff/RentalList';
import StaffNav from '../Navbar/StaffNav';

export default function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isStaffRoute = location.pathname.startsWith('/staff');

  return (
    <div className="App">
      {isAdminRoute ? (
        <AdminNav />
      ) : isStaffRoute ? (
        <StaffNav />
      ) : (
        <Navigation />
      )}

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

          {/* Staff */}
          <Route path='/staff/dashboard' element={<StaffDashboard />} />
          <Route path='/staff/products' element={<StaffProductList />} />
          <Route path='/staff/products/create' element={<StaffNewProduct />} />
          <Route path='/staff/product/:id' element={<StaffUpdateProduct />} />
          <Route path='/staff/orders' element={<StaffOrderList />} />
          <Route path='/staff/order/:id' element={<StaffUpdateOrder />} />
          <Route path='/staff/suppliers' element={<StaffSupplierList />} />
          <Route path='/staff/suppliers/create' element={<StaffAddSupplier />} />
          <Route path='/staff/supplier/:id' element={<StaffUpdateSupplier />} />
          <Route path='/staff/reviews' element={<StaffReviewList />} />
          <Route path='/staff/rental' element={<StaffRentalList />} />
          <Route path='/staff/settings' element={<StaffSettings />} />
        </Routes>
      </div>
    </div>
  );
}
