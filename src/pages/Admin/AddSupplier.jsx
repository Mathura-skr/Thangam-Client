import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";

export default function AddSupplier() {
  const categories = ["Fertilizer", "Tools"];

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
              <h1 className="text-2xl font-semibold mb-4 text-center">Add Supplier</h1>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Mobile</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Address</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" rows="3"></textarea>
              </div>

              <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200">
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
