import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top NavBar */}
      <Topbar/>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Page Content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
