import { Fragment } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Product status updated!");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 p-5">
        <Fragment>
          <div className="flex justify-center mt-10">
            <form
              onSubmit={submitHandler}
              className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
            >
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Update Product
              </h1>

              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={() => {}}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={() => {}}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  rows="4"
                  onChange={() => {}}
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={() => {}}
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
                <label className="block text-gray-700">Stock</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={() => {}}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Seller Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={() => {}}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Images</label>
                <input
                  type="file"
                  multiple
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={() => {}}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
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
