import { useEffect, useState } from "react";
import Sidebar from "./StaffSidebar";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import AdminNav from "../../components/Navbar/StaffNav";
import { useNavigate } from "react-router-dom";

export default function AddSupplierStaff() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    category: "",
    brand: "",
    product_name: "",
    quantity: "",
    stock: "",
  });

  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/brands"),
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      phone: formData.mobile,
      address,
      category: formData.category,
      brand: formData.brand,
      product_name: formData.product_name,
      quantity: Number(formData.quantity),
      stock: Number(formData.stock),
    };

    try {
      await axios.post("/api/suppliers", payload);

      Swal.fire({
        icon: "success",
        title: "Supplier saved!",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        mobile: "",
        email: "",
        category: "",
        brand: "",
        product_name: "",
        quantity: "",
        stock: "",
      });
      setAddress("");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to save supplier",
        text: error?.response?.data?.error || "Something went wrong",
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
            <h1 className="text-2xl font-semibold text-center">Add Supplier</h1>
            <button
              onClick={() => navigate("/admin/users")}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            >
              Back to List
            </button>
          </div>

          <form
            onSubmit={submitHandler}
            className="shadow-lg p-6 rounded-lg bg-white w-full max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name, Mobile, Email */}
              {["name", "mobile", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  />
                </div>
              ))}

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                >
                  <option value="">Select</option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                >
                  <option value="">Select</option>
                  {brands.map((brand) => (
                    <option key={brand.id || brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
