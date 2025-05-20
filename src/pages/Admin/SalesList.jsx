import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AdminNav from "../../components/Navbar/AdminNav";
import Sidebar from "../Admin/Sidebar";
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
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [quarterlySummary, setQuarterlySummary] = useState([]);
  const [annualSummary, setAnnualSummary] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Product summary (for tables)
        const salesRes = await axios.get("/api/orders/sales");
        setSalesData(salesRes.data);
        processSalesData(salesRes.data);

        // Monthly summary (for chart and monthly total)
        const monthlyRes = await axios.get("/api/orders/summary/monthly");
        setMonthlySummary(monthlyRes.data);

        // Quarterly summary (for quarterly total)
        const quarterlyRes = await axios.get("/api/orders/summary/quarterly");
        setQuarterlySummary(quarterlyRes.data);

        // Annual summary (for annual total)
        const annualRes = await axios.get("/api/orders/summary/annual");
        setAnnualSummary(annualRes.data);

        // Set totals
        setMonthlyTotal(monthlyRes.data[0]?.total_sales || 0);
        setQuarterlyTotal(quarterlyRes.data[0]?.total_sales || 0);
        setAnnualTotal(annualRes.data[0]?.total_sales || 0);

        // Set monthly trend for chart (reverse for chronological order)
        setMonthlySalesTrend(
          monthlyRes.data
            .slice()
            .reverse()
            .map((row) => ({
              month: row.month,
              total_sales: Number(row.total_sales) || 0,
            }))
        );
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchAll();
  }, []);

  // Add currency formatter utility at top
  const formatLKR = (value) => {
    const numericValue = Number(value) || 0;
    return `LKR ${numericValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Remove fake date logic and time-based calculations from processSalesData
  const processSalesData = (data) => {
    const sanitizedData = data.map((item) => ({
      ...item,
      total_sales: Number(item.total_sales) || 0,
      total_units: Number(item.total_units) || 0,
    }));
    generateCategorySummary(sanitizedData);
    generateSubcategorySummary(sanitizedData);
    generateTopProducts(sanitizedData);
  };

  const generateCategorySummary = (data) => {
    const map = {};
    data.forEach((item) => {
      const key = item.category;
      if (!map[key])
        map[key] = { category: key, total_sales: 0, total_units: 0 };
      map[key].total_sales += Number(item.total_sales);
      map[key].total_units += Number(item.total_units);
    });
    setCategorySummary(Object.values(map));
  };

  const generateSubcategorySummary = (data) => {
    const map = {};
    data.forEach((item) => {
      const key = item.subCategory;
      if (!map[key])
        map[key] = { subCategory: key, total_sales: 0, total_units: 0 };
      map[key].total_sales += Number(item.total_sales);
      map[key].total_units += Number(item.total_units);
    });
    setSubcategorySummary(Object.values(map));
  };

  const generateTopProducts = (data) => {
    const sorted = [...data]
      .sort((a, b) => b.total_units - a.total_units)
      .slice(0, 5);
    setTopProducts(sorted);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = `${window.location.origin}/logo1.png`;

    logo.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.addImage(logo, "PNG", 10, 10, 30, 10);
      // Set contact info below logo, left-aligned, with spacing
      const contact = [
        "thangamtools@gmail.com",
        "+94 770 427 773",
        "No:23, Dockyard Road",
        "Trincomalee",
      ];
      let contactY = 25; // Start just below the logo
      doc.setFontSize(10);
      contact.forEach((line, i) => {
        doc.text(line, 10, contactY + i * 6); // 6pt vertical spacing
      });
      // Move y below contact info for the rest of the content
      let y = contactY + contact.length * 6 + 10;
      doc.setFontSize(18);
      doc.text("Sales Report", pageWidth / 2, 20, { align: "center" });
      doc.setFontSize(10);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 50, 10);

      

      // Use 'y' for the first table header
      doc.setFontSize(14);
      doc.text("Detailed Sales", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["Product", "Category", "SubCategory", "Units", "Total Sales"]],
        body: salesData.map((item) => [
          item.product_name,
          item.category,
          item.subCategory,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`,
        ]),
      });

      y = doc.lastAutoTable.finalY + 10;
      doc.text("Sales by Category", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["Category", "Units", "Total Sales"]],
        body: categorySummary.map((item) => [
          item.category,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`,
        ]),
      });

      y = doc.lastAutoTable.finalY + 10;
      doc.text("Sales by SubCategory", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["SubCategory", "Units", "Total Sales"]],
        body: subcategorySummary.map((item) => [
          item.subCategory,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`,
        ]),
      });

      y = doc.lastAutoTable.finalY + 10;
      doc.text("Top Selling Products", 14, y);
      autoTable(doc, {
        startY: y + 5,
        head: [["Product", "Category", "SubCategory", "Units", "Total Sales"]],
        body: topProducts.map((item) => [
          item.product_name,
          item.category,
          item.subCategory,
          item.total_units,
          `LKR ${Number(item.total_sales).toLocaleString()}`,
        ]),
      });

      doc.save("sales_report.pdf");
    };
  };

  // Updated columns configuration
  const columns = [
    { field: "product_name", headerName: "Product", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subCategory", headerName: "SubCategory", flex: 1 },
    {
      field: "total_units",
      headerName: "Units Sold",
      flex: 1,
      valueGetter: (value) => value?.toLocaleString() || "0",
    },
    {
      field: "total_sales",
      headerName: "Total Sales (LKR)",
      flex: 1,
      valueGetter: (value) => formatLKR(value),
    },
  ];

  // Utility to format month labels (e.g., '2025-01' to 'Jan 2025')
  const formatMonthLabel = (monthStr) => {
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

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
            <Button
              variant="contained"
              color="secondary"
              onClick={exportPDF}
              startIcon={<PictureAsPdfIcon />}
            >
              Export to PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-600">This Month</h2>
              <p className="text-xl font-bold text-green-700">
                LKR {monthlyTotal.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-600">This Quarter</h2>
              <p className="text-xl font-bold text-blue-700">
                LKR {quarterlyTotal.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <h2 className="text-sm text-gray-600">This Year</h2>
              <p className="text-xl font-bold text-purple-700">
                LKR {annualTotal.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={Array.isArray(monthlySalesTrend) && monthlySalesTrend.length > 0 ? monthlySalesTrend.slice().sort((a, b) => {
                  if (a.month && b.month && a.month.length === 7 && b.month.length === 7) {
                    return a.month.localeCompare(b.month);
                  }
                  return 0;
                }) : [{ month: '', total_sales: 0 }]}
                margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonthLabel}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={60}
                  minTickGap={10}
                />
                <YAxis
                  tickFormatter={(value) => `LKR ${Number(value).toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) => `LKR ${Number(value).toLocaleString()}`}
                  labelFormatter={formatMonthLabel}
                />
                <Line type="monotone" dataKey="total_sales" stroke="#82ca9d" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} isAnimationActive={false} />
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
                  valueGetter: (value) => {
                    return isNaN(value)
                      ? "LKR 0.00"
                      : `LKR ${value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`;
                  },
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
                  valueGetter: (value) => {
                    return isNaN(value)
                      ? "LKR 0.00"
                      : `LKR ${value.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`;
                  },
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
