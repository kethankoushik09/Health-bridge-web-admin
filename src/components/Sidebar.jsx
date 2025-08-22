export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-6">
        
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-2 text-gray-500">
          <i className="bi bi-house text-xl text-bold text-black"/> Dashboard
        </a>
         <a href="#" className="flex items-center gap-2 text-gray-500">
          <i className="bi bi-calendar text-xl text-bold text-black"/> Appointments
        </a>
         <a href="#" className="flex items-center gap-2 text-gray-500">
          <i className=" bi bi-people text-xl text-bold text-black"/> Profile
        </a>
         <a href="#" className="flex items-center gap-2 text-gray-500">
          <i className=" bi bi-person-plus-fill text-xl text-bold text-black"/> Profile
        </a>
       
      </nav>
    </div>
  );
}
