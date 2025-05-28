import {
  Home,
  Users,
  Calendar,
  CreditCard,
  BarChart,
  Settings,
  Dumbbell,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/members", icon: Users, label: "Members" },
    { to: "/attendance", icon: Calendar, label: "Attendance" },
    { to: "/payments", icon: CreditCard, label: "Payments" },
    { to: "/reports", icon: BarChart, label: "Reports" },
    { to: "/workouts", icon: Dumbbell, label: "Progress Tracking" },
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen w-64 bg-slate-900 text-white p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">FitTrack Pro</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors font-medium ${
                pathname === to
                  ? "bg-orange-500 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white shadow-2xl z-50 border-t border-slate-700">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 4).map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center p-2 ${
                pathname === to
                  ? "text-orange-500"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}

          <Link
            to="/notifications"
            className={`flex flex-col items-center p-2 relative ${
              pathname === "/notifications"
                ? "text-orange-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Alerts</span>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
