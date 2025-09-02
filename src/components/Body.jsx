import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Body() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top NavBar */}
      <Topbar />
      

      <div className="flex ">
        {/* Sidebar */}
        <Sidebar />
        

        {/* Main Page Content */}
        <div className="flex-1 p-6 bg-blue-100 bg-opacity-50 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
