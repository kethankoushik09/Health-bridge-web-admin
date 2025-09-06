import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import {
  FaEnvelope,
  FaGraduationCap,
  FaStethoscope,
  FaBriefcase,
  FaInfoCircle,
  FaMoneyBill,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";

export default function Profile() {
  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`${BASE_URL}/api/doctor/profile`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setDoctor(res.data.profile);
        setForm(res.data.profile);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await axios.put(
      "http://localhost:4000/api/doctor/profile",
      formData,
      { withCredentials: true }
    );

    if (res.data.success) {
      setDoctor(res.data.doctor);
      setEditMode(false);
      setImageFile(null);
    }
  };

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : doctor.image}
            alt="doctor"
            className={`w-32 h-32 object-cover rounded-full border-4 ${
              editMode ? "border-blue-500" : "border-gray-200"
            }`}
          />
        </label>
        {editMode && (
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        )}
        <h2 className="text-xl font-semibold mt-4">{doctor.name}</h2>
      </div>

      {/* Profile Details */}
      <div className="mt-6 space-y-4">
        {[
          { icon: <FaEnvelope />, field: "email", value: doctor.email },
          { icon: <FaGraduationCap />, field: "degree", value: doctor.degree },
          {
            icon: <FaStethoscope />,
            field: "speciality",
            value: doctor.speciality,
          },
          {
            icon: <FaBriefcase />,
            field: "experience",
            value: doctor.experience+" years",
          },
          { icon: <FaInfoCircle />, field: "about", value: doctor.about, textarea: true },
          { icon: <FaMoneyBill />, field: "fees", value: `₹${doctor.fees}` },
          { icon: <FaMapMarkerAlt />, field: "address", value: doctor.address },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-700">
            <span className="text-blue-600 text-lg">{item.icon}</span>
            {editMode ? (
              item.textarea ? (
                <textarea
                  className="flex-1 border rounded p-2"
                  name={item.field}
                  value={form[item.field]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  className="flex-1 border rounded p-2"
                  name={item.field}
                  value={form[item.field]}
                  onChange={handleChange}
                />
              )
            ) : (
              <span className="flex-1">{item.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Buttons at the Bottom */}
      <div className="flex justify-center gap-4 mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setImageFile(null);
                setForm(doctor);
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow"
          >
             Edit 
          </button>
        )}
      </div>
    </div>
  );
}
