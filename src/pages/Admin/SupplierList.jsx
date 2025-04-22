import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const paginationModel = { page: 0, pageSize: 5 };

export default function SuppliersList() {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const res = await axios.get("/api/suppliers");
            const formatted = res.data.map((supplier) => ({
                id: supplier.id,
                pid: `S${supplier.id.toString().padStart(4, "0")}`,
                category: supplier.category || "-", // corrected key
                products: supplier.product_name || "-", // make sure this is the correct field name
                brand: supplier.brand || "-", // ← Add this if you want to show brand
                date: new Date(supplier.created_at || Date.now()).toISOString().split("T")[0],
                phone: supplier.phone || "-",
                address: supplier.address || "-",
            }));
            
            setSuppliers(formatted);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch suppliers.");
        }
    };

    const deleteSupplier = async (id) => {
        try {
            await axios.delete(`/api/suppliers/${id}`);
            setSuppliers((prev) => prev.filter((s) => s.id !== id));
            toast.success("Supplier deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete supplier.");
        }
    };
//TODO: brand
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5, headerClassName: "super-app-theme--header" },
        { field: "pid", headerName: "PID", flex: 0.8, headerClassName: "super-app-theme--header" },
        { field: "category", headerName: "Category", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "brand", headerName: "Brand", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "products", headerName: "Products", flex: 1.5, headerClassName: "super-app-theme--header" },
        { field: "date", headerName: "Date", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "phone", headerName: "Mobile", flex: 1.2, headerClassName: "super-app-theme--header" },
        { field: "address", headerName: "Address", flex: 1.5, headerClassName: "super-app-theme--header" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.2,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, width: "100%" }}>
                    <Box>
                        <Link to={`/admin/supplier/${params.row.id}`}>
                            <Button variant="contained" color="primary" size="small">
                                <EditIcon />
                            </Button>
                        </Link>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => deleteSupplier(params.row.id)}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>
                </Box>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <AdminNav />
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/5 bg-gray-100 h-full border-r">
                    <Sidebar />
                </div>

                <div className="w-4/5 p-6 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Suppliers List</h1>
                        <Link to="/admin/suppliers/create">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                            >
                                Add Supplier
                            </Button>
                        </Link>
                    </div>

                    <Box
                        sx={{
                            height: '90%',
                            width: "100%",
                            "& .super-app-theme--header": {
                                backgroundColor: "rgb(0, 0, 0)",
                                color: "white",
                            },
                        }}
                    >
                        <DataGrid
                            rows={suppliers}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{ border: 1 }}
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
}
