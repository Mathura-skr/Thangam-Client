import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";
import { toast } from "react-toastify";

const paginationModel = { page: 0, pageSize: 5 };

export default function EmployeeList() {
    const [employees, setEmployees] = useState([
        { id: 1, name: "Alice Johnson", phone: "123-456-7890", email: "alice@example.com", address: "123 Main St, NY", },
        { id: 2, name: "Bob Smith", phone: "987-654-3210", email: "bob@example.com", address: "456 Elm St, CA", },
        { id: 3, name: "Charlie Brown", phone: "456-789-1234", email: "charlie@example.com", address: "789 Pine St, TX", },
        { id: 4, name: "David Wilson", phone: "321-654-9870", email: "david@example.com", address: "321 Oak St, FL", },
        { id: 5, name: "Emma Davis", phone: "654-321-7890", email: "emma@example.com", address: "654 Cedar St, WA", },
    ]);

    const deleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
        toast.success("Employee deleted successfully!");
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.8, headerClassName: "super-app-theme--header" },
        { field: "name", headerName: "Name", flex: 1.2, headerClassName: "super-app-theme--header" },
        { field: "phone", headerName: "Mobile", flex: 1.2, headerClassName: "super-app-theme--header" },
        { field: "email", headerName: "Email", flex: 1.5, headerClassName: "super-app-theme--header" },
        { field: "address", headerName: "Address", flex: 1.5, headerClassName: "super-app-theme--header" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1.5,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, width: "100%" }}>
                    <Box>
                        <Link to={`/admin/employee/${params.row.id}`}>
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
                            onClick={() => deleteEmployee(params.row.id)}
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
            <div className="flex flex-col md:w-4/5 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Employee List</h1>   
                    {/* TODO: update emp & others */}
                    <Link to="/admin/employees/create">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                        >
                            Add Employee
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
                        rows={employees}
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
