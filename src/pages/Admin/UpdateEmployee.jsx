import { Fragment } from "react";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

export default function UpdateEmployee() {
    const submitHandler = (e) => {
        e.preventDefault();
        toast.success("Employee status updated!");
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/5 bg-gray-800 text-white p-4">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 flex justify-center items-center p-4">
                <Fragment>
                    <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
                        <form onSubmit={submitHandler} className="space-y-4">
                            <h1 className="text-2xl font-bold text-gray-800 text-center">Update Employee</h1>

                            <div>
                                <label htmlFor="name_field" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                                    onChange={() => { }}
                                />
                            </div>

                            <div>
                                <label htmlFor="email_field" className="block text-gray-700">Email</label>
                                <input
                                    type="text"
                                    id="email_field"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                                    onChange={() => { }}
                                />
                            </div>

                            <div>
                                <label htmlFor="role_field" className="block text-gray-700">Role</label>
                                <select
                                    onChange={() => { }}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                                    id="role_field"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">Staff</option>
                                </select>
                            </div>

                            <button
                                id="update_button"
                                type="submit"
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold"
                            >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
