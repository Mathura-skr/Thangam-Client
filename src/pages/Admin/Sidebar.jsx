import BuildIcon from '@mui/icons-material/Build';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Diversity1Icon from '@mui/icons-material/Diversity1'; 
import GroupIcon from '@mui/icons-material/Group'; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


    {/* TODO: add products span to fer, tools  and blur bg  */}

    const menuItems = [
        { icon: <SpaceDashboardIcon />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <BuildIcon />, label: 'Products', path: '/admin/products' },
        { icon: <LocalShippingIcon />, label: 'Orders', path: '/admin/orders' },
        { icon: <RecyclingIcon />, label: 'Rental', path: '/admin/rental' },
        { icon: <GroupIcon />, label: 'Customers', path: '/admin/users' }, 
        { icon: <Diversity1Icon />, label: 'Staff', path: '/admin/employees' },       
        { icon: <DeliveryDiningIcon />, label: 'Suppliers', path: '/admin/suppliers' },
        { icon: <MonetizationOnIcon />, label: 'Sales', path: '/admin/sales' },          
        { icon: <SettingsIcon />, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div>
            {/* Toggle button (only visible on small screens) */}
            <button
                className="absolute top-4 left-4 z-50 p-2 bg-gray-800 rounded md:hidden"
                onClick={toggleSidebar}
            >
                {sidebarOpen ? <CloseIcon className="text-white" /> : <MenuIcon className="text-white" />}
            </button>

            {/* Sidebar */}
            <nav
                className={`
                    fixed top-0 left-0 h-full shadow-lg z-40
                    transform transition-transform duration-300 ease-in-out
                    w-20 md:w-64 bg-gray-900 text-white
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-5 pt-16 md:pt-5 space-y-4">
                    <ul className="space-y-4">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    to={item.path}
                                    className="flex flex-col items-center md:flex-row md:items-center space-x-0 md:space-x-2 p-2 rounded hover:bg-gray-700"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span className="hidden md:inline">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
