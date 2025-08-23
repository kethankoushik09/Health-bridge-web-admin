import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-6">
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 text-gray-500 ${
              isActive ? "text-black font-bold" : ""
            }`
          }
        >
          <i className="bi bi-house text-xl text-black" /> Dashboard
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            `flex items-center gap-2 text-gray-500 ${
              isActive ? "text-black font-bold" : ""
            }`
          }
        >
          <i className="bi bi-calendar text-xl text-black" /> Appointments
        </NavLink>
        <NavLink
          to="/add-doctor"
          className={({ isActive }) =>
            `flex items-center gap-2 text-gray-500 ${
              isActive ? "text-black font-bold" : ""
            }`
          }
        >
          <i className="bi bi-person-plus-fill text-xl text-black" /> Add Doctor
        </NavLink>

        <NavLink
          to="/doctors-list"
          className={({ isActive }) =>
            `flex items-center gap-2 text-gray-500 ${
              isActive ? "text-black font-bold" : ""
            }`
          }
        >
          <i className="bi bi-people text-xl text-black" /> Doctors List
        </NavLink>

        
      </nav>
    </div>
  );
}
