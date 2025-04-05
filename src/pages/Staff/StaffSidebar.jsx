import BuildIcon from '@mui/icons-material/Build';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StaffSidebar() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const menuItems = [
        { icon: <SpaceDashboardIcon />, label: 'Dashboard', path: '/staff/dashboard' },
        { icon: <BuildIcon />, label: 'Product', path: '/staff/products' },
        { icon: <LocalShippingIcon />, label: 'Orders', path: '/staff/orders' },
        { icon: <RecyclingIcon />, label: 'Rent', path: '/staff/rental' },
        { icon: <DeliveryDiningIcon />, label: 'Suppliers', path: '/staff/suppliers' },
        { icon: <MonetizationOnIcon />, label: 'Sales', path: '/staff/sales' },
        { icon: <SettingsIcon />, label: 'Settings', path: '/staff/settings' },
    ];

    return (
        <div>
            {/* Toggle button (only visible on small screens) */}
            <button
                className="absolute top-4 left-4 z-50 p-2 bg-gray-800 rounded md:hidden"
                onClick={toggleSidebar}
            >
                {sidebarOpen ? <CloseIcon className=' text-white'/> : <MenuIcon className='bg-grey-700 text-white'/>}
            </button>

            {/* Sidebar */}
            <nav
                className={`
                    fixed top-0 left-0 h-full bg-gray-900 shadow-lg z-40
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
                                    onClick={() => setSidebarOpen(false)} // auto-close on mobile
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
