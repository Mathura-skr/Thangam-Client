import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const paginationModel = { page: 0, pageSize: 5 };

export default function UserList() {
    const [users, setUsers] = useState([
        { id: 1, name: "Alice Johnson", phone: "123-456-7890", email: "alice@example.com", totalOrders: 5 },
        { id: 2, name: "Bob Smith", phone: "987-654-3210", email: "bob@example.com", totalOrders: 3 },
        { id: 3, name: "Charlie Brown", phone: "456-789-1234", email: "charlie@example.com", totalOrders: 7 },
        { id: 4, name: "David Wilson", phone: "321-654-9870", email: "david@example.com", totalOrders: 2 },
        { id: 5, name: "Emma Davis", phone: "654-321-7890", email: "emma@example.com", totalOrders: 4 },
    ]);

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
        toast.success("User deleted successfully!");
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "name", headerName: "Name", flex: 1.2, headerClassName: "super-app-theme--header" },
        { field: "phone", headerName: "Mobile", flex: 1.2, headerClassName: "super-app-theme--header" },
        { field: "email", headerName: "Email", flex: 1.5, headerClassName: "super-app-theme--header" },
        { field: "totalOrders", headerName: "Total Orders", type: "number", flex: 1, headerClassName: "super-app-theme--header" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, width: "100%" }}>
                    <Box>
                        <Link to={`/admin/user/${params.row.id}`}>
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
                            onClick={() => deleteUser(params.row.id)}
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
            <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Users List</h1>
                    <Link to="/admin/users/create">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Add user
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
                        rows={users}
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
