import { Fragment, useEffect, useState } from "react";
import Sidebar from "./StaffSidebar";

export default function ReviewList() {
    const data = {
        columns: [
            { label: 'ID', field: 'id', sort: 'asc' },
            { label: 'Rating', field: 'rating', sort: 'asc' },
            { label: 'User', field: 'user', sort: 'asc' },
            { label: 'Comment', field: 'comment', sort: 'asc' },
            { label: 'Actions', field: 'actions', sort: 'asc' }
        ],
        rows: []
    };

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5 bg-gray-800 text-white p-4">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 p-6">
                <h1 className="text-2xl font-bold mb-6">Review List</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full md:w-1/2 bg-white shadow-md p-6 rounded-lg">
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold">Product ID</label>
                                <input 
                                    type="text"
                                    onChange={() => {}} 
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <button 
                                type="submit"  
                                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-all"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <Fragment>
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    {data.columns.map(col => (
                                        <th key={col.field} className="border border-gray-300 px-4 py-2">{col.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.length > 0 ? (
                                    data.rows.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            {data.columns.map(col => (
                                                <td key={col.field} className="border border-gray-300 px-4 py-2">{row[col.field]}</td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={data.columns.length} className="text-center py-4">No data available</td>
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
