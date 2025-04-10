import axios from "../../utils/axios"; 
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [loading2, setLoading2] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    if (!credentials.email || !credentials.password) {
      Swal.fire("Please enter your email and password", "", "error");
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      Swal.fire("Please enter a valid email address", "", "error");
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
  
  
      if (isAdmin === 1) {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        navigate("/");
      } else if (role === "staff") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    } catch (err) {
      setLoading2(false);
  
      if (err.response) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        Swal.fire(err.response.data.message || err.response.data, "", "error");
      } else {
        console.error("Error without response:", err);
        Swal.fire("An error occurred. Please try again later.", "", "error");
      }
    }
  };
  
  

  return (
    <div className="bg-[#F5F5F5] ">
      <div className="py-32 lg:py-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto mt-[-5rem] max-w-[525px] overflow-hidden bg-transparent py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <h2 className="text-5xl font-bold">LOGIN</h2>
                </div>
                <form>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      className="border-gray-500 w-full rounded-3xl focus:ring border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-[#41A4FF] focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-9">
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      className="border-gray-500 w-full rounded-3xl border focus:ring bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-[#41A4FF] focus-visible:shadow-none"
                    />
                  </div>
                  <div className="mb-10">
                    <button
                      disabled={loading2}
                      onClick={handleClick}
                      className="w-full cursor-pointer rounded-3xl font-bold bg-gray-800 text-center hover:bg-gray-600 py-3 px-5 text-white transition hover:bg-opacity-90"
                    >
                      {loading2 ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                </form>

                <Link
                  to="/resetPassword"
                  className="mb-2 inline-block text-base text-red-500 font-semibold cursor-pointer hover:text-primary hover:underline"
                >
                  Forget Password?
                </Link>
                <p className="text-base text-[#000000]">
                  Not a member yet?
                  <Link
                    to="/register"
                    className=" cursor-pointer hover:underline ms-2 font-bold text-gray-700"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
