import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../utils/axios";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";

export default function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("staff");
  const [image, setImage] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: user } = await axios.get(`/api/users/${id}`);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone || "");
        setRole(user.role || "staff");
        setImage(user.image || "");

        // Fetch addresses as an array
        const { data: addresses } = await axios.get(`/api/addresses/user/${id}`);

        if (Array.isArray(addresses) && addresses.length > 0) {
          const address = addresses[0]; // use the first address
          setStreet(address.street || "");
          setCity(address.city || "");
          setDistrict(address.district || "");
          setProvince(address.province || "");
          setZipCode(address.zip_code || "");
        } else {
          // No address found — clear fields
          setStreet("");
          setCity("");
          setDistrict("");
          setProvince("");
          setZipCode("");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load user data", "error");
      }
    };

    fetchUser();
  }, [id]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const isAdmin = role === "admin" ? 1 : 0;

    try {
      await axios.put(`/api/users/${id}`, {
        name,
        email,
        phone,
        role,
        image,
        isAdmin,
      });

      await axios.put(`/api/addresses/user/${id}`, {
        street,
        city,
        district,
        province,
        zip_code: zipCode,
      });

      Swal.fire("Updated", "User updated successfully", "success");
      navigate("/admin/employees");
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Update failed", "error");
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
            <h1 className="text-2xl font-semibold">Update Staff</h1>
            <button
              onClick={() => navigate("/admin/employees")}
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
            >
              Back to List
            </button>
          </div>

          <form
            onSubmit={handleUpdate}
            className="shadow-lg p-6 rounded-lg bg-white w-full max-w-2xl mx-auto"
          >
            <Input label="Name" value={name} onChange={setName} />
            <Input label="Email" value={email} onChange={setEmail} />
            <Input label="Phone" value={phone} onChange={setPhone} />
            <Input label="Street" value={street} onChange={setStreet} />
            <Input label="City" value={city} onChange={setCity} />
            <Input label="District" value={district} onChange={setDistrict} />
            <Input label="Province" value={province} onChange={setProvince} />
            <Input
              label="Zip Code"
              type="number"
              value={zipCode}
              onChange={setZipCode}
            />

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
                Upload Image
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={handleSingleImageUpload}
              />
              {image && (
                <img
                  src={image}
                  alt="User"
                  className="mt-2 w-24 h-24 object-cover rounded-full"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) =>
        onChange(type === "number" ? parseFloat(e.target.value) : e.target.value)
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);
