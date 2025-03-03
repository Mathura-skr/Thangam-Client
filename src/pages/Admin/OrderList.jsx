import { Fragment } from "react";
import Sidebar from "./Sidebar";

export default function OrderList() {
    const data = {
        columns: [
            { label: 'ID', field: 'id', sort: 'asc' },
            { label: 'Number of Items', field: 'noOfItems', sort: 'asc' },
            { label: 'Amount', field: 'amount', sort: 'asc' },
            { label: 'Status', field: 'status', sort: 'asc' },
            { label: 'Actions', field: 'actions', sort: 'asc' }
        ],
        rows: []
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/4 bg-gray-900 text-white">
                <Sidebar />
            </div>
            <div className="w-full md:w-3/4 p-6">
                <h1 className="text-3xl font-semibold mb-4">Order List</h1>
                <Fragment>
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    {data.columns.map((col) => (
                                        <th key={col.field} className="px-4 py-2 border-b text-left">{col.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.length > 0 ? data.rows.map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{order.id}</td>
                                        <td className="px-4 py-2 border-b">{order.noOfItems}</td>
                                        <td className="px-4 py-2 border-b">{order.amount}</td>
                                        <td className="px-4 py-2 border-b">{order.status}</td>
                                        <td className="px-4 py-2 border-b flex space-x-2">
                                            {/* Action buttons can be added here */}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">No orders found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
