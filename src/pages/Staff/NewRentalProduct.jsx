import React, { useState } from "react";
import Sidebar from "./StaffSidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import AdminNav from "../../components/Navbar/StaffNav";

export default function NewRentalProduct() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image_url, setImageURL] = useState("");
  const [stock, setStock] = useState(0);
  const [availability, setAvailability] = useState(true);

  const subCategories = [
    "Hand Tools",
    "Land Movers",
    "Cleaning Tools",
    "Protective Accessories",
    "Watering Systems",
  ];

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image_url", file);

    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.url;
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const handleSingleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await handleImageUpload(file);
    if (url) setImageURL(url);
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (productName.trim() === "" || isNaN(price) || price <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid product details.",
      });
    }

    const payload = {
      name: productName,
      brand: brand,
      description,
      price: parseFloat(price),
      subcategory_name: subCategory,
      image_url,
      availability_status: availability ? "available" : "unavailable",
  stock: parseInt(stock),
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post("/api/rent/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Rental product added successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/admin/rental");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: err?.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 bg-gray-100 h-full border-r">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5 overflow-y-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Add Rental Product</h1>
            <button
              onClick={() => navigate("/admin/rental")}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            >
              Back to List
            </button>
          </div>

          <form
            onSubmit={sendData}
            className="shadow-lg p-6 rounded-lg bg-white w-full max-w-2xl mx-auto"
            encType="multipart/form-data"
          >
            <Input label="Name" onChange={setProductName} />
            <Input label="Brand" onChange={setBrand} />
            <Input label="Price" type="number" onChange={setPrice} />
            <Textarea label="Description" onChange={setDescription} />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                SubCategory
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="">Select</option>
                {subCategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
            <Input label="Stock" type="number" value={stock} onChange={setStock} />


            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Upload Image
              </label>
              <input
                type="file"
                name="product_image"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleSingleImageUpload}
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="block text-gray-700 font-medium">
                Available
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 transition-all duration-200"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform peer-checked:translate-x-full"></div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              CREATE
            </button>
            <input
              type="reset"
              value="Reset"
              className="w-full bg-red-500 text-white mt-2 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const Input = ({ label, type = "text", onChange, value }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) =>
        onChange(
          type === "number" ? parseFloat(e.target.value) : e.target.value
        )
      }
    />
  </div>
);

const Textarea = ({ label, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <textarea
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  </div>
);
