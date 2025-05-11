import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AdminNav from "../../components/Navbar/AdminNav";
import Sidebar from "./Sidebar";
import axios from "../../utils/axios";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import dayjs from 'dayjs';
import logoImage from "../../assets/images/logo1.png"; 

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('/api/orders/sales');
        setSalesData(res.data);
        setFilteredData(res.data);
        const uniqueCats = [...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCats);
      } catch (error) {
        console.error('Error fetching sales summary:', error);
      }
    };
    fetchSales();
  }, []);

  const handleFilter = () => {
    let data = [...salesData];

    if (selectedCategory !== "All") {
      data = data.filter(item => item.category === selectedCategory);
    }

    if (dateRange.from && dateRange.to) {
      data = data.filter(item => {
        const orderDate = dayjs(item.date); // assuming `date` exists in item
        return orderDate.isAfter(dayjs(dateRange.from).subtract(1, 'day')) &&
               orderDate.isBefore(dayjs(dateRange.to).add(1, 'day'));
      });
    }

    setFilteredData(data);
  };

 const exportPDF = () => {
    const doc = new jsPDF();

    // Add logo (ensure logoImage is base64 or a valid public path)
    const imgWidth = 30;
    const imgHeight = 10;
    doc.addImage(logoImage, 'PNG', 14, 10, imgWidth, imgHeight);

    // Add title next to logo
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(`Sales Report - ${dayjs().format('MMMM D, YYYY')}`, 50, 25);

    // Add contact details below the logo
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("thangamtools@gmail.com", 14, 40);
    doc.text("+94 770 427 773", 14, 45);
    doc.text("No:23, Dockyard Road, Trincomalee", 14, 50);

    // Define columns and rows
    const tableColumn = columns.map(col => col.headerName);
    const tableRows = salesData.map(order =>
        columns.map(col => order[col.field])
    );

    // Add table
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 55,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [34, 197, 94] }, // green header
    });

    doc.save("sales_report.pdf");
};



  const columns = [
    { field: "product_id", headerName: "Product ID", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subCategory", headerName: "SubCategory", flex: 1 },
    { field: "total_units", headerName: "Quantity Sold", type: "number", flex: 1 },
    { field: "total_sales", headerName: "Sales Amount (LKR.)", type: "number", flex: 1 },
  ];

  const productNames = filteredData.map(item => item.product_name);
  const productUnits = filteredData.map(item => Number(item.total_units));
  const productSales = filteredData.map(item => Number(item.total_sales));

  const categoryMap = {};
  filteredData.forEach(item => {
    if (!categoryMap[item.category]) categoryMap[item.category] = { sales: 0 };
    categoryMap[item.category].sales += Number(item.total_sales);
  });

  const subCatMap = {};
  filteredData.forEach(item => {
    if (!subCatMap[item.subCategory]) subCatMap[item.subCategory] = { sales: 0 };
    subCatMap[item.subCategory].sales += Number(item.total_sales);
  });

  const pieChartData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: 'Sales by Category',
        data: Object.values(categoryMap).map(c => c.sales),
        backgroundColor: ['#16a34a', '#2563eb', '#f59e0b', '#dc2626', '#9333ea'],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Units Sold',
        data: productUnits,
        backgroundColor: '#22c55e',
      },
      {
        label: 'Total Sales (LKR.)',
        data: productSales,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 bg-gray-100 border-r">
          <Sidebar />
        </div>
        <div className="w-4/5 p-6 space-y-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sales Report</h1>
            <Button
              variant="contained"
              color="secondary"
              onClick={exportPDF}
              startIcon={<PictureAsPdfIcon />}
            >
              Export to PDF
            </Button>
          </div>

          {/* Filters */}
          {/* <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <Select
                size="small"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
              >
                <MenuItem value="All">All</MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <TextField
                type="date"
                size="small"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <TextField
                type="date"
                size="small"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
            <Button variant="contained" onClick={handleFilter}>Apply</Button>
          </div> */}

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-xl p-3 h-[300px] flex flex-col justify-between">
              <h2 className="text-base font-semibold text-center mb-2 text-green-700">Product Sales</h2>
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="bg-white shadow rounded-xl p-3 h-[300px] flex flex-col justify-between">
              <h2 className="text-base font-semibold text-center mb-2 text-blue-700">Category-wise Sales</h2>
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="bg-white shadow rounded-xl p-3 h-[300px] col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-base font-semibold text-center mb-2 text-purple-700">SubCategory-wise Sales</h2>
              <Bar
                data={{
                  labels: Object.keys(subCatMap),
                  datasets: [{
                    label: 'Sales (LKR.)',
                    data: Object.values(subCatMap).map(c => c.sales),
                    backgroundColor: '#8b5cf6',
                  }]
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow border p-4">
            <DataGrid
              rows={filteredData}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              getRowId={(row) => row.product_id}
              slots={{ toolbar: GridToolbar }}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f3f4f6",
                  color: "blue",
                  fontWeight: "bold",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
