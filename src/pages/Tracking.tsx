import React, { useState } from 'react';
import {
  Activity,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  BarChart2,
  Clock,
  Filter,
  Search,
  Download,
  Printer,
  Users,
  CalendarCheck,
  TrendingUp,
  Dumbbell,
  HeartPulse,
  Target
} from 'lucide-react';
import Sidebar from '../components/ui/sidebar';

const TrackingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState('All Members');

  // Sample data for progress tracking
  const trackingData = {
    // Stats cards data
    stats: {
      attendance: { value: 92, trend: '+5% from last month' },
      workoutCompletion: { value: 78, trend: '+8% from last month' },
      goalProgress: { value: 65, trend: '+12% from last month' },
      activeDays: { value: 20, total: 30, trend: '+3 days from last month' }
    },

    // Member progress data
    members: [
      { id: 'M101', name: 'John Doe', attendance: 95, completion: 85, goals: 70 },
      { id: 'M102', name: 'Jane Smith', attendance: 88, completion: 72, goals: 65 },
      { id: 'M103', name: 'Sam Wilson', attendance: 92, completion: 78, goals: 60 },
      { id: 'M104', name: 'Emily Clark', attendance: 85, completion: 80, goals: 75 },
      { id: 'M105', name: 'Michael Brown', attendance: 90, completion: 75, goals: 55 },
    ],

    // Recent activity data
    recentActivity: [
      { id: 'A101', memberId: 'M101', name: 'John Doe', date: '2025-05-25', activity: 'Cardio + Strength', duration: '60 mins', status: 'completed' },
      { id: 'A102', memberId: 'M102', name: 'Jane Smith', date: '2025-05-24', activity: 'Yoga', duration: '45 mins', status: 'completed' },
      { id: 'A103', memberId: 'M103', name: 'Sam Wilson', date: '2025-05-23', activity: 'HIIT', duration: '30 mins', status: 'missed' },
      { id: 'A104', memberId: 'M104', name: 'Emily Clark', date: '2025-05-22', activity: 'Strength Training', duration: '50 mins', status: 'completed' },
      { id: 'A105', memberId: 'M105', name: 'Michael Brown', date: '2025-05-21', activity: 'Swimming', duration: '40 mins', status: 'completed' },
    ],

    // Goals data
    goals: [
      { id: 'G101', memberId: 'M101', name: 'John Doe', goal: 'Lose 5kg', progress: 65, targetDate: '2025-07-15', status: 'on track' },
      { id: 'G102', memberId: 'M102', name: 'Jane Smith', goal: 'Run 5k', progress: 80, targetDate: '2025-06-30', status: 'ahead' },
      { id: 'G103', memberId: 'M103', name: 'Sam Wilson', goal: 'Increase Bench Press', progress: 45, targetDate: '2025-08-10', status: 'needs work' },
      { id: 'G104', memberId: 'M104', name: 'Emily Clark', goal: 'Improve Flexibility', progress: 70, targetDate: '2025-07-01', status: 'on track' },
      { id: 'G105', memberId: 'M105', name: 'Michael Brown', goal: 'Build Muscle', progress: 55, targetDate: '2025-09-15', status: 'on track' },
    ]
  };

  // Filter data based on search query and selected member
  const filteredActivity = trackingData.recentActivity.filter(item =>
    (selectedMember === 'All Members' || item.name === selectedMember) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGoals = trackingData.goals.filter(item =>
    (selectedMember === 'All Members' || item.name === selectedMember) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Progress Tracking</h1>
              <p className="text-slate-600">Monitor member progress and workout statistics</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                <span className="text-sm text-slate-600">Today:</span>
                <span className="ml-2 font-semibold text-slate-800">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Activity Log
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'goals' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Goals
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'performance' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Performance
              </button>
            </nav>
          </div>

          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard
              title="Attendance Rate"
              value={`${trackingData.stats.attendance.value}%`}
              icon={<CalendarCheck className="w-5 h-5 text-blue-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">{trackingData.stats.attendance.trend}</p>
                  <ProgressBar value={trackingData.stats.attendance.value} />
                </div>
              }
            />
            <StatCard
              title="Workout Completion"
              value={`${trackingData.stats.workoutCompletion.value}%`}
              icon={<Dumbbell className="w-5 h-5 text-orange-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">{trackingData.stats.workoutCompletion.trend}</p>
                  <ProgressBar value={trackingData.stats.workoutCompletion.value} />
                </div>
              }
            />
            <StatCard
              title="Goal Progress"
              value={`${trackingData.stats.goalProgress.value}%`}
              icon={<Target className="w-5 h-5 text-purple-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">{trackingData.stats.goalProgress.trend}</p>
                  <ProgressBar value={trackingData.stats.goalProgress.value} />
                </div>
              }
            />
            <StatCard
              title="Active Days"
              value={`${trackingData.stats.activeDays.value}/${trackingData.stats.activeDays.total}`}
              icon={<TrendingUp className="w-5 h-5 text-green-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">{trackingData.stats.activeDays.trend}</p>
                  <ProgressBar value={(trackingData.stats.activeDays.value / trackingData.stats.activeDays.total) * 100} />
                </div>
              }
            />
          </div>

          {/* Report Content Area */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Report Toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-slate-800 mb-2 sm:mb-0">
                {activeTab === 'overview' && 'Progress Overview'}
                {activeTab === 'activity' && 'Activity Log'}
                {activeTab === 'goals' && 'Member Goals'}
                {activeTab === 'performance' && 'Performance Metrics'}
              </h2>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="block w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                >
                  <option value="All Members">All Members</option>
                  {trackingData.members.map(member => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
                <select
                  className="block w-full sm:w-auto px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" /> Export
                </button>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="overflow-x-auto">
              {activeTab === 'overview' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Attendance Trend</h3>
                      <div className="h-64 bg-slate-100 rounded flex items-center justify-center">
                        <p className="text-slate-500">Attendance chart will be displayed here</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Workout Types Breakdown</h3>
                      <div className="h-64 bg-slate-100 rounded flex items-center justify-center">
                        <p className="text-slate-500">Workout types pie chart will be displayed here</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Member Progress Overview</h3>
                    <div className="h-80 bg-slate-100 rounded flex items-center justify-center">
                      <p className="text-slate-500">Member progress comparison chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredActivity.length > 0 ? (
                      filteredActivity.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.name} ({item.memberId})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.activity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">Details</button>
                            <button className="text-slate-600 hover:text-slate-900 text-sm">Export</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-500">
                          No activity records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'goals' && (
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Goal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Target Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredGoals.length > 0 ? (
                      filteredGoals.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.name} ({item.memberId})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.goal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-full mr-2">
                                <ProgressBar value={item.progress} />
                              </div>
                              <div className="text-sm text-slate-500">
                                {item.progress}%
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.targetDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${item.status === 'on track' ? 'bg-blue-100 text-blue-800' : 
                                item.status === 'ahead' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">View</button>
                            <button className="text-slate-600 hover:text-slate-900 text-sm">Update</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-500">
                          No goal records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'performance' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Performance Metrics</h3>
                      <div className="h-64 bg-slate-100 rounded flex items-center justify-center">
                        <p className="text-slate-500">Performance metrics chart will be displayed here</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Member Comparison</h3>
                      <div className="h-64 bg-slate-100 rounded flex items-center justify-center">
                        <p className="text-slate-500">Member comparison chart will be displayed here</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Long-term Progress</h3>
                    <div className="h-80 bg-slate-100 rounded flex items-center justify-center">
                      <p className="text-slate-500">Long-term progress chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {(activeTab === 'activity' || activeTab === 'goals') && (
              <div className="px-6 py-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-slate-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">
                      {activeTab === 'activity' && filteredActivity.length}
                      {activeTab === 'goals' && filteredGoals.length}
                    </span> entries
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      <button className="px-3 py-1 border border-blue-500 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
                        1
                      </button>
                      <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                        2
                      </button>
                      <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                        3
                      </button>
                    </div>
                    <button className="px-3 py-1 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, icon, footer }: { title: string, value: string, icon: React.ReactNode, footer?: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
      </div>
      <div className="p-3 bg-slate-100 rounded-lg h-fit">
        {icon}
      </div>
    </div>
    {footer}
  </div>
);

// Reusable ProgressBar Component
const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
    <div
      className="bg-blue-600 h-2.5 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default TrackingPage;