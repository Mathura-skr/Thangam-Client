import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const paginationModel = { page: 0, pageSize: 5 };

export default function SuppliersList() {
    const [suppliers, setSuppliers] = useState([
        { id: 1, pid: "F1001", category: "Fertilizer", products: "Organic Compost, Urea", date: "2024-02-15", mobile: "123-456-7890", address: "123 Greenway St, NY" },
        { id: 2, pid: "T1002", category: "Tools", products: "Shovels, Rakes", date: "2024-01-20", mobile: "987-654-3210", address: "456 Farm Ln, CA" },
        { id: 3, pid: "F1003", category: "Fertilizer", products: "Potash, NPK Mix", date: "2024-03-10", mobile: "456-789-1234", address: "789 Harvest Rd, TX" },
        { id: 4, pid: "T1004", category: "Tools", products: "Pruners, Hoes", date: "2024-02-28", mobile: "321-654-9870", address: "321 Field Ave, FL" },
        { id: 5, pid: "F1005", category: "Fertilizer", products: "Liquid Fertilizer, Bone Meal", date: "2024-01-05", mobile: "654-321-7890", address: "654 Growers St, WA" },
    ]);

    const deleteSupplier = (id) => {
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        toast.success("Supplier deleted successfully!");
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5, headerClassName: "super-app-theme--header" },
        { field: "pid", headerName: "PID", flex: 0.8, headerClassName: "super-app-theme--header" },
        { field: "category", headerName: "Category", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "products", headerName: "Products", flex: 1.5, headerClassName: "super-app-theme--header" },
        { field: "date", headerName: "Date", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "mobile", headerName: "Mobile", flex: 1.2, headerClassName: "super-app-theme--header" },
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
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5">
                <Sidebar />
            </div>
            <div className="flex flex-col md:w-4/5 p-6">
                {/* Header with Add Supplier Button */}
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

                {/* Data Grid */}
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
    );
}
