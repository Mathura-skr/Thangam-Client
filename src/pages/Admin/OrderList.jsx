import { Fragment, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Sidebar from "./Sidebar";
import AdminNav from "../../components/Navbar/AdminNav";
import { toast } from "react-toastify";

const paginationModel = { page: 0, pageSize: 5 };

export default function OrderList() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Alice Johnson",
      totalAmount: 120,
      status: "Pending",
    },
    { id: 2, customerName: "Bob Smith", totalAmount: 75, status: "Shipped" },
    {
      id: 3,
      customerName: "Charlie Brown",
      totalAmount: 200,
      status: "Pending",
    },
    {
      id: 4,
      customerName: "David Wilson",
      totalAmount: 50,
      status: "Processing",
    },
    { id: 5, customerName: "Emma Davis", totalAmount: 90, status: "Shipped" },
  ]);

  // Delete Order
  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    toast.success("Order deleted successfully!");
  };

  // Mark Order as Shipped
  const markAsShipped = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Shipped" } : order
      )
    );
    toast.info("Order marked as shipped!");
  };

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount ($)",
      type: "number",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Shipped"
              ? "success"
              : params.value === "Processing"
              ? "warning"
              : "default"
          }
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {params.row.status !== "Shipped" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => markAsShipped(params.row.id)}
            >
              <LocalShippingIcon />
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => deleteOrder(params.row.id)}
          >
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
          <h1 className="text-2xl font-bold my-4">Order List</h1>
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
              rows={orders}
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
