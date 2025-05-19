import axios from "../../utils/axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../../assets/images/logo1.png";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading2, setLoading2] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      backgroundColor: "#facc15",
      color: "#000000",
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    tap: { scale: 0.98 },
    loading: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5
      }
    }
  };

  const logoVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 10,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.8
      }
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    if (!credentials.email || !credentials.password) {
      return Swal.fire("Please enter your email and password", "", "error");
    }

    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      return Swal.fire("Please enter a valid email address", "", "error");
    }

    if (credentials.password.length < 6) {
      return Swal.fire("Password must be at least 6 characters long", "", "error");
    }

    try {
      setLoading2(true);
      const res = await axios.post("/api/auth/signin", credentials, {
        withCredentials: true,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.result });
      const { token } = res.data;
      localStorage.setItem("token", token);
      setLoading2(false);

      const { isAdmin, role } = res.data.result;
      if (isAdmin === 1) navigate("/admin/dashboard");
      else if (role === "user") navigate("/");
      else if (role === "staff") navigate("/staff/dashboard");
      else navigate("/");
    } catch (err) {
      setLoading2(false);
      if (err.response) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        Swal.fire(err.response.data.message || err.response.data, "", "error");
      } else {
        Swal.fire("An error occurred. Please try again later.", "", "error");
      }
    }
  };

  const isEmailValid = /\S+@\S+\.\S+/.test(credentials.email);
  const isPasswordValid = credentials.password.length >= 6;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black overflow-hidden">
      {/* Left Column - Brand & Animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 12,
          delay: 0.1
        }}
        className="lg:w-1/2 w-full flex items-center justify-center bg-green-900 text-white p-6 relative"
      >
        <motion.div
          className="absolute inset-0 bg-green-800/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="w-full max-w-md flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            className="z-50 max-w-full h-auto"
            src={logo1}
            alt="Company Logo"
            variants={logoVariants}
            whileHover="hover"
          />

          <motion.div
            className="w-full h-1 bg-green-400 mt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Right Column - Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 12,
          delay: 0.4
        }}
        className="lg:w-1/2 w-full flex items-center justify-center px-6 py-16"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/black-paper.png')",
        }}
      >
        <motion.div
          className="w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-black/50 via-green-900/40 to-black/50 rounded-2xl shadow-2xl p-8 border border-green-700 border-opacity-40"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-green-400"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Sign In
          </motion.h2>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-6" variants={itemVariants}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="w-full border border-green-600 rounded-xl px-4 py-3 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </motion.div>
            <motion.div className="mb-6" variants={itemVariants}>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="w-full border border-green-600 rounded-xl px-4 py-3 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </motion.div>
            <motion.div className="mb-6" variants={itemVariants}>
              <motion.button
                disabled={loading2 || !isEmailValid || !isPasswordValid}
                onClick={handleClick}
                className="w-full bg-black text-green-300 font-semibold py-3 rounded-xl"
                variants={buttonVariants}
                initial="initial"
                whileHover={loading2 ? "" : "hover"}
                whileTap={loading2 ? "" : "tap"}
                animate={loading2 ? "loading" : "initial"}
              >
                {loading2 ? "Signing In..." : "Sign In"}
              </motion.button>
            </motion.div>
          </motion.form>

          <AnimatePresence>
            <motion.div
              className="text-center mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <Link
                to="/reset-Password"
                className="text-sm text-green-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </motion.div>
            <motion.p
              className="text-center text-sm text-green-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Not a member?
              <Link
                to="/register"
                className="ml-1 font-semibold hover:underline text-green-500"
              >
                Sign Up
              </Link>
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
