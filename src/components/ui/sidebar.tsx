import { Home, Users, Calendar, CreditCard, BarChart, Settings, Dumbbell, Bell } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar for Desktop and Tablet */}
      <aside className="hidden md:block h-screen w-64 bg-slate-900 text-white p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">FitTrack Pro</h2>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500 text-white font-medium">
            <Home className="w-5 h-5" />
            Dashboard
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <Users className="w-5 h-5" />
            Members
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <Calendar className="w-5 h-5" />
            Attendance
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <CreditCard className="w-5 h-5" />
            Payments
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <BarChart className="w-5 h-5" />
            Reports
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <Dumbbell className="w-5 h-5" />
            Workouts
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            Notifications
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
            Settings
          </div>
        </nav>
      </aside>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white shadow-2xl z-50 border-t border-slate-700">
        <div className="flex justify-around items-center py-2">
          <div className="flex flex-col items-center p-2 text-orange-500">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1 font-medium">Home</span>
          </div>
          <div className="flex flex-col items-center p-2 text-slate-400 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Members</span>
          </div>
          <div className="flex flex-col items-center p-2 text-slate-400 hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Attendance</span>
          </div>
          <div className="flex flex-col items-center p-2 text-slate-400 hover:text-white transition-colors">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs mt-1">Payments</span>
          </div>
          <div className="flex flex-col items-center p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Alerts</span>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;