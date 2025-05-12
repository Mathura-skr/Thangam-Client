import { useEffect, useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { AuthContext } from "../../context/authContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processOrder = async () => {
      const orderData = JSON.parse(localStorage.getItem("pendingOrder"));

      if (!user || !orderData || !orderData.cartItems || orderData.cartItems.length === 0) {
        Swal.fire("Error", "Missing user or order data.", "error").then(() => {
          navigate("/cart");
        });
        return;
      }

      const { cartItems, selectedAddressId, paymentMode } = orderData;

      try {
        // Loop through each cart item and place an order
        for (const item of cartItems) {
          await axios.post("/api/orders", {
            user_id: user.userId,
            product_id: item.id,
            address_id: selectedAddressId,
            unit: item.unit,
            total_price: item.unit * parseFloat(item.price),
            status: "pending",
            paymentMode,
          });
        }

        // Clear cart after order
        await axios.delete(`/api/cart/user/${user.userId}`);
        localStorage.removeItem("pendingOrder");

        Swal.fire("Payment Successful!", "Your order has been placed.", "success").then(() =>
          navigate("/")
        );
      } catch (err) {
        console.error("Order placement failed:", err);
        Swal.fire("Error", "Something went wrong placing your order.", "error").then(() =>
          navigate("/cart")
        );
      } finally {
        setLoading(false); // Set loading to false after processing
      }
    };

    processOrder();
  }, [navigate, user]);

  return (
    <div className="text-center mt-10">
      {loading ? (
        <div className="text-green-600 text-xl">Processing your order...</div>
      ) : (
        <div className="text-green-600 text-xl">Order processed. Redirecting...</div>
      )}
    </div>
  );
}
