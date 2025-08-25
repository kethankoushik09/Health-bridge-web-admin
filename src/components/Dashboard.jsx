export default function DashboardCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-6">
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">$80</p>
        <p className="text-gray-500">Earnings</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">4</p>
        <p className="text-gray-500">Appointments</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">2</p>
        <p className="text-gray-500">Patients</p>
      </div>
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-xl font-bold">12</p>
        <p className="text-gray-500">Doctors</p>
      </div>
    </div>
  );
}
