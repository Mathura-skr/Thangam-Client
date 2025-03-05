import { Fragment, useState } from "react";
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

export default function ProductList() {

    const [products, setProducts] = useState([
        { id: 1, name: "Snow", price: 35, stock: 10 },
        { id: 2, name: "Lannister", price: 42, stock: 5 },
        { id: 3, name: "Lannister", price: 45, stock: 8 },
        { id: 4, name: "Stark", price: 16, stock: 20 },
        { id: 5, name: "Targaryen", price: null, stock: 12 },
        { id: 6, name: "Melisandre", price: 150, stock: 3 },
        { id: 7, name: "Clifford", price: 44, stock: 7 },
        { id: 8, name: "Frances", price: 36, stock: 6 },
        { id: 9, name: "Roxie", price: 65, stock: 4 },
    ]);


    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted successfully!");
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "name", headerName: "Product Name", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "category", headerName: "Category", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "price", headerName: "Price", type: "number", flex: 1, headerClassName: "super-app-theme--header" },
        { field: "stock", headerName: "Stock", type: "number", flex: 1, headerClassName: "super-app-theme--header" },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/product/${params.row.id}`} className="mr-2">
                        <Button variant="contained" color="primary" size="small">
                            <EditIcon />

                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteProduct(params.row.id)}
                    >
                        <DeleteIcon />
                    </Button>
                </Fragment>
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
                    <h1 className="text-2xl font-bold">Product List</h1>
                    <Link to="/admin/products/create">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        
                    >
                        Add Product
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
                        rows={products}
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
