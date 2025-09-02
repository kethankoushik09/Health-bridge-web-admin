import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

    const isAdminLogin = useSelector((state) => state.admin.isLogin);
  const isDoctorLogin = useSelector((state) => state.doctor.isLogin);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url="";
        if(isAdminLogin){
          url=BASE_URL + "/api/admin/appointments";
        }else if(isDoctorLogin){
          url=BASE_URL + "/api/doctor/appointments";
        }
        const response = await axios.get(url, {
          withCredentials: true,
        });

        if (response.data.success) {
          setAppointments(response.data.appointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p className="text-center">Loading appointments...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-2">Patient</th>
              <th className="border border-gray-300 px-3 py-2">Doctor</th>
              <th className="border border-gray-300 px-3 py-2">Date</th>
              <th className="border border-gray-300 px-3 py-2">Time</th>
              <th className="border border-gray-300 px-3 py-2">Payment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-3 py-2">
                  {appt.userData?.name}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {appt.docData?.name}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {appt.slotDate.slice(0, 10)}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {appt.slotTime}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {appt.payment || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
