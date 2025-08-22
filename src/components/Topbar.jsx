import { LogOut } from "lucide-react"; // icon library (lucide-react is lightweight)
import logo from "../assets/logo.jpg";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeAdmin } from "../store/Reducers.js/AdminReducer";

export default function Topbar() {
  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      const res = await axios.post(
        BASE_URL + "/api/admin/logOut",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(removeAdmin());
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10 h-8 rounded" />
        <h1 className="text-lg font-bold text-blue-600">Wellness</h1>
      </div>

      {/* Logout */}
      <button
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
