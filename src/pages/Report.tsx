import { Sidebar } from 'lucide-react';
import React, { useState } from 'react';
import { FiDownload, FiFilter, FiPrinter, FiRefreshCw, FiSearch } from 'react-icons/fi';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [dateRange, setDateRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const attendanceData = [
    { id: 1, memberId: 'M101', name: 'John Doe', checkIn: '2025-05-25 08:15', checkOut: '2025-05-25 10:30', duration: '2h 15m' },
    { id: 2, memberId: 'M102', name: 'Jane Smith', checkIn: '2025-05-25 09:20', checkOut: '2025-05-25 11:45', duration: '2h 25m' },
    { id: 3, memberId: 'M103', name: 'Sam Wilson', checkIn: '2025-05-25 07:45', checkOut: '2025-05-25 09:30', duration: '1h 45m' },
    { id: 4, memberId: 'M104', name: 'Emily Clark', checkIn: '2025-05-25 10:10', checkOut: '2025-05-25 12:40', duration: '2h 30m' },
  ];

  const paymentData = [
    { id: 'P101', memberId: 'M101', name: 'John Doe', amount: '$135.00', date: '2025-05-25', method: 'Credit Card', status: 'Completed' },
    { id: 'P102', memberId: 'M102', name: 'Jane Smith', amount: '$85.50', date: '2025-05-24', method: 'Bank Transfer', status: 'Pending' },
    { id: 'P103', memberId: 'M103', name: 'Sam Wilson', amount: '$65.00', date: '2025-05-23', method: 'Cash', status: 'Completed' },
  ];

  const membershipData = [
    { id: 'M101', name: 'John Doe', plan: 'Monthly', joinDate: '2025-01-15', expiryDate: '2025-06-15', status: 'Active' },
    { id: 'M102', name: 'Jane Smith', plan: 'Quarterly', joinDate: '2025-03-10', expiryDate: '2025-06-10', status: 'Active' },
    { id: 'M103', name: 'Sam Wilson', plan: 'Yearly', joinDate: '2024-12-05', expiryDate: '2025-12-05', status: 'Active' },
    { id: 'M104', name: 'Emily Clark', plan: 'Monthly', joinDate: '2025-05-01', expiryDate: '2025-06-01', status: 'Active' },
  ];

  const filteredAttendance = attendanceData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPayments = paymentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMemberships = membershipData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">



 
      <div className="max-w-7xl mx-auto">
   
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Reports Dashboard</h1>
            <p className="text-gray-600">Analyze and export your gym data</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FiFilter className="mr-2" /> Filter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('attendance')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'attendance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('memberships')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'memberships' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Memberships
            </button>
            <button
              onClick={() => setActiveTab('revenue')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'revenue' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Revenue
            </button>
          </nav>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Members</h3>
            <p className="text-2xl font-semibold text-gray-800">1,248</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Members</h3>
            <p className="text-2xl font-semibold text-gray-800">1,120</p>
            <p className="text-sm text-green-600">+8% from last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Avg. Attendance</h3>
            <p className="text-2xl font-semibold text-gray-800">128/day</p>
            <p className="text-sm text-green-600">+5% from last week</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
            <p className="text-2xl font-semibold text-gray-800">$24,750</p>
            <p className="text-sm text-green-600">+15% from last month</p>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800 mb-2 sm:mb-0">
              {activeTab === 'attendance' && 'Attendance Reports'}
              {activeTab === 'payments' && 'Payment Reports'}
              {activeTab === 'memberships' && 'Membership Reports'}
              {activeTab === 'revenue' && 'Revenue Reports'}
            </h2>
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiRefreshCw className="mr-2" /> Refresh
              </button>
              <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiDownload className="mr-2" /> Export
              </button>
              <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiPrinter className="mr-2" /> Print
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {activeTab === 'attendance' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAttendance.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.memberId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.checkIn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Export</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'payments' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.name} ({item.memberId})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Receipt</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'memberships' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMemberships.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.plan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.expiryDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                        <button className="text-gray-600 hover:text-gray-900">Export</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'revenue' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue Overview</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">Revenue chart will be displayed here</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h3>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-gray-500">Payment methods pie chart will be displayed here</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Revenue Breakdown</h3>
                  <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Monthly revenue breakdown chart will be displayed here</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">20</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;