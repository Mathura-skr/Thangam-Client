import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";


//TODO: to be finish
export const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch user from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
    fetchAddresses(user._id);
  }, []);

  const fetchAddresses = async (userId) => {
    try {
      const res = await axios.get(`/api/addresses/user/${userId}`);
      setAddresses(res.data);
    } catch (error) {
      toast.error("Failed to load addresses");
    }
  };

  const handleAddAddress = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/addresses", {
        ...data,
        user_id: userInfo._id,
      });
      setAddresses((prev) => [...prev, res.data]);
      toast.success("Address added");
      setAddAddress(false);
      reset();
    } catch (error) {
      toast.error("Failed to add address");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
      <div className="w-full max-w-4xl mt-10 bg-white shadow rounded-xl p-6 space-y-6">
        {/* User Details */}
        <div className="bg-blue-100 text-blue-700 p-6 rounded-md text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-300 flex items-center justify-center text-white text-2xl">
            {userInfo?.name?.[0] || "U"}
          </div>
          <p className="font-semibold">{userInfo?.name}</p>
          <p className="text-sm">{userInfo?.email}</p>
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Manage Addresses</h2>
            <button
              onClick={() => setAddAddress(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* Address Form */}
          {addAddress && (
            <form
              onSubmit={handleSubmit(handleAddAddress)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm mb-1">Type</label>
                <input
                  type="text"
                  {...register("type", { required: true })}
                  className="w-full border p-2 rounded"
                  placeholder="Eg. Home, Business"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Street</label>
                <input
                  type="text"
                  {...register("street", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Postal Code</label>
                <input
                  type="number"
                  {...register("postalCode", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Country</label>
                <input
                  type="text"
                  {...register("country", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="number"
                  {...register("phoneNumber", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">State</label>
                <input
                  type="text"
                  {...register("state", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">City</label>
                <input
                  type="text"
                  {...register("city", { required: true })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setAddAddress(false)}
                  className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Display addresses */}
          <div className="space-y-3">
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="border p-4 rounded bg-gray-50 shadow-sm"
                >
                  <p>
                    <strong>Type:</strong> {addr.type}
                  </p>
                  <p>
                    <strong>Street:</strong> {addr.street}
                  </p>
                  <p>
                    <strong>City:</strong> {addr.city}
                  </p>
                  <p>
                    <strong>State:</strong> {addr.state}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {addr.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {addr.country}
                  </p>
                  <p>
                    <strong>Phone:</strong> {addr.phoneNumber}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                You have no added addresses
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
