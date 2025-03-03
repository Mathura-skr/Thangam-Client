import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 p-4">
                <h1 className="my-4 text-2xl md:text-3xl font-bold text-center md:text-left">Dashboard</h1>
                
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-xl md:text-2xl font-semibold">Total Amount<br /> <b>2500</b></div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-xl md:text-2xl font-semibold">Products<br /> <b>5</b></div>
                        <Link className="block mt-2 text-white text-sm md:text-base" to="/admin/products">View Details →</Link>
                    </div>
                    
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-xl md:text-2xl font-semibold">Orders<br /> <b>3</b></div>
                        <Link className="block mt-2 text-white text-sm md:text-base" to="/admin/orders">View Details →</Link>
                    </div>
                    
                    <div className="bg-blue-400 text-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-xl md:text-2xl font-semibold">Users<br /> <b>20</b></div>
                        <Link className="block mt-2 text-white text-sm md:text-base" to="/admin/users">View Details →</Link>
                    </div>
                    
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md text-center">
                        <div className="text-xl md:text-2xl font-semibold">Out of Stock<br /> <b>2</b></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
