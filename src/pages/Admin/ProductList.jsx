import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import axios from "../../utils/axios";
import AdminNav from "../../components/Navbar/AdminNav";

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data); 
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "name", headerName: "Product Name", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "category", headerName: "Category", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "subCategory", headerName: "SubCategory", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "price", headerName: "Price", type: "number", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "quantity", headerName: "Quantity(Kg)", type: "number", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "stock", headerName: "Stock", type: "number", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "brand", headerName: "Brand", flex: 1, headerClassName: "super-app-theme--header" },
    { field: "supplier", headerName: "Supplier", flex: 1, headerClassName: "super-app-theme--header" },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Link to={`/admin/product/${params.row.id}`}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ height: 36, minWidth: 36 }}
            >
              <EditIcon fontSize="small" />
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => deleteProduct(params.row.id)}
            sx={{ height: 36, minWidth: 36, mt: 1 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      ),
    }
    
    
  ];

  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 bg-gray-100 h-full border-r">
          <Sidebar />
        </div>

       
        <div className="w-4/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Product List</h1>
            <Link to="/admin/products/create">
              <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                Add Product
              </Button>
            </Link>
          </div>

          <Box
            sx={{
              height: 500,
              width: "100%",
              "& .super-app-theme--header": {
                backgroundColor: "rgb(0, 0, 0)",
                color: "white",
              },
            }}
          >
            <DataGrid
              rows={products}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 1 }}
              slots={{ toolbar: GridToolbar }}
              getRowId={(row) => row.id}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
