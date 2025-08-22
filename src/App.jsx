// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Body from "./components/Body.jsx"; // Contains Navbar + Sidebar + Outlet
import Dashboard from "./pages/Dashboard.jsx";
// import Profile from "./pages/Profile";
// import Appointments from "./pages/Appointments";
// import AddDoctor from "./pages/AddDoctor";
import { useSelector } from "react-redux";
  import { ToastContainer} from 'react-toastify';



function App() {
  const isLogin = useSelector((state) => state.admin.isLogin);

  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={500} />
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <LoginForm />} />

        {/* Protected Routes */}
        <Route path="/" element={isLogin ? <Body /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} /> {/* Default page */}
          {/* <Route path="appointments" element={<Appointments />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* <Route path="add-doctor" element={<AddDoctor />} /> */}
        </Route>

        {/* Catch-all */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
