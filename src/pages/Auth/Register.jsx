import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";

const Register = () => {
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      Swal.fire("Passwords do not match", "", "error");
      return;
    }

    if (!name || !email || !phone || !password) {
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

    const result = await Swal.fire({
      title: "Do You want to signup with Thangam?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (result.isDenied || result.isDismissed) return;

    setLoading2(true);

    try {
      console.log("Axios baseURL:", axios.defaults.baseURL);

      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        phone,
        password,
      });

      // contextLogin(response.data.user);

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
    <div className="bg-[#F5F5F5]">
      <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col text-center">
        <div className="mb-8 text-center">
          <h2 className="text-5xl font-bold">SIGN UP</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bordder-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bordder-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Mobile"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bordder-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
            />
          </div>
          <div className="mb-6">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bordder-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color focus:ring placeholder-[#ACB6BE] outline-none focus:border-[#41A4FF] focus-visible:shadow-none"
            />
          </div>
          <div className="mb-9">
            <input
              placeholder="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="bordder-[#E9EDF4] w-full text-base rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-body-color focus:ring placeholder-[#ACB6BE] outline-none focus:border-[#41A4FF] focus-visible:shadow-none"
            />
          </div>
          <div className="mb-10">
            <button
              type="submit"
              disabled={loading2}
              className={`w-full font-bold text-center rounded-3xl py-3 px-5 text-white transition hover:bg-opacity-90 ${
                loading2
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-600"
              }`}
            >
              {loading2 ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="flex flex-col justify-center text-center pb-20">
          <p className="text-base text-[#000000]">
            Already have account?
            <Link
              to="/login"
              className="text-grey-500 hover:underline ms-2 font-bold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
