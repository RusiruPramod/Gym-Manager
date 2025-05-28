import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  BarChart3,
  ArrowLeft,
  Search,
} from "lucide-react";
import Sidebar from "../components/ui/sidebar";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

type Attendance = {
  attendanceId: number;
  memberId: number;
  memberName: string;
  date: string;
  timeIn: string;
};

const chartContainerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


// Mock Data
const mockAttendance: Attendance[] = [
  {
    attendanceId: 1,
    memberId: 101,
    memberName: "John Doe",
    date: "2025-01-05",
    timeIn: "08:15 AM",
  },
  {
    attendanceId: 2,
    memberId: 101,
    memberName: "John Doe",
    date: "2025-05-28",
    timeIn: "08:25 AM",
  },
  {
    attendanceId: 3,
    memberId: 101,
    memberName: "John Doe",
    date: "2025-05-28",
    timeIn: "07:55 AM",
  },
  {
    attendanceId: 4,
    memberId: 101,
    memberName: "John Doe",
    date: "2025-05-28",
    timeIn: "08:00 AM",
  },
  {
    attendanceId: 60,
    memberId: 101,
    memberName: "John Doe",
    date: "2025-05-25",
    timeIn: "08:05 AM",
  },
  {
    attendanceId: 61,
    memberId: 102,
    memberName: "Jane Smith",
    date: "2025-05-25",
    timeIn: "09:20 AM",
  },
  {
    attendanceId: 62,
    memberId: 104,
    memberName: "Alice Wonderland",
    date: "2025-05-25",
    timeIn: "09:05 AM",
  },
  {
    attendanceId: 63,
    memberId: 105,
    memberName: "Bob Johnson",
    date: "2025-05-25",
    timeIn: "07:45 AM",
  },
  {
    attendanceId: 11,
    memberId: 102,
    memberName: "Jane Smith",
    date: "2024-01-07",
    timeIn: "09:05 AM",
  },
  {
    attendanceId: 12,
    memberId: 102,
    memberName: "Jane Smith",
    date: "2024-01-08",
    timeIn: "08:50 AM",
  },
  {
    attendanceId: 13,
    memberId: 102,
    memberName: "Jane Smith",
    date: "2024-03-01",
    timeIn: "09:10 AM",
  },
 
];

export default function AttendancePage() {
  const [attendanceData] = useState<Attendance[]>(mockAttendance);
  const [filterType, setFilterType] = useState<"Daily" | "Monthly" | "Yearly">(
    "Daily"
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedUserAttendance, setSelectedUserAttendance] = useState<{
    byYear: { name: string; days: number }[];
    byMonth: { name: string; days: number }[];
    byDay: { name: string; days: number }[];
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = useMemo(() => {
    let filtered = attendanceData.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (filterType === "Daily") {
        return entryDate.toDateString() === selectedDate.toDateString();
      } else if (filterType === "Monthly") {
        return (
          entryDate.getFullYear() === selectedDate.getFullYear() &&
          entryDate.getMonth() === selectedDate.getMonth()
        );
      } else {
        return entryDate.getFullYear() === selectedDate.getFullYear();
      }
    });

    if (searchTerm) {
      filtered = filtered.filter(
        (entry) =>
          entry.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.memberId.toString().includes(searchTerm)
      );
    }

    return filtered;
  }, [attendanceData, filterType, selectedDate, searchTerm]);

  const statsData = useMemo(() => {
    const today = new Date().toDateString();
    const todayAttendance = attendanceData.filter(
      (entry) => new Date(entry.date).toDateString() === today
    );

    const uniqueMembers = new Set(
      attendanceData.map((entry) => entry.memberId)
    );

    return {
      totalMembers: uniqueMembers.size,
      todayAttendance: todayAttendance.length,
      currentlyCheckedIn: Math.floor(todayAttendance.length * 0.8), // Simulated
    };
  }, [attendanceData]);

  const handleUserClick = (memberId: number) => {
    setSelectedMemberId(memberId);
    setViewMode("details");

    const userAttendanceRecords = attendanceData.filter(
      (entry) => entry.memberId === memberId
    );

    const byYear: { [key: string]: number } = {};
    const byMonth: { [key: string]: number } = {};
    const byDay: { [key: string]: number } = {};

    userAttendanceRecords.forEach((record) => {
      const date = new Date(record.date);
      const year = String(date.getFullYear());
      const month = `${year}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const day = `${month}-${String(date.getDate()).padStart(2, "0")}`;

      byYear[year] = (byYear[year] || 0) + 1;
      byMonth[month] = (byMonth[month] || 0) + 1;
      byDay[day] = (byDay[day] || 0) + 1;
    });

    setSelectedUserAttendance({
      byYear: Object.keys(byYear)
        .sort()
        .map((key) => ({ name: key, days: byYear[key] })),
      byMonth: Object.keys(byMonth)
        .sort()
        .map((key) => ({ name: key, days: byMonth[key] })),
      byDay: Object.keys(byDay)
        .sort()
        .map((key) => ({ name: key, days: byDay[key] })),
    });
  };

  const goBackToList = () => {
    setViewMode("list");
    setSelectedMemberId(null);
    setSelectedUserAttendance(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="fixed  p-2 left-64 right-0 top-0 bottom-0 overflow-y-auto bg-gray-50 ">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Attendance</h1>
              <p className="text-slate-600 mt-1">
                Track and manage member attendance records
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">
                Today: {formatDate(new Date())}
              </div>
              <div className="text-lg font-semibold text-slate-700">
                {currentTime}
              </div>
            </div>
          </div>

          {viewMode === "list" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Total Members</p>
                      <p className="text-2xl font-bold text-slate-800">
                        {statsData.totalMembers}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">
                        Today's Attendance
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {statsData.todayAttendance}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">
                        Currently Checked In
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {statsData.currentlyCheckedIn}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="flex flex-wrap gap-3">
                    {(["Daily", "Monthly", "Yearly"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFilterType(type);
                          setSelectedDate(new Date());
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          filterType === type
                            ? "bg-orange-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        value={selectedDate.toISOString().split("T")[0]}
                        onChange={(e) =>
                          setSelectedDate(new Date(e.target.value))
                        }
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Attendance Records
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    {filterType} view - Click on any row to see detailed
                    analytics
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-6 py-4 font-medium text-slate-600">
                          Member ID
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-slate-600">
                          Member Name
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-slate-600">
                          {filterType === "Daily"
                            ? "Time In"
                            : `Days Present (${filterType})`}
                        </th>
                        <th className="text-left px-6 py-4 font-medium text-slate-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filterType === "Daily"
                        ? filteredData
                            .sort((a, b) =>
                              a.memberName.localeCompare(b.memberName)
                            )
                            .map((entry) => (
                              <tr
                                key={entry.attendanceId}
                                onClick={() => handleUserClick(entry.memberId)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                              >
                                <td className="px-6 py-4 text-slate-700">
                                  #{entry.memberId}
                                </td>
                                <td className="px-6 py-4">
                                  <span className="font-medium text-slate-800">
                                    {entry.memberName}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-slate-700">
                                  {entry.timeIn}
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUserClick(entry.memberId);
                                    }}
                                    className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors text-sm"
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))
                        : Object.entries(
                            filteredData.reduce((acc, entry) => {
                              if (!acc[entry.memberId]) {
                                acc[entry.memberId] = {
                                  memberId: entry.memberId,
                                  memberName: entry.memberName,
                                  count: 0,
                                };
                              }
                              acc[entry.memberId].count++;
                              return acc;
                            }, {} as Record<number, { memberId: number; memberName: string; count: number }>)
                          )
                            .sort(([, a], [, b]) =>
                              a.memberName.localeCompare(b.memberName)
                            )
                            .map(([, memberSummary]) => (
                              <tr
                                key={memberSummary.memberId}
                                onClick={() =>
                                  handleUserClick(memberSummary.memberId)
                                }
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                              >
                                <td className="px-6 py-4 text-slate-700">
                                  #{memberSummary.memberId}
                                </td>
                                <td className="px-6 py-4">
                                  <span className="font-medium text-slate-800">
                                    {memberSummary.memberName}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-slate-700">
                                  {memberSummary.count} days
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUserClick(memberSummary.memberId);
                                    }}
                                    className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors text-sm"
                                  >
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                      {filteredData.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center px-6 py-12 text-slate-500"
                          >
                            No attendance records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Details View */}
         {viewMode === "details" &&
  selectedUserAttendance &&
  selectedMemberId && (
    <div className="space-y-6">
      <button
        onClick={goBackToList}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Overview
      </button>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Attendance Details:{" "}
          {
            attendanceData.find(
              (m) => m.memberId === selectedMemberId
            )?.memberName
          }
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Chart */}
          <motion.div
  className="space-y-4"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }} // 
  variants={chartContainerVariants}
>

            <h3 className="text-lg font-semibold text-slate-700">
              Monthly Attendance
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedUserAttendance.byMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="days"
                    fill="#f97316"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Daily Chart */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={chartContainerVariants}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-slate-700">
              Daily Attendance
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedUserAttendance.byDay.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="days"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )}
        </div>
      </main>
    </div>
  );
}
