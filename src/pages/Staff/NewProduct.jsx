import React, { useState, useEffect } from "react";
import Sidebar from "./StaffSidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import AdminNav from "../../components/Navbar/StaffNav";

export default function NewProduct() {
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
  const [discount, setDiscount] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [brandNames, setBrandNames] = useState([]);

  const [image_url, setImageURL] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [manufacturedDate, setManufacturedDate] = useState("");

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

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { data } = await axios.get("/api/suppliers");

        setSuppliers(data);

        const uniqueSuppliers = [
          ...new Set(data.map((s) => s.name).filter(Boolean)),
        ];
        const uniqueBrands = [
          ...new Set(data.map((s) => s.brand).filter(Boolean)),
        ];

        setSupplierNames(uniqueSuppliers);
        setBrandNames(uniqueBrands);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

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

    if (
      category === "Fertilizer" &&
      (!quantity || !expiryDate || !manufacturedDate)
    ) {
      return Swal.fire({
        icon: "error",
        title: "Missing Info",
        text: "Please enter quantity, expiry date and manufactured date for fertilizers",
      });
    }

    const payload = {
      name: productName,
      category_name: category,
      subcategory_name: subCategory,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      brand_name: brand,
      supplier_name: supplier,
      discount: discount ? parseFloat(discount) : 0,
      image_url,
    };

    if (category === "Fertilizer") {
      payload.quantity = parseFloat(quantity);
      payload.expiry_date = expiryDate;
      payload.manufactured_date = manufacturedDate;
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

      navigate("/staff/products");
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
              onClick={() => navigate("/staff/products")}
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

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Brand</label>
              <input
                list="brand-list"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <datalist id="brand-list">
                {brandNames.map((b, idx) => (
                  <option key={idx} value={b} />
                ))}
              </datalist>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Supplier</label>
              <input
                list="supplier-list"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <datalist id="supplier-list">
                {supplierNames.map((s, idx) => (
                  <option key={idx} value={s} />
                ))}
              </datalist>
            </div>

            <Input label="Price" type="number" onChange={setPrice} />
            <Input label="Discount (%)" type="number" onChange={setDiscount} />
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
              <>
                <Input
                  label="Quantity (kg)"
                  type="number"
                  value={quantity}
                  onChange={setQuantity}
                />
                <Input
                  label="Manufactured Date"
                  type="date"
                  value={manufacturedDate}
                  onChange={setManufacturedDate}
                />
                <Input
                  label="Expiry Date"
                  type="date"
                  value={expiryDate}
                  onChange={setExpiryDate}
                />
              </>
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

// Reusable Input Component
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

// Reusable Textarea Component
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
