import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function LatestBookings() {
  const [bookings, setBookings] = useState([]);

  const isAdminLogin = useSelector((state) => state.admin.isLogin);
  const isDoctorLogin = useSelector((state) => state.doctor.isLogin);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let url = "";
        if (isAdminLogin) {
          url = "http://localhost:4000/api/admin/latestBookings";
        } else if (isDoctorLogin) {
          url = "http://localhost:4000/api/doctor/latestBookings";
        }
        const res = await axios.get(url, {
          withCredentials: true,
        });
        if (res.data.success) {
          setBookings(res.data.latest);
        }
      } catch (err) {
        console.error("Error fetching latest bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  // 🟢 Helper to determine status
  const getStatus = (b) => {
    if (b.cancelled) return { text: "Cancelled", color: "text-red-500" };

    const appointmentDateTime = new Date(`${b.slotDate} ${b.slotTime}`);
    // ⏱ Add 30 minutes grace period
    const completedThreshold = new Date(
      appointmentDateTime.getTime() + 30 * 60000
    );
    const now = new Date();

    if (completedThreshold < now) {
      return { text: "Completed", color: "text-green-600" }; // ✅ past & not cancelled
    }

    return { text: "Scheduled", color: "text-yellow-600" };
  };

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto bg-white shadow rounded-lg p-6 sm:mt-10">
      <h3 className="text-lg font-semibold mb-4">
        <i className="bi bi-card-checklist px-2 text-blue-800 text-2xl"></i>
        Latest Bookings
      </h3>
      <hr />
      {bookings.length === 0 ? (
        <p className="text-gray-500 mt-3">No recent bookings found.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b, i) => {
            const status = getStatus(b); //  use helper
            return (
              <li key={i} className="flex justify-between items-center pb-2">
                <div>
                  <p className="font-medium">{b.userData?.name}</p>
                  <p className="text-sm text-gray-500">
                    Booking on {new Date(b.slotDate).toLocaleDateString()} at{" "}
                    {b.slotTime}
                  </p>
                </div>
                <span className={`text-sm font-medium ${status.color}`}>
                  {status.text}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
