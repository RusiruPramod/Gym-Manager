import { QrCode } from "lucide-react"; 
import Sidebar from "../components/ui/sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-50 text-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome to your gym management system dashboard.
        </p>

        {/* QR Scan Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Scan QR to Mark Attendance</h2>
              <p className="text-sm text-gray-500">Use your device to scan and check in/out.</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Scan Now
          </button>
        </div>

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">Members</h2>
            <p className="text-2xl font-bold">128</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">Active Classes</h2>
            <p className="text-2xl font-bold">7</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">Pending Payments</h2>
            <p className="text-2xl font-bold">15</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
