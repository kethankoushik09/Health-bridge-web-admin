import { useSelector } from "react-redux";


const DoctorList = () => {
  const doctors = useSelector((state) => state.allDoctors.list);

  return (
    <div className="w-full py-10 px-5 sm:px-10 lg:px-20">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center mb-2">All Doctors</h2>
      <p className="text-center text-gray-600 mb-8">
        Browse through our list of expert doctors and find the right specialist
        for you.
      </p>

      {/* Doctors Grid */}
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
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    doc.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span className="text-sm text-gray-600">
                  {doc.available ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Doctor Info */}
              <h3 className="card-title text-base font-semibold text-gray-800">
                {doc.name}
              </h3>
              <p className="text-sm text-gray-600">{doc.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
