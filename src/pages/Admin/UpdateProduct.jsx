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
  const [manufacturedDate, setManufacturedDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [image_url, setImageURL] = useState([]);

  const [suppliers, setSuppliers] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [brandNames, setBrandNames] = useState([]);

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
        setManufacturedDate(data.manufactured_date || "");
        setExpiryDate(data.expiry_date || "");

        setImageURL(data.image_url ? [data.image_url] : []);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    }

    async function fetchSuppliers() {
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
    }

    fetchProduct();
    fetchSuppliers();
  }, [id]);

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

  async function sendData(e) {
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
      image_url,
    };

    // Only add dates for Fertilizer category
    if (category === "Fertilizer") {
      payload.quantity = parseFloat(quantity);
      payload.expiry_date = expiryDate;
      payload.manufactured_date = manufacturedDate;
    }

    console.log("Payload to be sent:", payload);

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

              <Input
                label="Name"
                value={productName}
                onChange={setProductName}
              />
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
              <Input label="Price" type="number" value={price} onChange={setPrice} />
              <textarea
                className="description-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  whiteSpace: "pre-wrap",
                  minHeight: "100px",
                  border: "1px solid #ccc",
                  padding: "8px",
                  width: "100%",
                  fontFamily: "inherit",
                }}
              />

              <div className="mb-4">
                <label htmlFor="category_field" className="block text-gray-700 font-medium">
                  Category
                </label>
                <select
                  id="category_field"
                  name="category"
                  value={category}
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
                  <label
                    htmlFor="subCategory_field"
                    className="block text-gray-700 font-medium"
                  >
                    SubCategory
                  </label>
                  <select
                    id="subCategory_field"
                    name="subCategory"
                    value={subCategory}
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

              <Input label="Stock" type="number" value={stock} onChange={setStock} />

              <label htmlFor="product_images" className="block text-gray-700 font-medium">
                Upload image
              </label>
              <input
                type="file"
                name="product_images"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                id="customFile"
                multiple
                onChange={handleSingleImageUpload}
              />

              {image_url.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-700 font-medium mb-2">Current Image:</p>
                  <img
                    src={image_url[0]}
                    alt="Product"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}

              <button
                id="login_button"
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-400 transition duration-200 mt-4"
              >
                UPDATE
              </button>

              <input
                type="reset"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-400 transition duration-200 mt-4"
              />
            </form>
          </div>
        </Fragment>
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
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);
