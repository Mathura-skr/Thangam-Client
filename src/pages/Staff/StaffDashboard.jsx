import { useEffect, useState } from "react";
import Sidebar from "./StaffSidebar";
import { Link } from "react-router-dom";
import AdminNav from "../../components/Navbar/StaffNav";
import axios from "../../utils/axios";
import { FaBoxOpen, FaUsers, FaClipboardList, FaExclamationTriangle, FaMoneyBillWave } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalAmount: 0,
        productCount: 0,
        orderCount: 0,
        userCount: 0,
        outOfStock: 0,
    });
    const [monthlySales, setMonthlySales] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch products
                const productsRes = await axios.get("/api/products");
                const products = productsRes.data;
                const productCount = products.length;
                const outOfStock = products.filter(p => p.stock === 0).length;

                // Fetch orders
                const ordersRes = await axios.get("/api/orders");
                const orders = ordersRes.data.orders || [];
                const orderCount = orders.length;
                const totalAmount = orders.reduce((sum, o) => sum + (Number(o.total_price) || 0), 0);

                // Fetch users
                const usersRes = await axios.get("/api/users/all");
                const userCount = usersRes.data.length;

                // Fetch monthly sales trend
                const monthlyRes = await axios.get("/api/orders/summary/monthly");
                const monthlySalesData = (monthlyRes.data || []).slice().sort((a, b) => a.month.localeCompare(b.month)).map(row => ({
                    month: row.month,
                    total_sales: Number(row.total_sales) || 0,
                }));
                setMonthlySales(monthlySalesData);

                setStats({
                    totalAmount,
                    productCount,
                    orderCount,
                    userCount,
                    outOfStock,
                });
            } catch (err) {
                // Optionally handle error
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <AdminNav />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/5 bg-gray-100 h-full border-r">
                    <Sidebar />
                </div>
                <div className="w-4/5 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-200">
                    <h1 className="my-4 text-3xl font-bold text-center md:text-left text-gray-800">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-md border border-green-300">
                            <FaMoneyBillWave className="text-4xl text-green-600 mb-2" />
                            <div className="text-lg font-semibold text-green-800">Total Amount</div>
                            <div className="text-2xl font-bold text-green-900 mt-1">LKR {stats.totalAmount.toLocaleString()}</div>
                        </div> */}
                        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-md border border-blue-300">
                            <FaBoxOpen className="text-4xl text-blue-600 mb-2" />
                            <div className="text-lg font-semibold text-blue-800">Products</div>
                            <div className="text-2xl font-bold text-blue-900 mt-1">{stats.productCount}</div>
                            <Link className="mt-2 text-blue-700 underline text-sm" to="/admin/products">View Details →</Link>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl shadow-md border border-yellow-300">
                            <FaClipboardList className="text-4xl text-yellow-600 mb-2" />
                            <div className="text-lg font-semibold text-yellow-800">Orders</div>
                            <div className="text-2xl font-bold text-yellow-900 mt-1">{stats.orderCount}</div>
                            <Link className="mt-2 text-yellow-700 underline text-sm" to="/admin/orders">View Details →</Link>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl shadow-md border border-purple-300">
                            <FaUsers className="text-4xl text-purple-600 mb-2" />
                            <div className="text-lg font-semibold text-purple-800">Users</div>
                            <div className="text-2xl font-bold text-purple-900 mt-1">{stats.userCount}</div>
                            <Link className="mt-2 text-purple-700 underline text-sm" to="/admin/users">View Details →</Link>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-xl shadow-md border border-red-300">
                            <FaExclamationTriangle className="text-4xl text-red-600 mb-2" />
                            <div className="text-lg font-semibold text-red-800">Out of Stock</div>
                            <div className="text-2xl font-bold text-red-900 mt-1">{stats.outOfStock}</div>
                        </div>
                    </div>
                    {/* Monthly Sales Trend Line Graph */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <h2 className="text-lg font-bold mb-4 text-gray-700">Monthly Sales Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlySales.length ? monthlySales : [{ month: '', total_sales: 0 }]}
                                margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(monthStr) => {
                                        if (!monthStr) return '';
                                        const [year, month] = monthStr.split('-');
                                        const date = new Date(year, month - 1);
                                        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
                                    }}
                                    interval={0}
                                    angle={-30}
                                    textAnchor="end"
                                    height={60}
                                    minTickGap={10}
                                />
                                <YAxis tickFormatter={value => `LKR ${Number(value).toLocaleString()}`} />
                                <Tooltip
                                    formatter={value => `LKR ${Number(value).toLocaleString()}`}
                                    labelFormatter={(monthStr) => {
                                        if (!monthStr) return '';
                                        const [year, month] = monthStr.split('-');
                                        const date = new Date(year, month - 1);
                                        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
                                    }}
                                />
                                <Line type="monotone" dataKey="total_sales" stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
