import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import AdminNav from "../../components/Navbar/StaffNav";
import Sidebar from "./StaffSidebar";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [quarterlyTotal, setQuarterlyTotal] = useState(0);
  const [annualTotal, setAnnualTotal] = useState(0);
  const [monthlySalesTrend, setMonthlySalesTrend] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [subcategorySummary, setSubcategorySummary] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("/api/orders/sales");
        const data = res.data;
        setSalesData(data);
        processSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSales();
  }, []);

  const processSalesData = (data) => {
    const dataWithDates = data.map((item, i) => ({
      ...item,
      date: dayjs().subtract(i % 12, "month").format("YYYY-MM-DD"),
    }));

    calculateSummaries(dataWithDates);
    calculateMonthlyTrend(dataWithDates);
    generateCategorySummary(dataWithDates);
    generateSubcategorySummary(dataWithDates);
    generateTopProducts(dataWithDates);
  };

  const calculateSummaries = (data) => {
    let monthly = 0, quarterly = 0, annual = 0;
    const now = dayjs();

    data.forEach((item) => {
      const sales = Number(item.total_sales) || 0;
      const date = dayjs(item.date);

      if (now.diff(date, "month") < 1) monthly += sales;
      if (now.diff(date, "month") < 3) quarterly += sales;
      if (now.diff(date, "year") < 1) annual += sales;
    });

    setMonthlyTotal(monthly);
    setQuarterlyTotal(quarterly);
    setAnnualTotal(annual);
  };

  const calculateMonthlyTrend = (data) => {
    const map = {};

    data.forEach(item => {
      const month = dayjs(item.date).format("MMMM");
      if (!map[month]) map[month] = 0;
      map[month] += Number(item.total_sales) || 0;
    });

    const trend = Object.entries(map).map(([month, total_sales]) => ({
      month,
      total_sales,
    }));

    setMonthlySalesTrend(trend);
  };

  const generateCategorySummary = (data) => {
    const map = {};
    data.forEach(item => {
      const key = item.category;
      if (!map[key]) map[key] = { category: key, total_sales: 0, total_units: 0 };
      map[key].total_sales += Number(item.total_sales);
      map[key].total_units += Number(item.total_units);
    });
    setCategorySummary(Object.values(map));
  };

  const generateSubcategorySummary = (data) => {
    const map = {};
    data.forEach(item => {
      const key = item.subCategory;
      if (!map[key]) map[key] = { subCategory: key, total_sales: 0, total_units: 0 };
      map[key].total_sales += Number(item.total_sales);
      map[key].total_units += Number(item.total_units);
    });
    setSubcategorySummary(Object.values(map));
  };

  const generateTopProducts = (data) => {
    const sorted = [...data].sort((a, b) => b.total_units - a.total_units).slice(0, 5);
    setTopProducts(sorted);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = `${window.location.origin}/logo1.png`;

    logo.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.addImage(logo, "PNG", 10, 10, 30, 10);
      doc.setFontSize(18);
      doc.text("Sales Report", pageWidth / 2, 20, { align: "center" });
      doc.setFontSize(10);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 50, 10);

      const contact = [
        "        thangamtools@gmail.com",
        "        +94 770 427 773",
        "        No:23, Dockyard Road, Trincomalee"
      ];
      contact.forEach((line, i) => doc.text(line, pageWidth - 80, 15 + (i + 1) * 5));

      let y = 50;

      doc.setFontSize(14);
      doc.text("Detailed Sales", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["Product", "Category", "SubCategory", "Units", "Total Sales"]],
        body: salesData.map(item => [
          item.product_name,
          item.category,
          item.subCategory,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`
        ])
      });

      y = doc.lastAutoTable.finalY + 10;
      doc.text("Sales by Category", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["Category", "Units", "Total Sales"]],
        body: categorySummary.map(item => [
          item.category,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`
        ])
      });

      y = doc.lastAutoTable.finalY + 10;
      doc.text("Sales by SubCategory", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["SubCategory", "Units", "Total Sales"]],
        body: subcategorySummary.map(item => [
          item.subCategory,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`
        ])
      });

      y = doc.lastAutoTable.finalY + 10;
      doc.text("Top Selling Products", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["Product", "Category", "SubCategory", "Units", "Total Sales"]],
        body: topProducts.map(item => [
          item.product_name,
          item.category,
          item.subCategory,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`
        ])
      });

      doc.save("sales_report.pdf");
    };
  };

  const columns = [
    { field: "product_name", headerName: "Product", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subCategory", headerName: "SubCategory", flex: 1 },
    { field: "total_units", headerName: "Units Sold", flex: 1 },
    {
      field: "total_sales",
      headerName: "Total Sales (LKR)",
      flex: 1,
      valueFormatter: (params) => {
  const value = Number(params.value);
  return isNaN(value) ? "LKR 0.00" : `LKR ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/5 border-r bg-gray-100">
          <Sidebar />
        </div>
        <div className="w-4/5 p-6 overflow-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sales Report</h1>
            <Button variant="contained" color="secondary" onClick={exportPDF} startIcon={<PictureAsPdfIcon />}>
              Export to PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-600">This Month</h2>
              <p className="text-xl font-bold text-green-700">LKR {monthlyTotal.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-600">This Quarter</h2>
              <p className="text-xl font-bold text-blue-700">LKR {quarterlyTotal.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-600">This Year</h2>
              <p className="text-xl font-bold text-purple-700">LKR {annualTotal.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySalesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `LKR ${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Detailed Sales</h2>
            <DataGrid
              autoHeight
              rows={salesData}
              columns={columns}
              getRowId={(row) => row.product_id}
              pageSize={5}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <DataGrid
              autoHeight
              rows={categorySummary}
              columns={[
                { field: "category", headerName: "Category", flex: 1 },
                { field: "total_units", headerName: "Units Sold", flex: 1 },
                {
                  field: "total_sales",
                  headerName: "Total Sales (LKR)",
                  flex: 1,
                  valueFormatter: (params) => {
  const value = Number(params.value);
  return isNaN(value) ? "LKR 0.00" : `LKR ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

                },
              ]}
              getRowId={(row) => row.category}
              pageSize={5}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Sales by SubCategory</h2>
            <DataGrid
              autoHeight
              rows={subcategorySummary}
              columns={[
                { field: "subCategory", headerName: "SubCategory", flex: 1 },
                { field: "total_units", headerName: "Units Sold", flex: 1 },
                {
                  field: "total_sales",
                  headerName: "Total Sales (LKR)",
                  flex: 1,
                  valueFormatter: (params) => {
  const value = Number(params.value);
  return isNaN(value) ? "LKR 0.00" : `LKR ${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

                },
              ]}
              getRowId={(row) => row.subCategory}
              pageSize={5}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
            <DataGrid
              autoHeight
              rows={topProducts}
              columns={columns}
              getRowId={(row) => row.product_id}
              pageSize={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
