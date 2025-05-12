import React, { useState } from "react";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token2 = searchParams.get("token");

  const [loading2, setLoading2] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }

    try {
      setLoading2(true);
      const response = await axios.post("/api/auth/forgot-password", { email });
      setToken(response.data.token);
      Swal.fire("Success", "Password reset link sent to your email", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading2(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!password || password.length < 6) {
      Swal.fire("Weak Password", "Password must be at least 6 characters long", "error");
      return;
    }

    try {
      setLoading2(true);
      const response = await axios.post("/api/auth/reset-password", {
        token: token2,
        password,
      });
      Swal.fire("Success", response.data.message, "success");
      navigate("/login");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 py-12">
      <div className="bg-[#111] shadow-xl rounded-2xl p-10 w-full max-w-lg text-white">
        <h2 className="text-4xl font-bold text-center text-green-500 mb-6">
          {token2 ? "Set New Password" : "Reset Password"}
        </h2>

        {!token2 ? (
          <form onSubmit={handleForgotPassword}>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <button
              type="submit"
              disabled={loading2}
              className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${
                loading2
                  ? "bg-green-800 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {loading2 ? "Sending..." : "Get the Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />

            <button
              type="submit"
              disabled={loading2}
              className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${
                loading2
                  ? "bg-green-800 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {loading2 ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {!token2 && (
          <p className="text-sm text-center mt-6 text-gray-400">
            You'll receive a reset link in your email if the address is valid.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
