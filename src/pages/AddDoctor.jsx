import { useState } from "react";
import defaultimage from "../assets/default.jpg";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import addDocLoading from "../assets/addDocLoading.json"; 

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    about: "",
    speciality: "",
    degree: "",
    address1: "",
    address2: "",
  });
  const [docImage, SetdocImage] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataObj = new FormData();

    for (let key in formData) {
      if (key !== "image" && key !== "address1" && key !== "address2") {
        formDataObj.append(key, formData[key]);
      }
    }

    const fullAddress = `${formData.address1} ${formData.address2}`.trim();
    formDataObj.append("address", fullAddress);

    formDataObj.append("image", docImage);

    try {
      const res = await axios.post(
        BASE_URL + "/api/admin/addDoctor",
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
          experience: "",
          fees: "",
          about: "",
          speciality: "",
          degree: "",
          address1: "",
          address2: "",
        });
        SetdocImage(false);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return(
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
          <Lottie
            animationData={addDocLoading}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
          <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
            Adding Doctor, please wait...
          </p>
        </div>

    )
  }

  return (
    <>
  
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Add Doctor</h2>

      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* Upload Picture */}
        <div className="flex gap-5 items-start mb-9 ">
          <input
            id="doctor-picture"
            type="file"
            name="picture"
            accept="image/*"
            onChange={(e) => SetdocImage(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="doctor-picture"
            className="w-18 h-18 rounded-full border-2 border-gray-300 flex items-center justify-center  cursor-pointer bg-gray-100"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border">
              <img
                src={docImage ? URL.createObjectURL(docImage) : defaultimage}
                alt="Doctor"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </label>

          <p className="text-m text-gray-500 mt-2">
            Upload doctor <br />
            picture
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Doctor Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Set Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              >
                <option value="">Select experience</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="5">5 Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Fees
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Doctor fees"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Speciality
              </label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              >
                <option value="">Select speciality</option>
                <option value="general">General Physician</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="neurologist">Neurologist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Degree
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Degree"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Address 1
              </label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Address 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Address 2
              </label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Address 2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                About Doctor
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="3"
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Write about doctor"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
