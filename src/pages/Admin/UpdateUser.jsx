import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";
import Swal from "sweetalert2";

export default function UpdateUser() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${id}`);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setPhone(data.phone);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error loading user",
          text: err.response?.data?.message || err.message,
        });
      }
    };

    fetchUser();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/users/${id}`, { name, email,phone, role });
      Swal.fire({
        icon: "success",
        title: "User updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/admin/users");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/5 bg-gray-800 text-white p-4">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5 flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
            <form onSubmit={submitHandler} className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Update User
              </h1>

              <div>
                <label htmlFor="name_field" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="email_field" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="phone_field" className="block text-gray-700">
                Phone
                </label>
                <input
                  type="text"
                  id="phone_field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="role_field" className="block text-gray-700">
                  Role
                </label>
                <select
                  id="role_field"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-opacity-50 text-white py-2 rounded-md font-semibold"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
