import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import useFetch from "../../hooks/useFetch";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddressManager() {
  const { user } = useContext(AuthContext);
  const {
    data: addresses = [],
    loading,
    error,
    setData: setAddresses,
  } = useFetch(user?.userId ? `/api/addresses/user/${user.userId}` : null);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    district: "",
    province: "",
    zip_code: "",
    address_type: "delivery",
  });

  const [editingId, setEditingId] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});

  const isNewAddressValid = Object.entries(newAddress)
    .filter(([key]) => key !== "address_type")
    .every(([, val]) => val.trim() !== "");

  const isEditedAddressValid = Object.entries(editedAddress)
    .filter(([key]) => key !== "address_type")
    .every(([, val]) => val.trim() !== "");

  const billingExists = addresses.some((a) => a.address_type === "billing");

  const isZipCodeValid = (zip) => /^\d+$/.test(zip);

  const handleAdd = async () => {
    if (!isZipCodeValid(newAddress.zip_code)) {
      Swal.fire("Error", "Zip code must be numeric only.", "error");
      return;
    }
    if (newAddress.address_type === "billing" && billingExists) {
      // Convert the existing billing address to delivery before adding new billing address
      const currentBilling = addresses.find((a) => a.address_type === "billing");
      if (currentBilling) {
        try {
          await axios.put(`/api/addresses/${currentBilling.id}`, {
            ...currentBilling,
            address_type: "delivery",
          });
          setAddresses((prev) =>
            prev.map((addr) =>
              addr.id === currentBilling.id ? { ...currentBilling, address_type: "delivery" } : addr
            )
          );
        } catch (err) {
          console.error("Error updating previous billing address:", err);
          Swal.fire("Error", "Failed to update previous billing address", "error");
          return;
        }
      }
    }

    try {
      const res = await axios.post("/api/addresses", {
        ...newAddress,
        user_id: user.userId,
      });

      setAddresses((prev) => [...prev, res.data]);
      setNewAddress({
        street: "",
        city: "",
        district: "",
        province: "",
        zip_code: "",
        address_type: "delivery",
      });
      Swal.fire("Success", "Address added successfully", "success");
    } catch (err) {
      console.error("Add address error:", err);
      Swal.fire("Error", "Failed to add address", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This address will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/addresses/${id}`);
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        Swal.fire("Deleted!", "Address has been removed.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete address", "error");
      }
    }
  };

  const handleEdit = (addr) => {
    setEditingId(addr.id);
    setEditedAddress(addr);
  };

  const handleSaveEdit = async () => {
    if (!isZipCodeValid(editedAddress.zip_code)) {
      Swal.fire("Error", "Zip code must be numeric only.", "error");
      return;
    }
    if (
      editedAddress.address_type === "billing" &&
      billingExists &&
      addresses.find((a) => a.id !== editingId && a.address_type === "billing")
    ) {
      Swal.fire("Error", "Only one billing address is allowed.", "error");
      return;
    }

    try {
      const res = await axios.put(`/api/addresses/${editingId}`, editedAddress);
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingId ? res.data : addr))
      );
      setEditingId(null);
      setEditedAddress({});
      Swal.fire("Success", "Address updated successfully", "success");
    } catch (err) {
      console.error("Edit address error:", err);
      Swal.fire("Error", "Failed to update address", "error");
    }
  };

  if (loading) return <div>Loading addresses...</div>;

  if (
    error?.response?.status === 404 &&
    error.response.data?.message === "No addresses found for this user"
  ) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
        <p className="text-gray-500 mb-4">
          No addresses found. Add your first one below.
        </p>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Add New Address</h3>
          {Object.entries(newAddress).map(([key, value]) =>
            key === "address_type" ? (
              <select
                key={key}
                className="input w-full border p-2 rounded-md"
                value={value}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address_type: e.target.value })
                }
              >
                <option value="delivery">Delivery</option>
                <option value="billing" disabled={billingExists}>
                  Billing
                </option>
              </select>
            ) : (
              <input
                key={key}
                placeholder={key.replace("_", " ")}
                className="input w-full border p-2 rounded-md"
                value={value}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, [key]: e.target.value })
                }
              />
            )
          )}
          <button
            className={`bg-black text-white px-4 py-2 rounded mt-2 ${
              !isNewAddressValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAdd}
            disabled={!isNewAddressValid}
          >
            Add Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">My Addresses</h2>

      {addresses.length === 0 ? (
        <p className="text-gray-500 mb-4">
          No addresses found. Add your first one below.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {addresses.map((addr) => (
            <div key={addr.id} className="border rounded-lg p-4 space-y-2">
              {editingId === addr.id ? (
                <>
                  {Object.entries(editedAddress).map(([key, value]) =>
                    key === "id" || key === "user_id" ? null : key ===
                      "address_type" ? (
                      <select
                        key={key}
                        className="input w-full border p-2 rounded-md"
                        value={value}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            address_type: e.target.value,
                          })
                        }
                      >
                        <option value="delivery">Delivery</option>
                        <option
                          value="billing"
                          disabled={billingExists && addresses.find((a) => a.id !== editingId && a.address_type === "billing")}
                        >
                          Billing
                        </option>
                      </select>
                    ) : (
                      <input
                        key={key}
                        placeholder={key.replace("_", " ")}
                        className="input w-full border p-2 rounded-md"
                        value={value}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            [key]: e.target.value,
                          })
                        }
                      />
                    )
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className={`bg-green-600 text-white px-3 py-1 rounded ${
                        !isEditedAddressValid ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!isEditedAddressValid}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    {addr.street}, {addr.city}
                  </p>
                  <p>
                    {addr.district}, {addr.province}, {addr.zip_code}
                  </p>
                  <p className="text-sm italic text-gray-500">
                    Type:{" "}
                    {addr.address_type
                      ? addr.address_type.charAt(0).toUpperCase() +
                        addr.address_type.slice(1)
                      : "N/A"}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {/* <button
                      onClick={() => handleEdit(addr)}
                      className="flex items-center outline outline-2 outline-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500"
                    >
                      <EditIcon className="mr-2" />
                    </button> */}
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="flex items-center outline outline-2 outline-red-500 text-red-500 px-3 py-1 rounded hover:bg-opacity-50"
                    >
                      <DeleteIcon className="mr-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Add New Address</h3>
        {Object.entries(newAddress).map(([key, value]) =>
          key === "address_type" ? (
            <select
              key={key}
              className="input w-full border p-2 rounded-md"
              value={value}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address_type: e.target.value })
              }
            >
              <option value="delivery">Delivery</option>
              <option value="billing" disabled={billingExists}>
                Billing
              </option>
            </select>
          ) : (
            <input
              key={key}
              placeholder={key.replace("_", " ")}
              className="input w-full border p-2 rounded-md"
              value={value}
              onChange={(e) =>
                setNewAddress({ ...newAddress, [key]: e.target.value })
              }
            />
          )
        )}
        <button
          className={`bg-black text-white px-4 py-2 rounded mt-2 ${
            !isNewAddressValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAdd}
          disabled={!isNewAddressValid}
        >
          Add Address
        </button>
      </div>
    </div>
  );
}
