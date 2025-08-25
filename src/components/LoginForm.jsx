import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAdmin } from "../Redux/Reducers/AdminReducer";
import Lottie from "lottie-react";
import doctorAnimation from "../assets/adminLoading.json"; // 👈 your Lottie file

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, SetAdmin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (admin) {
        const res = await axios.post(
          BASE_URL + "/api/admin/logIn",
          { email, password },
          { withCredentials: true }
        );

        dispatch(setAdmin());

        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            setLoading(false);
            window.location.href = "/";
          }, 2500);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-blue-100 to-white-100">
      {/* LOADING SCREEN */}
      {loading && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
          <Lottie
            animationData={doctorAnimation}
            loop={true}
            className="w-72 h-72"
          />
          <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
            Please wait, redirecting to Dashboard...
          </p>
        </div>
      )}

      {/* LOGIN FORM */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {admin ? "Admin" : "Doctor"} <span className="text-black">Login</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          {admin ? "Doctor" : "Admin"} Login?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => SetAdmin((prev) => !prev)}
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
}
