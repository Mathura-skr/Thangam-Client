import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

export default function UpdateProduct() {
  const { id } = useParams();
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
  const [image_url, setImageURLs] = useState([]);

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
    // Fetch product data when component mounts
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProductName(data.name);
        setCategory(data.category_name);
        setSubCategory(data.subcategory_name);
        setPrice(data.price);
        setStock(data.stock);
        setDescription(data.description);
        setBrand(data.brand_name);
        setQuantity(data.quantity || ""); 
        setSupplier(data.supplier_name);
        setImageURLs(data.image_url ? [data.image_url] : []);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    }

    fetchProduct();
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

  async function sendData(e) {
    e.preventDefault();
  
    if (isNaN(price) || price <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter valid price",
      });
    }
  
    if (isNaN(stock) || stock <= 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter valid stock quantity",
      });
    }
  
    if (productName.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Product name is required",
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
      image_url: image_url,
    };
    
    if (category === "fertilizer") {
      payload.quantity = parseFloat(quantity);
    }
    
    const token = localStorage.getItem("token");
  
    try {
      await axios.put(`/api/products/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Product updated successfully",
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
  }
  

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 px-4">
        <Fragment>
          <div className="flex justify-center mt-10">
            <form
              onSubmit={sendData}
              className="shadow-lg p-6 rounded-lg bg-white w-full max-w-lg"
              encType="multipart/form-data"
            >
              <h1 className="text-2xl font-semibold mb-4 text-center">
                Update Product
              </h1>

              {/* Input fields */}
              <Input label="Name" onChange={setProductName} />
              <Input label="Brand" onChange={setBrand} />
              <Input label="Supplier" onChange={setSupplier} />
              <Input label="Price" type="number" onChange={setPrice} />
              <Textarea label="Description" onChange={setDescription} />

              <div className="mb-4">
                <label
                  htmlFor="category_field"
                  className="block text-gray-700 font-medium"
                >
                  Category
                </label>
                <select
                  id="category_field"
                  name="category"
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
                <Input label="Quantity (kg)" type="number" onChange={setQuantity} />
              )}

             
              {category && (
                <div className="mb-4">
                  <label
                    htmlFor="subCategory_field"
                    className="block text-gray-700 font-medium"
                  >
                    SubCategory
                  </label>
                  <select
                    id="subCategory_field"
                    name="subCategory"
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

              {/* File upload */}
              <label
                    htmlFor="subCategory_field"
                    className="block text-gray-700 font-medium"
                  >
                    Upload image
                  </label>
              <input
                type="file"
                name="product_images"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="customFile"
                multiple
                onChange={handleMultipleImageUpload}
              />

              <button
                id="login_button"
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-400 transition duration-200 mt-4"
              >
                UPDATE
              </button>

              <input
                className="w-full bg-red-500 text-white mt-2 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                type="reset"
                value="Reset"
              />
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

// Helper components
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
