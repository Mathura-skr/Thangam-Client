import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire("Payment Canceled", "You canceled the payment.", "error").then(() =>
      navigate("/checkout")
    );
  }, []);

  return <div className="text-center mt-10 text-red-600 text-xl">Payment Canceled.</div>;
}
