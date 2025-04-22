import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

export default function UpdateRentalProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageURLs] = useState([]);

  const subCategories = [
    "Hand Tools",
      "Land Movers",
      "Cleaning Tools",
      "Protective Accessories",
      "Watering Systems",
  ];

  useEffect(() => {
    async function fetchRentalProduct() {
      try {
        const { data } = await axios.get(`/api/rent/${id}`);
        setProductName(data.name);
        setBrand(data.brand);
        setSubcategory(data.subcategory);
        setPrice(data.price);
        setDescription(data.description);
        setImageURLs(data.image_url ? [data.image_url] : []);
      } catch (err) {
        console.error("Failed to load rental product", err);
      }
    }

    fetchRentalProduct();
  }, [id]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.url;
    } catch (err) {
      console.error("Image upload failed", err);
      return null;
    }
  };

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];

    for (const file of files) {
      const url = await handleImageUpload(file);
      if (url) urls.push(url);
    }

    setImageURLs(urls);
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !brand.trim() || !subcategory || !price) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required",
      });
    }

    const payload = {
      name: productName,
      brand,
      subcategory,
      price: parseFloat(price),
      description,
      image_url: image_url[0] || "",
    };

    try {
      await axios.put(`/api/rent/${id}`, payload);
      Swal.fire({
        icon: "success",
        title: "Rental product updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err?.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 px-4">
        <div className="flex justify-center mt-10">
          <form
            onSubmit={sendData}
            className="shadow-lg p-6 rounded-lg bg-white w-full max-w-lg"
          >
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Update Rental Product
            </h1>

            <Input label="Name" value={productName} onChange={setProductName} />
            <Input label="Brand" value={brand} onChange={setBrand} />
            <Input
              label="Price (LKR/day)"
              type="number"
              value={price}
              onChange={setPrice}
            />
            <Textarea
              label="Description"
              value={description}
              onChange={setDescription}
            />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Subcategory</label>
              <select
                value={subcategory}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value="">Select</option>
                {subCategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <label className="block text-gray-700 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleMultipleImageUpload}
            />

            {image_url.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-700 font-medium mb-2">Current Image:</p>
                <img
                  src={image_url[0]}
                  alt="Rental Product"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition duration-200 mt-4"
            >
              UPDATE
            </button>

            <input
              type="reset"
              value="Reset"
              className="w-full bg-gray-300 text-black mt-2 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      onChange={(e) =>
        onChange(type === "number" ? parseFloat(e.target.value) : e.target.value)
      }
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <textarea
      rows="4"
      value={value}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  </div>
);
