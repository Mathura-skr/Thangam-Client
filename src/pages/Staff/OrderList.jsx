import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Sidebar from "./StaffSidebar";
import AdminNav from "../../components/Navbar/StaffNav";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const paginationModel = { page: 0, pageSize: 5 };

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

 const fetchOrders = async () => {
  try {
    const res = await axios.get("/api/orders");
    const formatted = res.data.orders.map((order) => {
      

      return {
        id: order.id,
        customerId: order.user_id,
        productId: order.product_id,
        unit: order.unit,
        totalAmount: order.total_price,
        status: order.status,
        paymentMode: order.paymentMode,
        address: order.address || "No delivery address found"
      };
    });
    setOrders(formatted);
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch orders.");
  }
};

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`); // if you implement this route
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast.success("Order deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order.");
    }
  };

  const markAsShipped = async (id) => {
    try {
      const res = await axios.put(`/api/orders/${id}`, { status: "Shipped" });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: res.data.status } : order
        )
      );
      toast.info("Order marked as shipped!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/orders/${id}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      toast.success(`Order marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    }
  };
  
  // Add cancelOrderHandler function
  const cancelOrderHandler = async (id) => {
    try {
      await axios.patch(`/api/orders/cancel/${id}`);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: "Cancelled" } : order
        )
      );
      toast.success("Order cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order.");
    }
  };

  const columns = [
    { field: "id", headerName: "Order ID", flex: 0.7, headerClassName: "super-app-theme--header" },
    { field: "customerId", headerName: "Customer ID", flex: 0.7, headerClassName: "super-app-theme--header" },
    { field: "productId", headerName: "Product ID", flex: 0.7, headerClassName: "super-app-theme--header" },
    { field: "unit", headerName: "Qty", flex: 0.5, headerClassName: "super-app-theme--header" },
    { field: "totalAmount", headerName: "Total (Rs)", flex: 0.8, headerClassName: "super-app-theme--header" },
    { field: "paymentMode", headerName: "Payment", flex: 0.8, headerClassName: "super-app-theme--header" },
    { field: "address", headerName: "Delivery Address", flex: 1.8, headerClassName: "super-app-theme--header" },
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
              : params.value === "Completed"
              ? "primary"
              : "default"
          }
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "super-app-theme--header" ,
      renderCell: (params) => {
        const { status, id } = params.row;

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            {status !== "Shipped" && status !== "Completed" && status !== "Cancelled" && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => updateOrderStatus(id, "Shipped")}
              >
                <LocalShippingIcon sx={{ color: "white" }} />
              </Button>
            )}

            {status === "Shipped" && (
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => updateOrderStatus(id, "Completed")}
              >
                <TaskAltIcon/>
              </Button>
            )}

            {status !== "Completed" && status !== "Cancelled" && (
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => cancelOrderHandler(id)}
              >
                Cancel
              </Button>
            )}
          </Box>
        );
      },
    }
    
,
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
