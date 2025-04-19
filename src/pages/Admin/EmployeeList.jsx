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
import useFetch from "../../hooks/useFetch";
import axios from "../../utils/axios";

const paginationModel = { page: 0, pageSize: 5 };

export default function EmployeeList() {

  const { data, loading, error, reFetch } = useFetch("/api/users/all");
  const [users, setUsers] = useState([]);
  const [userAddresses, setUserAddresses] = useState({}); //TODO: address

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredUsers = data
        .filter(user => user.role === "staff")
        .map((user, index) => ({
          ...user,
          id: user.id,
          totalOrders: Math.floor(Math.random() * 10), //TODO: Replace with actual orders if available 
        }));
      setUsers(filteredUsers);

      const fetchAddresses = async () => {
        const addressesMap = {};
        for (let user of filteredUsers) {
          try {
            const res = await axios.get(`/api/addresses/user/${user.id}`);
            
            addressesMap[user.id] = res.data; // or res.data[0]?.address if only one
          } catch (err) {
            console.error(`Failed to fetch address for user ${user.id}`);
          }
        }
        setUserAddresses(addressesMap);
      };

      fetchAddresses();
    }
  }, [data]);

  

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("Staff deleted successfully!");
      reFetch();
    } catch (error) {
      toast.error("Failed to delete staff.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "name", headerName: "Name", flex: 1.2, headerClassName: "super-app-theme--header" },
    { field: "phone", headerName: "Mobile", flex: 1.2, headerClassName: "super-app-theme--header" },
    { field: "email", headerName: "Email", flex: 1.5, headerClassName: "super-app-theme--header" },
    {
      field: "addresses",
      headerName: "Addresses",
      flex: 2,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (!params || !params.id) return null;
    
        const userId = params.id;
        const addresses = userAddresses[userId];
    
        if (!addresses || addresses.length === 0) return "No addresses";
    
        return (
          <div className="flex flex-col gap-1 max-h-24 overflow-y-auto text-sm text-gray-700">
            {addresses.map((addr, index) => (
              <div key={index}>
                • {addr.street}, {addr.city}, {addr.district}, {addr.province}, {addr.zip_code}
              </div>
            ))}
          </div>
        );
      },
    },
    
    { field: "role", headerName: "Role", flex: 1, headerClassName: "super-app-theme--header" },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to={`/admin/user/${params.row.id}`}>
            <Button  variant="outlined"
              color="primary"
              size="small"
              sx={{ height: 36, minWidth: 36 }}>
              <EditIcon />
            </Button>
          </Link>
          <Button variant="outlined" color="error" size="small" onClick={() => deleteUser(params.row.id)}
            sx={{ height: 36, minWidth: 36, mt: 1 }}>
            <DeleteIcon />
          </Button>
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
            <h1 className="text-2xl font-bold">Staff List</h1>
            <Link to="/admin/employees/create">
              <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                Add Employee
              </Button>
            </Link>
          </div>
          <Box
            sx={{
              height: "90%",
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
              loading={loading}
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
