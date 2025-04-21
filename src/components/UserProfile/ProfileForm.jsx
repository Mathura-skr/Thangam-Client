// ProfileForm.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import useFetch from "../../hooks/useFetch";
import Swal from "sweetalert2";

export default function ProfileForm() {
  const { user } = useContext(AuthContext);
  const { data: users = [], loading, error } = useFetch("/api/users/all");
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image_url, setImageURL] = useState("");
  const [preview, setPreview] = useState("/default-avatar.png");

  useEffect(() => {
    if (users.length && user?.userId) {
      const currentUser = users.find((u) => u.id === user.userId);
      if (currentUser) {
        setUserId(currentUser.id);
        setName(currentUser.name);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);

        if (currentUser.image_url) {
          const imageUrl = currentUser.image_url.startsWith("http")
            ? currentUser.image_url
            : `/uploads/${currentUser.image_url}`;
          setImageURL(currentUser.image_url);
          setPreview(imageUrl);
        }
      }
    }
  }, [users, user]);

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
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const url = await handleImageUpload(file);
    if (url) setImageURL(url);
  };

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    const updateData = { name, email, phone, image_url };
    if (password) updateData.password = password;

    try {
      await axios.put(`/api/users/${userId}`, updateData);
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Failed to load profile.</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">My Profile</h1>

        <div className="flex items-center gap-4">
          <img
            src={preview}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <label className="bg-black text-white px-4 py-2 rounded-md cursor-pointer hover:bg-opacity-70">
            Change Profile Picture
            <input type="file" onChange={handleSingleImageUpload} hidden />
          </label>
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
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
  );
}
