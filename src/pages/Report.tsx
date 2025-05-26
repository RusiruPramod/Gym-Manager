import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  RefreshCw,
  BarChart2,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
  Search,
  Download, // For export
  Printer,  // For print
  Users,    // For total members stat card
  Activity, // For average attendance stat card
  Wallet,   // For payments stat card (though DollarSign is also used)
  CalendarCheck // For memberships stat card
} from 'lucide-react';
import Sidebar from '../components/ui/sidebar'; // Ensure this path is correct for your project

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [dateRange, setDateRange] = useState('week'); // State for date range filter
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Consolidated sample data for all report types
  const reportsData = {
    // Overall Stats for the dashboard overview
    totalMembers: 1248,
    activeMembers: 1120,
    avgAttendancePerDay: 128,
    monthlyRevenue: 24750, // Example monthly revenue for stats card

    // Detailed Attendance Data
    attendance: [
      { id: 1, memberId: 'M101', name: 'John Doe', checkIn: '2025-05-25 08:15', checkOut: '2025-05-25 10:30', duration: '2h 15m' },
      { id: 2, memberId: 'M102', name: 'Jane Smith', checkIn: '2025-05-25 09:20', checkOut: '2025-05-25 11:45', duration: '2h 25m' },
      { id: 3, memberId: 'M103', name: 'Sam Wilson', checkIn: '2025-05-25 07:45', checkOut: '2025-05-25 09:30', duration: '1h 45m' },
      { id: 4, memberId: 'M104', name: 'Emily Clark', checkIn: '2025-05-25 10:10', checkOut: '2025-05-25 12:40', duration: '2h 30m' },
      { id: 5, memberId: 'M105', name: 'Michael Brown', checkIn: '2025-05-25 08:00', checkOut: '2025-05-25 09:00', duration: '1h 00m' },
    ],

    // Detailed Payment Data
    payments: [
      { id: 'P001', memberId: 'M101', name: 'John Doe', amount: 135.00, date: '2025-05-25', method: 'Credit Card', status: 'completed' },
      { id: 'P002', memberId: 'M102', name: 'Jane Smith', amount: 85.50, date: '2025-05-24', method: 'Bank Transfer', status: 'pending' },
      { id: 'P003', memberId: 'M103', name: 'Sam Wilson', amount: 65.00, date: '2025-05-23', method: 'Cash', status: 'completed' },
      { id: 'P004', memberId: 'M104', name: 'Emily Clark', amount: 120.00, date: '2025-05-22', method: 'Credit Card', status: 'completed' },
      { id: 'P005', memberId: 'M105', name: 'Michael Brown', amount: 99.00, date: '2025-05-21', method: 'Credit Card', status: 'completed' },
    ],

    // Detailed Membership Data
    memberships: [
      { id: 'MM001', name: 'John Doe', plan: 'Monthly', joinDate: '2025-01-15', expiryDate: '2025-06-15', status: 'Active' },
      { id: 'MM002', name: 'Jane Smith', plan: 'Quarterly', joinDate: '2025-03-10', expiryDate: '2025-06-10', status: 'Active' },
      { id: 'MM003', name: 'Sam Wilson', plan: 'Yearly', joinDate: '2024-12-05', expiryDate: '2025-12-05', status: 'Active' },
      { id: 'MM004', name: 'Emily Clark', plan: 'Monthly', joinDate: '2025-05-01', expiryDate: '2025-06-01', status: 'Active' },
      { id: 'MM005', name: 'Michael Brown', plan: 'Bi-Annual', joinDate: '2025-02-20', expiryDate: '2025-08-20', status: 'Active' },
    ],

    // Data specifically for the Revenue tab (could be expanded with more detailed charts)
    revenueSummary: {
        collectionRate: 92,
        upcomingRenewals: 24,
        nextRenewalDate: 'May 28',
        paymentMethodsBreakdown: [
            { method: 'Credit/Debit', percentage: 65, color: 'bg-blue-600', icon: <CreditCard className="w-4 h-4" /> },
            { method: 'Bank Transfer', percentage: 20, color: 'bg-purple-600', icon: <RefreshCw className="w-4 h-4" /> }, // Reusing RefreshCw as a generic bank icon for example
            { method: 'Cash', percentage: 15, color: 'bg-green-600', icon: <DollarSign className="w-4 h-4" /> }
        ]
    }
  };

  // Filtered data based on search query
  const filteredAttendance = reportsData.attendance.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPayments = reportsData.payments.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMemberships = reportsData.memberships.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          {/* Header Section */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Reports Dashboard</h1>
              <p className="text-slate-600">Analyze and export your gym data</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                <span className="text-sm text-slate-600">Today:</span>
                <span className="ml-2 font-semibold text-slate-800">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/*---*/}
          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'attendance' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Attendance
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Payments
              </button>
              <button
                onClick={() => setActiveTab('memberships')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'memberships' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Memberships
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'revenue' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
              >
                Revenue
              </button>
            </nav>
          </div>

          {/*---*/}
          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard
              title="Total Members"
              value={reportsData.totalMembers.toLocaleString()}
              icon={<Users className="w-5 h-5 text-blue-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
              }
            />
            <StatCard
              title="Active Members"
              value={reportsData.activeMembers.toLocaleString()}
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
              }
            />
            <StatCard
              title="Avg. Daily Attendance"
              value={`${reportsData.avgAttendancePerDay}/day`}
              icon={<Activity className="w-5 h-5 text-orange-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">+5% from last week</p>
                </div>
              }
            />
            <StatCard
              title="Monthly Revenue"
              value={`$${reportsData.monthlyRevenue.toLocaleString()}`}
              icon={<DollarSign className="w-5 h-5 text-purple-600" />}
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-green-600">+15% from last month</p>
                </div>
              }
            />
          </div>

          {/*---*/}
          {/* Report Content Area */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Report Toolbar */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-slate-800 mb-2 sm:mb-0">
                {activeTab === 'attendance' && 'Attendance Reports'}
                {activeTab === 'payments' && 'Payment Reports'}
                {activeTab === 'memberships' && 'Membership Reports'}
                {activeTab === 'revenue' && 'Revenue Overview'}
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
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
                <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 w-full sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 w-full sm:w-auto">
                  <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 w-full sm:w-auto">
                  <Download className="h-4 w-4 mr-2" /> Export
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 w-full sm:w-auto">
                  <Printer className="h-4 w-4 mr-2" /> Print
                </button>
              </div>
            </div>

            {/* Dynamic Report Tables */}
            <div className="overflow-x-auto">
              {activeTab === 'attendance' && (
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Member ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Check-in
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Check-out
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredAttendance.length > 0 ? (
                      filteredAttendance.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {item.memberId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.checkIn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.checkOut}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">View</button>
                            <button className="text-slate-600 hover:text-slate-900 text-sm">Export</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-500">
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'payments' && (
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Payment ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Method
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
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.name} ({item.memberId})
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            ${item.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            <div className="flex items-center">
                              {item.method === 'Credit Card' && <CreditCard className="h-4 w-4 mr-2 text-blue-500" />}
                              {item.method === 'Bank Transfer' && <RefreshCw className="h-4 w-4 mr-2 text-purple-500" />}
                              {item.method === 'Cash' && <DollarSign className="h-4 w-4 mr-2 text-green-500" />}
                              {item.method}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">View</button>
                            <button className="text-slate-600 hover:text-slate-900 text-sm">Receipt</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-slate-500">
                          No payment records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'memberships' && (
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Member ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Join Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Expiry Date
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
                    {filteredMemberships.length > 0 ? (
                      filteredMemberships.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.plan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {item.expiryDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">View</button>
                            <button className="text-slate-600 hover:text-slate-900 text-sm">Export</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-slate-500">
                          No membership records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {activeTab === 'revenue' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Revenue Overview</h3>
                      <div className="h-64 bg-slate-100 rounded flex items-center justify-center">
                        <p className="text-slate-500">Revenue chart will be displayed here</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                      <h3 className="text-lg font-medium text-slate-800 mb-4">Payment Methods Breakdown</h3>
                      <div className="mt-4 pt-4 space-y-3">
                        {reportsData.revenueSummary.paymentMethodsBreakdown.map((item) => (
                          <div key={item.method} className="flex items-center">
                            <div className={`p-1.5 rounded-md mr-3 ${item.color}/10`}>
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-700">{item.method}</span>
                                <span className="font-medium">{item.percentage}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-1.5">
                                <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">Monthly Revenue Trend</h3>
                    <div className="h-80 bg-slate-100 rounded flex items-center justify-center">
                      <p className="text-slate-500">Monthly revenue trend chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*---*/}
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">
                    {activeTab === 'attendance' && filteredAttendance.length}
                    {activeTab === 'payments' && filteredPayments.length}
                    {activeTab === 'memberships' && filteredMemberships.length}
                    {activeTab === 'revenue' && 'N/A'} {/* Pagination not applicable for revenue overview */}
                  </span> entries
                </div>
                {activeTab !== 'revenue' && (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, icon, footer }) => (
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

export default ReportsPage;