import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";


export default function DashboardCards() {
  const [stats, setStats] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    doctors: 0,
  });

  const isAdminLogin = useSelector((state) => state.admin.isLogin);
  const isDoctorLogin = useSelector((state) => state.doctor.isLogin);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let url = "";
        if (isAdminLogin) {
          url = BASE_URL+"api/admin/dashboardStats";
        } else if (isDoctorLogin) {
          url = BASE_URL+"api/doctor/dashboardStats";
        }

        const res = await axios.get(url, {
          withCredentials: true, // if protected route
        });
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

   // Dynamic grid cols
  const gridCols = isAdminLogin ? "lg:grid-cols-3 md:grid-cols-1" : "lg:grid-cols-2 md:grid-cols-1";
  return (
    <div className={`grid ${gridCols} gap-6 my-6 px-28`}>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">{stats.appointments}</p>
        <p className="text-gray-500">Appointments</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">{stats.patients}</p>
        <p className="text-gray-500">Patients</p>
      </div>
      {isAdminLogin && (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-xl font-bold">{stats.doctors}</p>
          <p className="text-gray-500">Doctors</p>
        </div>
      )}
    </div>
  );
}
