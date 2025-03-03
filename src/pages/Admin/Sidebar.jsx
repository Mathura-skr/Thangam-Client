import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-gray-900 text-white">
            <nav className="w-64 p-5 space-y-4">
                <ul className="space-y-4">
                    <li>
                        <Link to="/admin/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    
                    <li>
                        <button 
                            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="flex items-center space-x-2">
                                <i className="fa fa-product-hunt"></i>
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
                    </li>
                    
                    <li>
                        <Link to="/admin/orders" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <i className="fa fa-shopping-basket"></i>
                            <span>Orders</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/admin/users" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <i className="fa fa-users"></i>
                            <span>Users</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/admin/reviews" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                            <i className="fa fa-users"></i>
                            <span>Reviews</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
