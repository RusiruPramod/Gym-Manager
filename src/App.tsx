import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import AttendancePage from "./pages/Attendance";
import Allpayments from "./pages/payments";
import Reports from "./pages/Report";
import  Progres  from "./pages/Tracking";
import Notify from "./pages/notification";
import Sett from "./pages/Setting";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payments" element={<Allpayments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/workouts" element={<Progres />} />
          <Route path="/notifications" element={<Notify />} />
          <Route path="/settings" element={<Sett />} />
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
