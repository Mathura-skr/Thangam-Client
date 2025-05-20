import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import Navigation from "../../components/Navbar/Navigation";
import { Typography, Card, CardContent, Button } from "@mui/material";
import MockPayHereModal from "../Payment/MockPayHereModal";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem || null;
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [paymentMode, setPaymentMode] = useState("COD");
  const [cartItems, setCartItems] = useState(buyNowItem ? [buyNowItem] : []);
  const [invoiceEmail, setInvoiceEmail] = useState(user?.email || "");
  const [showMockModal, setShowMockModal] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`/api/addresses/user/${user?.userId}`);
        setAddresses(res.data);
        if (res.data.length > 0) {
          setSelectedAddressId(res.data[0].id);
          setBillingAddressId(res.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    const fetchCartItems = async () => {
      if (buyNowItem) return;
      try {
        const res = await axios.get(`/api/cart/user/${user?.userId}`);
        setCartItems(res.data);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    if (user?.userId) {
      fetchAddresses();
      fetchCartItems();
    }
  }, [user, buyNowItem]);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price || 0);
      return acc + item.unit * price;
    }, 0);
  };

  const handleCheckout = async () => {
    if (paymentMode === "Card") {
      setShowMockModal(true);
      return;
    }

    if (!selectedAddressId || !billingAddressId || !invoiceEmail) {
      Swal.fire({
        icon: "warning",
        title: "Missing Info",
        text: "Please fill out all required fields (shipping, billing, email).",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Order",
      text: "Are you sure you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Place Order",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const item of cartItems) {
            await axios.post("/api/orders", {
              user_id: user.userId,
              address_id: selectedAddressId,
              billing_address_id: billingAddressId,
              cartItems: cartItems.map((item) => ({
                product_id: item.product_id, // Changed from item.id
                unit: item.unit,
                total_price: item.unit * parseFloat(item.price),
              })),
              status: "pending",
              paymentMode,
            });
          }

          if (!buyNowItem) {
            await axios.delete(`/api/cart/user/${user.userId}`);
          }

          await axios.post("/api/email/send-invoice", {
            userId: user.userId,
            cartItems,
            billingAddressId,
            totalPrice: calculateTotal(),
            invoiceEmail,
          });

          Swal.fire({
            icon: "success",
            title: "🎉 Order Placed Successfully!",
            html: `
              <p>Thank you for your purchase. You’ll receive a detailed invoice at <strong>${invoiceEmail}</strong>.</p>
              <br/>
              <button id="continue-shopping" class="swal2-confirm swal2-styled" style="background-color: #3085d6;">
                Continue Shopping
              </button>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              const btn = document.getElementById("continue-shopping");
              if (btn) {
                btn.addEventListener("click", () => {
                  Swal.close();
                  window.location.href = "/";
                });
              }
            },
          });
        } catch (err) {
          console.error("Error placing order:", err);
          Swal.fire({
            icon: "error",
            title: "Checkout Failed",
            text: "There was an error processing your order. Please try again.",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <Typography variant="h6" className="mb-2">
              Shipping Address
            </Typography>
            <select
              className="w-full border rounded p-2"
              value={selectedAddressId || ""}
              onChange={(e) => setSelectedAddressId(Number(e.target.value))}
            >
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.street}, {addr.city}, {addr.district}, {addr.province},{" "}
                  {addr.zip_code} ({addr.address_type})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <Typography variant="h6" className="mb-2">
              Billing Address
            </Typography>
            <select
              className="w-full border rounded p-2"
              value={billingAddressId || ""}
              onChange={(e) => setBillingAddressId(Number(e.target.value))}
            >
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.street}, {addr.city}, {addr.district}, {addr.province},{" "}
                  {addr.zip_code} ({addr.address_type})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <Typography variant="h6" className="mb-2">
              Invoice Email
            </Typography>
            <input
              type="email"
              placeholder="example@email.com"
              value={invoiceEmail}
              onChange={(e) => setInvoiceEmail(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <Typography variant="h6" className="mb-2">
              Payment Mode
            </Typography>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  paymentMode === "COD"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMode("COD")}
              >
                Cash on Delivery
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  paymentMode === "Card"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMode("Card")}
              >
                Pay by Card
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow p-5">
            <Typography variant="h6" className="mb-4">
              Order Summary
            </Typography>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="mb-3 border border-gray-200 shadow-none"
              >
                <CardContent className="flex justify-between items-center">
                  <div>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2">Qty: {item.unit}</Typography>
                  </div>
                  <Typography variant="body2">
                    LKR.{(item.unit * parseFloat(item.price || 0)).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <div className="mt-4 flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span>LKR.{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
            className="rounded p-3 text-white font-semibold"
          >
            Place Order
          </Button>
        </div>
      </div>

      {showMockModal && (
        <MockPayHereModal
          amount={calculateTotal()}
          onClose={() => setShowMockModal(false)}
          cartItems={cartItems}
          selectedAddressId={selectedAddressId}
          billingAddressId={billingAddressId}
          paymentMode={paymentMode}
          invoiceEmail={invoiceEmail}
        />
      )}
    </div>
  );
};

export default Checkout;
