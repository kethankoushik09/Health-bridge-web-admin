import { useState, useEffect } from "react";
import { LogOut, Menu } from "lucide-react"; // lucide icons
import logo from "../assets/logo.jpg";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeAdmin } from "../Redux/Reducers/AdminReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { removeDoctor } from "../Redux/Reducers/DoctorReducer";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [docImage, setDocImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdminLogin = useSelector((state) => state.admin.isLogin);
  const isDoctorLogin = useSelector((state) => state.doctor.isLogin);

  useEffect(() => {
    if (isDoctorLogin) {
      // Fetch doctor profile image
      const fetchDoctorImage = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/doctor/profile`, {
            withCredentials: true,
          });
          if (res.data.success) {
            setDocImage(res.data.profile.image);
          }
        } catch (error) {
          console.error("Error fetching doctor image:", error);
        }
      };
      fetchDoctorImage();
    }
  }, [isDoctorLogin]);

  async function handleLogout() {
    try {
      let url = "";
      if (isAdminLogin) {
        url = BASE_URL + "/api/admin/logOut";
      } else if (isDoctorLogin) {
        url = BASE_URL + "/api/doctor/logOut";
      }
      const res = await axios.post(url, {}, { withCredentials: true });
      if (res.data.success) {
        if (isAdminLogin) dispatch(removeAdmin());
        if (isDoctorLogin) dispatch(removeDoctor());
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3 relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10 h-8 rounded" />
        <h1 className="text-lg font-bold text-blue-600">KS Wellness</h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        
        {/* Logout */}
        <button
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg border border-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={22} />
        </button>
        {/* Doctor Profile Icon (only if doctor is logged in) */}
        {isDoctorLogin && docImage && (
          <img
            src={docImage}
            alt="Doctor Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-500"
            onClick={() => navigate("/profile")}
          />
        )}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-46 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 md:hidden z-50">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <i className="bi bi-house text-xl text-black" /> Dashboard
          </NavLink>

          <NavLink
            to="/appointments"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <i className="bi bi-calendar text-xl text-black" /> Appointments
          </NavLink>

          {isAdminLogin && (
            <NavLink
              to="/add-doctor"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <i className="bi bi-person-plus-fill text-xl text-black" /> Add
              Doctor
            </NavLink>
          )}

          {isAdminLogin && (
            <NavLink
              to="/doctors-list"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-black"
            >
              <i className="bi bi-people text-xl text-black" /> Doctors List
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
