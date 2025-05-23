import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import AdminNav from "../../components/Navbar/AdminNav";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [image, setImage] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

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
    if (url) setImage(url);
  };

  // Email and password validation helpers
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
   const validatePassword = (password) => {
  return /^.{8,}$/.test(password);
};

  const sendData = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Name, email, and password are required.",
      });
    }
    if (!validateEmail(email)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
    }
    if (!validatePassword(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.",
      });
    }

    const isAdmin = role === "admin" ? 1 : 0;

    try {
      const { data: user } = await axios.post("/api/users", {
        name,
        email,
        phone,
        password,
        role,
        image,
        isAdmin,
      });

      // Save address separately
      await axios.post("/api/addresses", {
        user_id: user.userId,
        street,
        city,
        district,
        province,
        zip_code: zipCode,
      });

      Swal.fire({
        icon: "success",
        title: "Staff Added",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/admin/employees");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.response?.data?.message || err.message,
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
            <h1 className="text-2xl font-semibold">Add New Employee</h1>
            <button
              onClick={() => navigate("/admin/employees")}
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
            <Input label="Name" onChange={setName} />
            <Input label="Email" onChange={setEmail} />
            <Input label="Phone" onChange={setPhone} />
            <Input label="Street" onChange={setStreet} />
            <Input label="City" onChange={setCity} />
            <Input label="District" onChange={setDistrict} />
            <Input label="Province" onChange={setProvince} />
            <Input label="Zip Code" type="number" onChange={setZipCode} />
            <Input label="Password" type="password" onChange={setPassword} />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Role</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Upload Image (Optional)
              </label>
              <input
                type="file"
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

const Input = ({ label, type = "text", onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) =>
        onChange(
          type === "number" ? parseFloat(e.target.value) : e.target.value
        )
      }
    />
  </div>
);
