import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function MockPayHereModal({
  onClose,
  amount,
  cartItems,
  selectedAddressId,
  billingAddressId, 
  paymentMode,
  invoiceEmail, 
  onSuccess,
}) {
  const { user } = useContext(AuthContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const handleMockPayment = () => {
    const trimmedCard = cardNumber.trim().replace(/\s+/g, "");
    const trimmedCvv = cvv.trim();
    const trimmedExpiry = expiryDate.trim();

    // Basic validation
    if (!trimmedCard || !trimmedExpiry || !trimmedCvv) {
      Swal.fire(
        "Missing Fields",
        "Please fill in all card details.",
        "warning"
      );
      return;
    }

    if (!/^\d{12,19}$/.test(trimmedCard)) {
      Swal.fire("Invalid Card", "Card number must be 12-19 digits.", "warning");
      return;
    }

    if (!/^\d{3,4}$/.test(trimmedCvv)) {
      Swal.fire("Invalid CVV", "CVV must be 3 or 4 digits.", "warning");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmedExpiry)) {
      Swal.fire(
        "Invalid Expiry",
        "Expiry date must be in MM/YY format.",
        "warning"
      );
      return;
    }

    // Simulated sandbox card behavior
    const successCards = [
      "4916217501611292",
      "5307732125531191",
      "346781005510225",
    ];
    const declineCards = {
      insufficient: ["4024007194349121", "5459051433777487", "370787711978928"],
      limit: ["4929119799365646", "5491182243178283", "340701811823469"],
      honor: ["4929768900837248", "5388172137367973", "374664175202812"],
      network: ["4024007120869333", "5237980565185003", "373433500205887"],
    };

    if (successCards.includes(trimmedCard)) {
      // Store order data in localStorage
      // Ensure complete data preservation
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          cartItems: cartItems.map((item) => ({
            product_id: item.product_id,
            unit: item.unit,
            price: item.price, // Add original price
            name: item.name, // Preserve for email
          })),
          selectedAddressId,
          billingAddressId,
          paymentMode,
          invoiceEmail,
          userId: user.userId, // Include user ID explicitly
        })
      );
      Swal.fire(
        "Payment Successful!",
        `LKR ${amount} was paid successfully.`,
        "success"
      ).then(() => {
        onClose();
        onSuccess?.();
        navigate("/payment-success");
      });
    } else if (Object.values(declineCards).flat().includes(trimmedCard)) {
      Swal.fire(
        "Payment Failed",
        `Payment was declined due to card issue.`,
        "error"
      ).then(() => {
        navigate("/payment-cancel");
      });
    } else {
      Swal.fire(
        "Invalid Card",
        `Use sandbox test card numbers for testing.`,
        "warning"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">Mock PayHere Payment</h2>

        <label className="block text-sm mb-1">Card Number</label>
        <input
          type="tel"
          inputMode="numeric"
          pattern="\d*"
          maxLength={19}
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Enter sandbox card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, ""))}
        />

        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="block text-sm mb-1">Expiry Date</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">CVV</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={4}
              pattern="\d*"
              className="w-full border px-3 py-2 rounded"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, ""))}
            />
          </div>
        </div>

        <button
          onClick={handleMockPayment}
          className="w-full bg-green-600 text-white py-2 rounded mb-2"
        >
          Pay LKR {amount}
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
