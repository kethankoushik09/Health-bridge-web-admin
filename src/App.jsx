// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import Body from "./components/Body.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Appointments from "./pages/Appointments";
import AddDoctor from "./pages/AddDoctor";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import DoctorList from "./pages/DoctorList.jsx";

function App() {
  const isLogin = useSelector((state) => state.admin.isLogin);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={500} />
      <Routes>
        {/* Public Route - Login */}
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <LoginForm />}
        />

        {/* Protected Routes */}
        <Route path="/" element={isLogin ? <Body /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="doctors-list" element={<DoctorList />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
