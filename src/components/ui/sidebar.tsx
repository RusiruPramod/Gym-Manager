import {
  Home,
  Users,
  Calendar,
  CreditCard,
  BarChart,
  Settings,
  Dumbbell,
  Bell,
} from "lucide-react"; // install with: npm install lucide-react
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white border-r shadow-sm p-5 text-gray-800">
      <h2 className="text-2xl font-bold mb-8">Gym Manager</h2>

      <nav className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-blue-600">
          <Home className="w-5 h-5" />
          Dashboard
        </Link>

        <Link to="/Members" className="flex items-center gap-3 hover:text-blue-600">
          <Users className="w-5 h-5" />
          Members
        </Link>

        <Link to="/attendance" className="flex items-center gap-3 hover:text-blue-600">
          <Calendar className="w-5 h-5" />
          Attendance
        </Link>

        <Link to="/payments" className="flex items-center gap-3 hover:text-blue-600">
          <CreditCard className="w-5 h-5" />
          Payments
        </Link>

        <Link to="/reports" className="flex items-center gap-3 hover:text-blue-600">
          <BarChart className="w-5 h-5" />
          Reports
        </Link>

        <Link to="/workouts" className="flex items-center gap-3 hover:text-blue-600">
          <Dumbbell className="w-5 h-5" />
          Progress Tracking
        </Link>

        <Link to="/notifications" className="flex items-center gap-3 hover:text-blue-600">
          <Bell className="w-5 h-5" />
          Notifications
        </Link>

        <Link to="/settings" className="flex items-center gap-3 hover:text-blue-600">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
