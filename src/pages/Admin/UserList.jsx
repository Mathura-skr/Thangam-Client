import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function UserList() {
    const data = {
        columns: [
            { label: "ID", field: "id", sort: "asc" },
            { label: "Name", field: "name", sort: "asc" },
            { label: "Email", field: "email", sort: "asc" },
            { label: "Role", field: "role", sort: "asc" },
            { label: "Actions", field: "actions", sort: "asc" }
        ],
        rows: []
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5 bg-gray-900 text-white p-4">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 p-6">
                <h1 className="text-2xl font-bold mb-4">User List</h1>
                <Fragment>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    {data.columns.map((col, index) => (
                                        <th key={index} className="py-2 px-4 border">{col.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.length > 0 ? (
                                    data.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border">
                                            {data.columns.map((col, colIndex) => (
                                                <td key={colIndex} className="py-2 px-4 border">{row[col.field]}</td>
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
