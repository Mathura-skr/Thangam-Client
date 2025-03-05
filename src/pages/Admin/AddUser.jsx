import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

export default function AddUser() {
  const roles = ["Admin", "Customer", "Employee"];

  const submitHandler = () => {};

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 px-4">
        <Fragment>
          <div className="flex justify-center mt-10">
            <form
              onSubmit={submitHandler}
              className="shadow-lg p-6 rounded-lg bg-white w-full max-w-lg"
              encType="multipart/form-data"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center">Add User</h1>

              <div className="mb-4">
                <label htmlFor="username_field" className="block text-gray-700 font-medium">Username</label>
                <input
                  type="text"
                  id="username_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 hover:border-black"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email_field" className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 hover:border-black"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password_field" className="block text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 hover:border-black"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirm_password_field" className="block text-gray-700 font-medium">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 hover:border-black"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="role_field" className="block text-gray-700 font-medium">Role</label>
                <select
                  onChange={() => {}}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 hover:border-black"
                  id="role_field"
                >
                  <option value="">Select</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="profile_picture"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 hover:border-black"
                  id="customFile"
                  onChange={() => {}}
                />
              </div>

              <button
                id="add_user_button"
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
              >
                ADD USER
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
