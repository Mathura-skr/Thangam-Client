import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";
import Swal from "sweetalert2";
import useFetch from "../../hooks/useFetch"; // Import your custom hook

export default function AdminSettings() {
  const [adminId, setAdminId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image_url, setImageURL] = useState("");
  const [preview, setPreview] = useState("/default-avatar.png");

  // Use your custom hook to fetch admin data
  const { data: users, loading, error } = useFetch("/api/users/all");

  useEffect(() => {
    if (users && users.length > 0) {
      const adminUser = users.find((user) => user.role === "admin");
      if (adminUser) {
        setAdminId(adminUser.id);
        setName(adminUser.name);
        setEmail(adminUser.email);
        setPhone(adminUser.phone);
        
        // Set profile picture
        if (adminUser.image_url) {
          // Check if it's already a full URL or needs prefix
          const imageUrl = adminUser.image_url.startsWith('http') 
            ? adminUser.image_url 
            : `/uploads/${adminUser.image_url}`;
          setImageURL(adminUser.image_url);
          setPreview(imageUrl);
        }
      }
    }
  }, [users]); // This effect runs when users data changes

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
    
    // Create instant preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const url = await handleImageUpload(file);
      if (url) {
        setImageURL(url);
        // Optionally update preview to final URL
        // setPreview(url);
      }
    } catch (err) {
      setPreview("/default-avatar.png");
      console.error("Upload failed:", err);
    }
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }

    const updateData = {
      name,
      email,
      phone,
      role: "admin",
      isAdmin: 1,
      image_url,
    };

    if (password) {
      updateData.password = password;
    }

    try {
      await axios.put(`/api/users/${adminId}`, updateData);
      Swal.fire({
        icon: "success",
        title: "Admin updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading admin data</div>;

  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/5 bg-gray-800 text-white p-4">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5 flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 text-center">
                Admin Settings
              </h1>

              {/* Profile Picture Upload */}
              <div className="flex items-center gap-4">
                <img
                  src={preview}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <label className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-70">
                  Change Profile Picture
                  <input
                    type="file"
                    onChange={handleSingleImageUpload}
                    hidden
                  />
                </label>
              </div>

              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-opacity-50 text-white py-2 rounded-md font-semibold"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
