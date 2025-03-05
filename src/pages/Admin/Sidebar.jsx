import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BuildIcon from '@mui/icons-material/Build';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import RecyclingIcon from '@mui/icons-material/Recycling';

export default function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-gray-900 text-white">
            <nav className="w-64 p-5 space-y-4">
                <ul className="space-y-4">
                    <li>
                        <Link to="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <SpaceDashboardIcon />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                        <BuildIcon />
                            <span>Product</span>
                        </Link>
                    </li>

                    {/* <li>
                        <button
                            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="flex items-center space-x-2">
                                <BuildIcon />
                                <span>Product</span>
                            </span>
                            <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
                        </button>
                        {isOpen && (
                            <ul className="ml-6 mt-2 space-y-2 border-l border-gray-700 pl-3">
                                <li>
                                    <button onClick={() => navigate('/admin/products')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full">
                                        <i className="fa fa-shopping-basket"></i>
                                        <span>All</span>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => navigate('/admin/products/create')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full">
                                        <i className="fa fa-plus"></i>
                                        <span>Create</span>
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li> */}

                    <li>
                        <Link to="/admin/orders" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <LocalShippingIcon />
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/rental" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <RecyclingIcon  />
                            <span>Rent</span>
                        </Link>
                    </li>

{/* 
                    <li>
                        <Link to="/admin/reviews" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <ReviewsIcon/>
                            <span>Reviews</span>
                        </Link>
                    </li> */}

                    
                    <li>
                        <Link to="/admin/users" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <GroupIcon/>
                            <span>Users</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/employees" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <Diversity1Icon/>
                            <span>Employees</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/suppliers" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <DeliveryDiningIcon/>
                            <span>Suppliers</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/sales" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <MonetizationOnIcon/>
                            <span>Sales</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <SettingsIcon/>
                            <span>Settings</span>
                        </Link>
                    </li>


                </ul>
            </nav>
        </div>
    );
}
