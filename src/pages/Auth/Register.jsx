import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../../assets/images/logo1.png";

const Register = () => {
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      backgroundColor: "#facc15",
      color: "#000000",
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.98 },
    loading: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
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
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.8 },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !repeatPassword) {
      Swal.fire("Please fill all fields", "", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire("Please enter a valid email address", "", "error");
      return;
    }
    if (phone.length !== 10) {
      Swal.fire("Enter a valid 10-digit phone number", "", "error");
      return;
    }
    if (password.length <= 6) {
      Swal.fire("Password must be at least 6 characters", "", "error");
      return;
    }
    if (password !== repeatPassword) {
      Swal.fire("Passwords do not match", "", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Do you want to sign up with Thangam?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes, Sign Up",
      denyButtonText: `Cancel`,
    });

    if (result.isDenied || result.isDismissed) return;

    setLoading2(true);

    try {
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        phone,
        password,
      });

      Swal.fire("Registered Successfully!", "", "success");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire("User already exists", "", "error");
      } else {
        Swal.fire("Something went wrong", err.message, "error");
      }
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black overflow-hidden">
      {/* Left Column - Brand */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 12,
          delay: 0.1,
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

      {/* Right Column - Register Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 12,
          delay: 0.2,
        }}
        className="lg:w-1/2 w-full flex items-center justify-center px-6 py-16"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/black-paper.png')",
        }}
      >
        <motion.div
          className="w-full max-w-md backdrop-blur-xl bg-gradient-to-br from-black/50 via-green-900/40 to-black/50 rounded-2xl shadow-2xl p-8 border border-green-700 border-opacity-40"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-green-400"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Create Account
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[["Name", name, setName], ["Email", email, setEmail], ["Mobile", phone, setPhone], ["Password", password, setPassword, "password"], ["Repeat Password", repeatPassword, setRepeatPassword, "password"]].map(([placeholder, value, setFunc, type = "text"], idx) => (
              <motion.div className="mb-6" variants={itemVariants} key={placeholder}>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setFunc(e.target.value)}
                  className="w-full border border-green-600 rounded-xl px-4 py-3 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </motion.div>
            ))}

            <motion.div className="mb-6" variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading2}
                className="w-full bg-black text-green-300 font-semibold py-3 rounded-xl"
                variants={buttonVariants}
                initial="initial"
                whileHover={loading2 ? "" : "hover"}
                whileTap={loading2 ? "" : "tap"}
                animate={loading2 ? "loading" : "initial"}
              >
                {loading2 ? "Signing Up..." : "Sign Up"}
              </motion.button>
            </motion.div>
          </motion.form>

          <AnimatePresence>
            <motion.p
              className="text-center text-sm text-green-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Already have an account?
              <Link
                to="/login"
                className="ml-1 font-semibold hover:underline text-green-500"
              >
                Sign In
              </Link>
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
