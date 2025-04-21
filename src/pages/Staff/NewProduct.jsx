import React, { useState } from "react";
import Sidebar from "./StaffSidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import AdminNav from "../../components/Navbar/StaffNav";

export default function NewProductStaff() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [image_url, setImageURL] = useState("");

  const subCategories = {
    Fertilizer: ["Organic", "Chemical", "Compost"],
    Tools: [
      "Hand Tools",
      "Land Movers",
      "Cleaning Tools",
      "Protective Accessories",
      "Watering Systems",
    ],
  };

  const categories = [
    { id: 1, name: "Fertilizer" },
    { id: 2, name: "Tools" },
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

    if (
      isNaN(price) ||
      price <= 0 ||
      isNaN(stock) ||
      stock <= 0 ||
      productName.trim() === ""
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid details.",
      });
    }

    if (category === "Fertilizer" && !quantity) {
      return Swal.fire({
        icon: "error",
        title: "Quantity required",
        text: "Please enter quantity for fertilizer products",
      });
    }

    const numericQuantity = category === "Fertilizer" ? Number(quantity) : null;
    
    const payload = {
      name: productName,
      category_name: category,
      subcategory_name: subCategory,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      brand_name: brand,
      supplier_name: supplier,
      image_url,
      quantity: numericQuantity
    };

    // Debug log
  console.log("Final payload:", payload);

    if (category === "Fertilizer") {
      payload.quantity = parseFloat(quantity);
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post("/api/products/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/admin/products");
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
            <h1 className="text-2xl font-semibold">Add New Product</h1>
            <button
              onClick={() => navigate("/admin/products")}
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
            <Input label="Supplier" onChange={setSupplier} />
            <Input label="Price" type="number" onChange={setPrice} />
            <Textarea label="Description" onChange={setDescription} />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {category === "Fertilizer" && (
              <Input label="Quantity (kg)" type="number" value={quantity} onChange={setQuantity} />
            )}

            {category && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  SubCategory
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  {subCategories[category]?.map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Input label="Stock" type="number" onChange={setStock} />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Upload Image</label>
              <input
                type="file"
                name="product_image"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleSingleImageUpload}
              />
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
const Input = ({ label, type = "text", onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) =>
        onChange(type === "number" ? parseFloat(e.target.value) : e.target.value)
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
