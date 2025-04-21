import Sidebar from "./StaffSidebar";
import { Link } from "react-router-dom";
import AdminNav from "../../components/Navbar/StaffNav";

export default function DashboardStaff() {
    return (
        <div className="flex flex-col h-screen">
  
            <AdminNav />

           
            <div className="flex flex-1 overflow-hidden">

                <div className="w-1/5 bg-gray-100 h-full border-r">
                    <Sidebar />
                </div>

                <div className="w-4/5 p-6 overflow-auto">
                    <h1 className="my-4 text-2xl md:text-3xl font-bold text-center md:text-left">Dashboard</h1>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="outline outline-1 outline-black bg-white text-black p-6 rounded-lg shadow-md text-center">
                            <div className="text-xl md:text-2xl font-semibold">
                                Total Amount<br /> <b>2500</b>
                            </div>
                        </div>
                    </div>

         
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div className="outline outline-1 outline-black bg-white text-black p-6 rounded-lg shadow-md text-center">
                            <div className="text-xl md:text-2xl font-semibold">Products<br /> <b>5</b></div>
                            <Link className="block mt-2 text-blue-600 text-sm md:text-base" to="/admin/products">View Details →</Link>
                        </div>

                        <div className="outline outline-1 outline-black bg-white text-black p-6 rounded-lg shadow-md text-center">
                            <div className="text-xl md:text-2xl font-semibold">Orders<br /> <b>3</b></div>
                            <Link className="block mt-2 text-blue-600 text-sm md:text-base" to="/admin/orders">View Details →</Link>
                        </div>

                        <div className="outline outline-1 outline-black bg-white text-black p-6 rounded-lg shadow-md text-center">
                            <div className="text-xl md:text-2xl font-semibold">Users<br /> <b>20</b></div>
                            <Link className="block mt-2 text-blue-600 text-sm md:text-base" to="/admin/users">View Details →</Link>
                        </div>

                        <div className="outline outline-1 outline-black bg-white text-black p-6 rounded-lg shadow-md text-center">
                            <div className="text-xl md:text-2xl font-semibold">Out of Stock<br /> <b>2</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
