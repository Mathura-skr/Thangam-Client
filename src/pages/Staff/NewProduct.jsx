import React, { Fragment, useState } from "react";
import Sidebar from "./StaffSidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import StaffNav from '../../components/Navbar/StaffNav';

export default function NewProduct() {
  const navigate = useNavigate();
//TODO: add supplier name
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState([]);

  // Subcategories for each category
  const subCategories = {
    Fertilizer: ["Organic", "Chemical", "Compost"],
    Tools: ["Hand Tools", "Land Movers", "Cleaning Tools", "Protective Accessories", "Watering Systems"],
  };

  // Categories with their IDs
  const categories = [
    { id: 1, name: "Fertilizer" },
    { id: 2, name: "Tools" }
  ];

  function sendData(e) {
    e.preventDefault();

    if (isNaN(price) || price <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter valid price",
      });
      return;
    }

    if (isNaN(stock) || stock <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter valid stock quantity",
      });
      return;
    }

    if (productName.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Product name is required",
      });
      return;
    }

    const formData = new FormData();

    formData.append("name", productName);
    formData.append("categoryId", category);  // Pass category ID, not the name
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("image", image);

    axios
      .post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        Swal.fire({
          position: 'top-start',
          icon: 'success',
          title: 'Product added Successfully',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/products");
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: err,
        });
      });
  }

  return (
    <div className="flex flex-col md:flex-row">
      <StaffNav/>
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
              <h1 className="text-2xl font-semibold mb-4 text-center">New Product</h1>

              <div className="mb-4">
                <label htmlFor="name_field" className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  id="name_field"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="brand_field" className="block text-gray-700 font-medium">Brand</label>
                <input
                  type="text"
                  id="brand_field"
                  name="brand"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price_field" className="block text-gray-700 font-medium">Price</label>
                <input
                  type="number"
                  id="price_field"
                  name="price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description_field" className="block text-gray-700 font-medium">Description</label>
                <textarea
                  id="description_field"
                  name="description"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="category_field" className="block text-gray-700 font-medium">Category</label>
                <select
                  id="category_field"
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setCategory(e.target.value)}  // Store the category ID
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {category === "1" && (  // Fertilizer category
                  <div className="mb-4">
                    <label htmlFor="size_field" className="block text-gray-700 font-medium">Size (kg)</label>
                    <input
                      type="number"
                      id="size_field"
                      name="size"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={(e) => setSize(parseFloat(e.target.value))}
                    />
                  </div>
                )}

              {category && (
                <div className="mb-4">
                  <label htmlFor="subCategory_field" className="block text-gray-700 font-medium">SubCategory</label>
                  <select
                    id="subCategory_field"
                    name="subCategory"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) => setSubCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {subCategories[category === "1" ? "Fertilizer" : "Tools"]?.map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="stock_field" className="block text-gray-700 font-medium">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  name="stock"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setStock(parseInt(e.target.value))}
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
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <button
                id="login_button"
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                CREATE
              </button>

              <div>
                <input 
                  className="w-full bg-red-500 text-white mt-2 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                  type="reset" 
                  value="Reset" 
                />
              </div>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
