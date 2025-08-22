import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DashboardCards from "../components/Dashboard";
import LatestBookings from "../components/LatestBooking";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex-col">
        <Topbar />
        <div className=" flex gap-12">
          <Sidebar />
          <div>
            <DashboardCards />
            <LatestBookings />
          </div>
        </div>
      </div>
    </div>
  );
}
