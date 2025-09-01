import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    doctors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/dashboardStats", {
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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-6">
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">${stats.earnings}</p>
        <p className="text-gray-500">Earnings</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">{stats.appointments}</p>
        <p className="text-gray-500">Appointments</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">{stats.patients}</p>
        <p className="text-gray-500">Patients</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">{stats.doctors}</p>
        <p className="text-gray-500">Doctors</p>
      </div>
    </div>
  );
}
