import DashboardCards from "../components/Dashboard";
import LatestBookings from "../components/LatestBooking";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardCards />
      <LatestBookings />
    </div>
  );
}
