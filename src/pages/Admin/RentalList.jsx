import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const paginationModel = { page: 0, pageSize: 5 };

export default function RentalList() {
    const [rentals, setRentals] = useState([
        { id: 1, pid: "P1001", product: "Shovel", cid: "C001", customerName: "John Doe", date: "2024-03-01", amount: 150 },
        { id: 2, pid: "P1002", product: "Rake", cid: "C002", customerName: "Jane Smith", date: "2024-03-02", amount: 250 },
        { id: 3, pid: "P1003", product: "Pruning Shears", cid: "C003", customerName: "Alice Brown", date: "2024-03-03", amount: 180 },
        { id: 4, pid: "P1004", product: "Garden Hoe", cid: "C004", customerName: "Bob Johnson", date: "2024-03-04", amount: 300 },
        { id: 5, pid: "P1005", product: "Watering Can", cid: "C005", customerName: "Charlie Green", date: "2024-03-05", amount: 200 },
    ]);

    const handleAction = (id, action) => {
        toast.success(`Rental ${id} ${action}`);
    };

    const columns = [
        { field: "id", headerName: "Rid", flex: 0.5, headerClassName: "super-app-theme--header" },
        { field: "pid", headerName: "Pid", flex: 0.8, headerClassName: "super-app-theme--header" },
        { field: "product", headerName: "Product", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "cid", headerName: "Cid", flex: 0.8, headerClassName: "super-app-theme--header" },
        { field: "customerName", headerName: "Customer Name", flex: 1.2, headerClassName: "super-app-theme--header" },
        { field: "date", headerName: "Date", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "amount", headerName: "Amount ($)", flex: 1, headerClassName: "super-app-theme--header" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, width: "100%" }}>
                    <Button variant="contained" color="success" size="small" onClick={() => handleAction(params.row.id, "Approved")}>
                        Approve
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleAction(params.row.id, "Rejected")}>
                        Reject
                    </Button>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleAction(params.row.id, "Returned")}>
                        Return
                    </Button>
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
                <h1 className="text-2xl font-bold mb-4">Rental List</h1>
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
                        rows={rentals}
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