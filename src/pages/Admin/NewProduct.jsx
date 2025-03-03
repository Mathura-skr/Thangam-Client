import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewProduct() {
  const categories = [
    "Fertilizer",
    "Tools",

  ];

  const submitHandler = (e) => {};

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
              <h1 className="text-2xl font-semibold mb-4 text-center">New Product</h1>

              <div className="mb-4">
                <label htmlFor="name_field" className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price_field" className="block text-gray-700 font-medium">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description_field" className="block text-gray-700 font-medium">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  id="description_field"
                  rows="4"
                  onChange={() => {}}
                  value=""
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="category_field" className="block text-gray-700 font-medium">Category</label>
                <select
                  onChange={() => {}}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="stock_field" className="block text-gray-700 font-medium">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label htmlFor="seller_field" className="block text-gray-700 font-medium">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={() => {}}
                  value=""
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Images</label>
                <input
                  type="file"
                  name="product_images"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  id="customFile"
                  multiple
                  onChange={() => {}}
                />
              </div>

              <button
                id="login_button"
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
