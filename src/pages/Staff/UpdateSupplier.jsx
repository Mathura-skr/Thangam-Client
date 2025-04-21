import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "./StaffSidebar";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import AdminNav from "../../components/Navbar/StaffNav";

export default function UpdateSupplierStaff() {
    const { id } = useParams();
    const [supplier, setSupplier] = useState({
        name: "",
        phone: "",
        address: "",
        category: "",
        product_name: "",
        brand: "",
        quantity: "",
        stock: "",
    });

    // Fetch supplier data on mount
    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const { data } = await axios.get(`/api/suppliers/${id}`);
                // Optional: console.log(data) to check structure
                setSupplier({
                    name: data.name || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    category: data.category || "",
                    product_name: data.product_name || "",
                    brand: data.brand || "",
                    quantity: data.quantity || "",
                    stock: data.stock || "",
                });
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch supplier data");
            }
        };

        fetchSupplier();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/suppliers/${id}`, supplier);
            toast.success("Supplier updated successfully!");
        } catch (error) {
            toast.error("Error updating supplier");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/5 bg-gray-800 text-white p-4">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 flex justify-center items-center p-4">
                <Fragment>
                    <div className="w-full max-w-lg bg-white shadow-lg p-6 rounded-lg">
                        <form onSubmit={submitHandler} className="space-y-4">
                            <h1 className="text-2xl font-bold text-gray-800 text-center">Update Supplier</h1>

                            {[
                                { id: "name", label: "Name" },
                                { id: "phone", label: "Phone" },
                                { id: "address", label: "Address" },
                                { id: "category", label: "Category" },
                                { id: "product_name", label: "Product Name" },
                                { id: "brand", label: "Brand" },
                                { id: "quantity", label: "Quantity", type: "number" },
                                { id: "stock", label: "Stock", type: "number" },
                            ].map(({ id, label, type = "text" }) => (
                                <div key={id}>
                                    <label htmlFor={`${id}_field`} className="block text-gray-700">{label}</label>
                                    <input
                                        type={type}
                                        id={`${id}_field`}
                                        name={id}
                                        value={supplier[id]}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-yellow-500"
                                    />
                                </div>
                            ))}

                            <button
                                id="update_button"
                                type="submit"
                                className="w-full bg-black hover:bg-opacity-50 text-white py-2 rounded-md font-semibold"
                            >
                                UPDATE
                            </button>
                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
