import Sidebar from "../components/ui/sidebar";
import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

// --- Expanded Mock Data with Today's Date Entries ---
const mockAttendance: Attendance[] = [
  // John Doe - 2024
  { attendanceId: 1, memberId: 101, memberName: "John Doe", date: "2024-01-05", timeIn: "08:15 AM" },
  { attendanceId: 2, memberId: 101, memberName: "John Doe", date: "2024-01-06", timeIn: "08:25 AM" },
  { attendanceId: 3, memberId: 101, memberName: "John Doe", date: "2024-02-10", timeIn: "07:55 AM" },
  { attendanceId: 4, memberId: 101, memberName: "John Doe", date: "2024-02-11", timeIn: "08:00 AM" },
  { attendanceId: 5, memberId: 101, memberName: "John Doe", date: "2024-03-15", timeIn: "08:30 AM" },
  { attendanceId: 6, memberId: 101, memberName: "John Doe", date: "2024-04-20", timeIn: "08:45 AM" },
  { attendanceId: 7, memberId: 101, memberName: "John Doe", date: "2024-05-01", timeIn: "08:10 AM" },
  { attendanceId: 22, memberId: 101, memberName: "John Doe", date: "2024-05-02", timeIn: "08:12 AM" },
  { attendanceId: 23, memberId: 101, memberName: "John Doe", date: "2024-05-03", timeIn: "08:05 AM" },
  { attendanceId: 24, memberId: 101, memberName: "John Doe", date: "2024-06-10", timeIn: "08:30 AM" },
  { attendanceId: 25, memberId: 101, memberName: "John Doe", date: "2024-07-22", timeIn: "08:40 AM" },
  { attendanceId: 26, memberId: 101, memberName: "John Doe", date: "2024-08-01", timeIn: "08:15 AM" },
  { attendanceId: 27, memberId: 101, memberName: "John Doe", date: "2024-09-05", timeIn: "08:20 AM" },
  { attendanceId: 28, memberId: 101, memberName: "John Doe", date: "2024-10-10", timeIn: "08:25 AM" },
  { attendanceId: 29, memberId: 101, memberName: "John Doe", date: "2024-11-15", timeIn: "08:30 AM" },
  { attendanceId: 30, memberId: 101, memberName: "John Doe", date: "2024-12-20", timeIn: "08:40 AM" },

  // John Doe - 2025 (including previous and today's date)
  { attendanceId: 8, memberId: 101, memberName: "John Doe", date: "2025-01-01", timeIn: "08:20 AM" },
  { attendanceId: 9, memberId: 101, memberName: "John Doe", date: "2025-01-02", timeIn: "08:35 AM" },
  { attendanceId: 10, memberId: 101, memberName: "John Doe", date: "2025-02-05", timeIn: "07:50 AM" },
  { attendanceId: 31, memberId: 101, memberName: "John Doe", date: "2025-03-01", timeIn: "08:00 AM" },
  { attendanceId: 35, memberId: 101, memberName: "John Doe", date: "2025-05-24", timeIn: "08:00 AM" }, // Yesterday's date
  { attendanceId: 36, memberId: 101, memberName: "John Doe", date: "2025-05-23", timeIn: "08:10 AM" }, // Two days ago

  // --- NEW: Today's Entries (May 25, 2025) ---
  { attendanceId: 60, memberId: 101, memberName: "John Doe", date: "2025-05-25", timeIn: "08:05 AM" },
  { attendanceId: 61, memberId: 102, memberName: "Jane Smith", date: "2025-05-25", timeIn: "09:20 AM" },
  { attendanceId: 62, memberId: 104, memberName: "Alice Wonderland", date: "2025-05-25", timeIn: "09:05 AM" },
  { attendanceId: 63, memberId: 105, memberName: "Bob Johnson", date: "2025-05-25", timeIn: "07:45 AM" },


  // Jane Smith - 2024
  { attendanceId: 11, memberId: 102, memberName: "Jane Smith", date: "2024-01-07", timeIn: "09:05 AM" },
  { attendanceId: 12, memberId: 102, memberName: "Jane Smith", date: "2024-01-08", timeIn: "08:50 AM" },
  { attendanceId: 13, memberId: 102, memberName: "Jane Smith", date: "2024-03-01", timeIn: "09:10 AM" },
  { attendanceId: 14, memberId: 102, memberName: "Jane Smith", date: "2024-04-10", timeIn: "08:55 AM" },
  { attendanceId: 32, memberId: 102, memberName: "Jane Smith", date: "2024-05-10", timeIn: "09:15 AM" },
  { attendanceId: 33, memberId: 102, memberName: "Jane Smith", date: "2024-05-11", timeIn: "09:00 AM" },

  // Jane Smith - 2025 (including previous and today's date)
  { attendanceId: 15, memberId: 102, memberName: "Jane Smith", date: "2025-01-03", timeIn: "09:00 AM" },
  { attendanceId: 16, memberId: 102, memberName: "Jane Smith", date: "2025-03-12", timeIn: "08:40 AM" },
  { attendanceId: 17, memberId: 102, memberName: "Jane Smith", date: "2025-05-01", timeIn: "09:05 AM" },
  { attendanceId: 37, memberId: 102, memberName: "Jane Smith", date: "2025-05-24", timeIn: "09:15 AM" }, // Yesterday's date

  // Peter Jones - 2024
  { attendanceId: 18, memberId: 103, memberName: "Peter Jones", date: "2024-02-14", timeIn: "08:00 AM" },
  { attendanceId: 19, memberId: 103, memberName: "Peter Jones", date: "2024-02-15", timeIn: "08:10 AM" },
  { attendanceId: 34, memberId: 103, memberName: "Peter Jones", date: "2024-05-01", timeIn: "08:15 AM" },


  // Peter Jones - 2025 (including previous and today's date)
  { attendanceId: 20, memberId: 103, memberName: "Peter Jones", date: "2025-01-10", timeIn: "08:20 AM" },
  { attendanceId: 21, memberId: 103, memberName: "Peter Jones", date: "2025-02-20", timeIn: "08:05 AM" },
  { attendanceId: 38, memberId: 103, memberName: "Peter Jones", date: "2025-05-24", timeIn: "08:30 AM" }, // Yesterday's date

  // --- NEW: Alice Wonderland ---
  { attendanceId: 39, memberId: 104, memberName: "Alice Wonderland", date: "2024-01-10", timeIn: "09:30 AM" },
  { attendanceId: 40, memberId: 104, memberName: "Alice Wonderland", date: "2024-02-18", timeIn: "09:45 AM" },
  { attendanceId: 41, memberId: 104, memberName: "Alice Wonderland", date: "2024-03-25", timeIn: "09:20 AM" },
  { attendanceId: 42, memberId: 104, memberName: "Alice Wonderland", date: "2024-04-01", timeIn: "09:00 AM" },
  { attendanceId: 43, memberId: 104, memberName: "Alice Wonderland", date: "2024-05-05", timeIn: "09:10 AM" },
  { attendanceId: 44, memberId: 104, memberName: "Alice Wonderland", date: "2024-06-12", timeIn: "09:05 AM" },
  { attendanceId: 45, memberId: 104, memberName: "Alice Wonderland", date: "2025-01-20", timeIn: "09:15 AM" },
  { attendanceId: 46, memberId: 104, memberName: "Alice Wonderland", date: "2025-03-08", timeIn: "09:25 AM" },
  { attendanceId: 47, memberId: 104, memberName: "Alice Wonderland", date: "2025-05-24", timeIn: "09:00 AM" }, // Yesterday
  { attendanceId: 48, memberId: 104, memberName: "Alice Wonderland", date: "2025-05-22", timeIn: "09:35 AM" },

  // --- NEW: Bob Johnson ---
  { attendanceId: 49, memberId: 105, memberName: "Bob Johnson", date: "2024-01-01", timeIn: "07:30 AM" },
  { attendanceId: 50, memberId: 105, memberName: "Bob Johnson", date: "2024-01-02", timeIn: "07:40 AM" },
  { attendanceId: 51, memberId: 105, memberName: "Bob Johnson", date: "2024-01-03", timeIn: "07:35 AM" },
  { attendanceId: 52, memberId: 105, memberName: "Bob Johnson", date: "2024-07-15", timeIn: "07:50 AM" },
  { attendanceId: 53, memberId: 105, memberName: "Bob Johnson", date: "2024-08-20", timeIn: "07:55 AM" },
  { attendanceId: 54, memberId: 105, memberName: "Bob Johnson", date: "2025-01-05", timeIn: "07:45 AM" },
  { attendanceId: 55, memberId: 105, memberName: "Bob Johnson", date: "2025-02-14", timeIn: "07:30 AM" },
  { attendanceId: 56, memberId: 105, memberName: "Bob Johnson", date: "2025-05-24", timeIn: "07:30 AM" }, // Yesterday
  { attendanceId: 57, memberId: 105, memberName: "Bob Johnson", date: "2025-05-21", timeIn: "07:25 AM" },
  { attendanceId: 58, memberId: 105, memberName: "Bob Johnson", date: "2025-04-10", timeIn: "07:40 AM" },
];

export default function AttendancePage() {
  const [attendanceData] = useState<Attendance[]>(mockAttendance);
  const [filterType, setFilterType] = useState<"Daily" | "Monthly" | "Yearly">("Daily");
  // Set initial selected date to today's date for immediate daily view
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list"); // 'list' or 'details'

  const [selectedUserAttendance, setSelectedUserAttendance] = useState<{
    byYear: { name: string; days: number }[];
    byMonth: { name: string; days: number }[];
    byDay: { name: string; days: number }[];
  } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered data for the main table and overview charts
  const filteredData = useMemo(() => {
    return attendanceData.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (filterType === "Daily") {
        return entryDate.toDateString() === selectedDate.toDateString();
      } else if (filterType === "Monthly") {
        return entryDate.getFullYear() === selectedDate.getFullYear() && entryDate.getMonth() === selectedDate.getMonth();
      } else { // Yearly
        return entryDate.getFullYear() === selectedDate.getFullYear();
      }
    });
  }, [attendanceData, filterType, selectedDate]);

  // Data for the OVERVIEW chart (aggregates across all members for the selected filter type)
  const overviewChartData = useMemo(() => {
    const aggregated: { [key: string]: number } = {};

    // Get all unique keys (dates/months/years) that exist in the filtered data
    const allKeys = Array.from(new Set(filteredData.map(entry => {
      const date = new Date(entry.date);
      if (filterType === "Daily") {
        return entry.date;
      } else if (filterType === "Monthly") {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else { // Yearly
        return String(date.getFullYear());
      }
    })));

    // Initialize counts for all relevant keys
    allKeys.forEach(key => {
      aggregated[key] = 0;
    });

    // Populate counts based on filtered data
    filteredData.forEach(entry => {
      const date = new Date(entry.date);
      let key = "";
      if (filterType === "Daily") {
        key = entry.date;
      } else if (filterType === "Monthly") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else { // Yearly
        key = String(date.getFullYear());
      }
      aggregated[key] = (aggregated[key] || 0) + 1;
    });

    return Object.keys(aggregated).sort().map(key => ({
      name: key,
      'Days Present': aggregated[key],
    }));
  }, [filteredData, filterType]);


  // Function to handle clicking on a user in the table
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
      const month = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const day = `${month}-${String(date.getDate()).padStart(2, '0')}`;

      byYear[year] = (byYear[year] || 0) + 1;
      byMonth[month] = (byMonth[month] || 0) + 1;
      byDay[day] = (byDay[day] || 0) + 1;
    });

    setSelectedUserAttendance({
      byYear: Object.keys(byYear).sort().map((key) => ({ name: key, days: byYear[key] })),
      byMonth: Object.keys(byMonth).sort().map((key) => ({ name: key, days: byMonth[key] })),
      byDay: Object.keys(byDay).sort().map((key) => ({ name: key, days: byDay[key] })),
    });
  };

  // Function to go back to the main list view
  const goBackToList = () => {
    setViewMode("list");
    setSelectedMemberId(null);
    setSelectedUserAttendance(null);
  };

  // Summary for selected member (when in details view)
  const individualMemberSummary = useMemo(() => {
    if (!selectedMemberId) return null;

    const allUserAttendanceRecords = attendanceData.filter(e => e.memberId === selectedMemberId);

    if (allUserAttendanceRecords.length === 0) return null;

    const sortedRecords = [...allUserAttendanceRecords].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstRecord = sortedRecords[0];
    const lastRecord = sortedRecords[sortedRecords.length - 1];

    return {
      totalDaysPresent: allUserAttendanceRecords.length,
      firstRecordedDate: firstRecord?.date || 'N/A',
      firstRecordedTimeIn: firstRecord?.timeIn || 'N/A',
      lastRecordedDate: lastRecord?.date || 'N/A',
      lastRecordedTimeIn: lastRecord?.timeIn || 'N/A',
    };
  }, [selectedMemberId, attendanceData]);


  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Member Attendance Dashboard</h1>
          <div className="text-md text-gray-600">Current Time: {currentTime}</div>
        </div>

        {/* --- Main List View --- */}
        {viewMode === "list" && (
          <>
            {/* Filter Controls */}
            <div className="flex items-center gap-4 mb-6 flex-wrap bg-white p-4 rounded-lg shadow-sm">
              {(["Daily", "Monthly", "Yearly"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setSelectedDate(new Date()); // Reset date to current date when changing filter type
                  }}
                  className={`px-5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    filterType === type
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {type}
                </button>
              ))}
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                showYearPicker={filterType === "Yearly"}
                showMonthYearPicker={filterType === "Monthly"}
                dateFormat={
                  filterType === "Yearly"
                    ? "yyyy"
                    : filterType === "Monthly"
                    ? "MMMM לצ"
                    : "dd/MM/yyyy"
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Attendance Table (Overview) */}
            <div className="overflow-x-auto shadow rounded-lg bg-white">
              <h3 className="text-xl font-semibold text-gray-700 p-6 pb-0">
                Attendance Records for {filterType} View
              </h3>
              <p className="text-sm text-gray-500 px-6 pt-2 pb-4">
                Click on a row to see individual member attendance details.
              </p>
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr className="text-left text-gray-600">
                    <th className="px-6 py-3">Member ID</th>
                    <th className="px-6 py-3">Member Name</th>
                    {/* Conditional Header based on filterType */}
                    <th className="px-6 py-3">
                      {filterType === "Daily" ? "Time-In and Date" : `Days Present (${filterType})`}
                    </th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aggregate filtered data by member or show individual records for daily view */}
                  {filterType === "Daily" ? (
                    // For Daily view, map over individual filtered entries directly
                    filteredData.sort((a, b) => a.memberName.localeCompare(b.memberName)).map((entry) => (
                      <tr
                        key={entry.attendanceId} // Use attendanceId for unique keys in Daily view
                        onClick={() => handleUserClick(entry.memberId)}
                        className={`border-b hover:bg-blue-50 transition cursor-pointer ${
                          selectedMemberId === entry.memberId ? "bg-blue-100" : ""
                        }`}
                      >
                        <td className="px-6 py-4">{entry.memberId}</td>
                        <td className="px-6 py-4 font-medium text-blue-700">{entry.memberName}</td>
                        <td className="px-6 py-4">
                          {entry.timeIn} on {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleUserClick(entry.memberId); }}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // For Monthly/Yearly, aggregate by memberId and show count
                    Object.entries(
                      filteredData.reduce((acc, entry) => {
                        if (!acc[entry.memberId]) {
                          acc[entry.memberId] = {
                            memberId: entry.memberId,
                            memberName: entry.memberName,
                            count: 0
                          };
                        }
                        acc[entry.memberId].count++;
                        return acc;
                      }, {} as Record<number, { memberId: number; memberName: string; count: number }>)
                    )
                      .sort(([, a], [, b]) => a.memberName.localeCompare(b.memberName)) // Sort by member name
                      .map(([, memberSummary]) => (
                        <tr
                          key={memberSummary.memberId}
                          onClick={() => handleUserClick(memberSummary.memberId)}
                          className={`border-b hover:bg-blue-50 transition cursor-pointer ${
                            selectedMemberId === memberSummary.memberId ? "bg-blue-100" : ""
                          }`}
                        >
                          <td className="px-6 py-4">{memberSummary.memberId}</td>
                          <td className="px-6 py-4 font-medium text-blue-700">{memberSummary.memberName}</td>
                          <td className="px-6 py-4">{memberSummary.count}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleUserClick(memberSummary.memberId); }}
                              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center px-6 py-4 text-gray-500">
                        No attendance records found for the selected {filterType.toLowerCase()} period.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- Individual User Details View --- */}
        {viewMode === "details" && selectedUserAttendance && selectedMemberId && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={goBackToList}
              className="back-button mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              ← Back to Overview
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"> {/* Main charts section */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Attendance Details for: {attendanceData.find(m => m.memberId === selectedMemberId)?.memberName} (ID: {selectedMemberId})
                </h2>

                {/* Attendance by Month Chart */}
                <div className="chart-section mb-8 p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Days Present by Month</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedUserAttendance.byMonth}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} label={{ value: 'Days Present', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="days" fill="#FF8C00" /> {/* Dark Orange */}
                      </BarChart>
                    </ResponsiveContainer>
                    {selectedUserAttendance.byMonth.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No monthly attendance data for this member.</p>
                    )}
                  </div>
                </div>

                {/* Attendance by Day Chart (Specific Days) */}
                <div className="chart-section p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Days Present (Specific Dates)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedUserAttendance.byDay}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                        <YAxis allowDecimals={false} label={{ value: 'Days Present', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="days" fill="#333333" /> {/* Dark Gray/Black */}
                      </BarChart>
                    </ResponsiveContainer>
                    {selectedUserAttendance.byDay.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No daily attendance data for this member.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Individual Member Summary Card (Right Corner) */}
              <div className="lg:col-span-1">
                {individualMemberSummary && (
                  <div className="bg-blue-50 p-5 rounded-lg text-sm text-blue-800 shadow-inner sticky top-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Member Summary</h3>
                    <div className="space-y-2">
                      <div><strong>Total Days Present:</strong> {individualMemberSummary.totalDaysPresent}</div>
                      <div><strong>First Recorded Date:</strong> {individualMemberSummary.firstRecordedDate}</div>
                      <div><strong>First Time-In:</strong> {individualMemberSummary.firstRecordedTimeIn}</div>
                      <div><strong>Last Recorded Date:</strong> {individualMemberSummary.lastRecordedDate}</div>
                      <div><strong>Last Time-In:</strong> {individualMemberSummary.lastRecordedTimeIn}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}