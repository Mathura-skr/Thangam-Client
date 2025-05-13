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

      const { cartItems, selectedAddressId, paymentMode, invoiceEmail,  } = orderData;

      const formattedItems = cartItems.map(item => ({
        product_id: item.product_id,
        unit: item.unit,
        total_price: item.unit * parseFloat(item.price),
      }));

      const calculateTotal = () =>
        cartItems.reduce((sum, item) => sum + item.unit * parseFloat(item.price), 0);

      try {
        // Place order
        // Place order and get response
const orderRes = await axios.post("/api/orders", {
  user_id: user.userId,
  address_id: selectedAddressId,
  cartItems: formattedItems,
  status: "pending",
  paymentMode,
});

// Get the first order ID
const orderId = orderRes.data.orders?.[0]?.id;


        // ✅ Send invoice email
        await axios.post("/api/email/send-invoice", {
          userId: user.userId,
          cartItems,
          billingAddressId: selectedAddressId,
          totalPrice: calculateTotal(),
          invoiceEmail,
          orderId,
        });

        // Clear cart and local storage
        await axios.delete(`/api/cart/user/${user.userId}`);
        localStorage.removeItem("pendingOrder");

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
                navigate("/product");
              });
            }
          },
        });
      } catch (err) {
        console.error("Order placement failed or invoice error:", err);
        Swal.fire("Error", "Something went wrong placing your order.", "error").then(() =>
          navigate("/cart")
        );
      } finally {
        setLoading(false);
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
