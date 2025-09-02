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
        let url=""
        if(isAdminLogin){
          url="http://localhost:4000/api/admin/latestBookings"
        }else if(isDoctorLogin){
          url="http://localhost:4000/api/doctor/latestBookings"
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
          {bookings.map((b, i) => (
            <li key={i} className="flex justify-between items-center pb-2">
              <div>
                <p className="font-medium">{b.userData?.name}</p>
                <p className="text-sm text-gray-500">
                  Booking on {new Date(b.slotDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-sm font-medium ${
                  b.cancelled
                    ? "text-red-500"
                    : b.payment
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {b.cancelled ? "Cancelled" : b.payment ? "Completed" : "Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
