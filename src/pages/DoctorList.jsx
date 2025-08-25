import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants.js";
import { useEffect, useState } from "react";
import { addDoctor } from "../Redux/Reducers/allDoctorSlice.jsx";
import Lottie from "lottie-react";
import doctorAnimation from "../assets/adminLoading.json";

const DoctorList = () => {
  const dispatch = useDispatch();
  const [loading, Setloading] = useState(false);
  const doctors = useSelector((state) => state.allDoctors); // adjust based on slice structure

  async function handleChangeAvailability(id) {
    try {
      await axios.patch(
        `${BASE_URL}/api/doctor/changeAvailablity/${id}`,
        {}, // empty body
        { withCredentials: true }
      );
      getAlldoctors();

    } catch (err) {
      console.log(err.message);
      
    }
  }

  async function getAlldoctors() {
    try {
      const res = await axios.get(BASE_URL + "/api/admin/allDoctors", {
        withCredentials: true,
      });
      Setloading(true);
      console.log(res.data.doctors);

      dispatch(addDoctor(res.data.doctors));

      Setloading(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (!doctors) {
      getAlldoctors();
    }
  }, []);

  if (loading) {
    return (
      <>
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
      </>
    );
  } else {
    // Render
    return (
      <div className="w-full py-10 px-5 sm:px-10 lg:px-20">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">All Doctors</h2>
        <p className="text-center text-gray-600 mb-8">
          Browse through our list of expert doctors and find the right
          specialist for you.
        </p>

        {/* Doctors Grid */}
        {doctors && doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="card bg-blue-50 shadow-md hover:shadow-xl transition"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="rounded-xl border-4 border-white shadow-md h-[280px] w-[280px] object-cover"
                  />
                </figure>

                <div className="card-body items-center text-center p-4">
                  {/* Availability */}
                  {/* <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        doc.avaliable ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-600">
                      {doc.available ? "Available" : "Not Available"}
                    </span>
                  </div> */}
                  <div className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={doc.avaliable}
                      readOnly
                      onChange={()=>handleChangeAvailability(doc._id)}
                      className="h-4 w-4 accent-green-600"
                    />
                    <span className="text-sm text-gray-600">
                      Available
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <h3 className="card-title text-base font-semibold text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-600">{doc.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No doctors available</p>
        )}
      </div>
    );
  }
};

export default DoctorList;
