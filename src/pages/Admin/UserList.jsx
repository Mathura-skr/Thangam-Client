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
//TODO: order history when user clicked ord det btn
export default function UserList() {
  console.log("Token:", localStorage.getItem("token"));

  const { data, loading, error, reFetch } = useFetch("/api/users/all");
  const [users, setUsers] = useState([]);
  const [userAddresses, setUserAddresses] = useState({});

  useEffect(() => {
    const fetchUsersWithOrders = async () => {
      if (data && Array.isArray(data)) {
        const filteredUsers = await Promise.all(
          data
            .filter((user) => user.role === "user")
            .map(async (user) => {
              let totalOrders = 0;
              try {
                const res = await axios.get(`/api/orders/user/${user.id}`); // get order details for user
                totalOrders = Array.isArray(res.data) ? res.data.length : 0;
              } catch (err) {
                console.error(`Failed to fetch orders for user ${user.id}`);
              }
              return {
                ...user,
                id: user.id,
                totalOrders,
              };
            })
        );
        setUsers(filteredUsers);

        // Fetch addresses for each user
        const fetchAddresses = async () => {
          const addressesMap = {};
          for (let user of filteredUsers) {
            try {
              const res = await axios.get(`/api/addresses/user/${user.id}`);
              addressesMap[user.id] = res.data;
            } catch (err) {
              console.error(`Failed to fetch address for user ${user.id}`);
            }
          }
          setUserAddresses(addressesMap);
        };
        fetchAddresses();
      }
    };
    fetchUsersWithOrders();
  }, [data]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("User deleted successfully!");
      reFetch();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone",
      headerName: "Mobile",
      flex: 1.2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      headerClassName: "super-app-theme--header",
    },
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
    {
      field: "totalOrders",
      headerName: "Total Orders",
      type: "number",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1.5,
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (params) => (
    //     <Box sx={{ display: "flex", gap: 1 }}>
    //       <Link to={`/admin/user/${params.row.id}`}>
    //         <Button
    //           variant="outlined"
    //           color="primary"
    //           size="small"
    //           sx={{ height: 36, minWidth: 36 }}
    //         >
    //           <EditIcon />
    //         </Button>
    //       </Link>
    //       <Button
    //         variant="outlined"
    //         color="error"
    //         size="small"
    //         onClick={() => deleteUser(params.row.id)}
    //         sx={{ height: 36, minWidth: 36, mt: 1 }}
    //       >
    //         <DeleteIcon />
    //       </Button>
    //     </Box>
    //   ),
    // },
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
            <h1 className="text-2xl font-bold">Customer List</h1>
            {/* <Link to="/admin/users/create">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add user
              </Button>
            </Link> */}
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
