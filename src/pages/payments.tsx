import { useState, useMemo } from "react";
import {
  CreditCard,
  DollarSign,
  FileText,
  BarChart2,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  MoreVertical,
  ArrowLeft,
  Calendar,
  PieChart as PieChartIcon,
  RefreshCw,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
type Payment = {
  paymentId: number;
  memberId: number;
  memberName: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: "Completed" | "Pending" | "Failed";
  invoiceNumber: string;
};



// Mock Data
const mockPayments: Payment[] = [
  {
    paymentId: 1,
    memberId: 1,
    memberName: "John Doe",
    invoiceNumber: "INV-20230501",
    amount: 45,
    paymentMethod: "Credit Card",
    date: "2025-05-28",
    status: "Completed"
  },
  {
    paymentId: 2,
    memberId: 2,
    memberName: "Jane Smith",
    invoiceNumber: "INV-20230502",
    amount: 30,
    paymentMethod: "Cash",
    date: "2025-05-28",
    status: "Completed"
  },
  {
    paymentId: 3,
    memberId: 3,
    memberName: "Alice Brown",
    invoiceNumber: "INV-20230503",
    amount: 50,
    paymentMethod: "Credit Card",
    date: "2024-02-10",
    status: "Pending"
  },
  {
    paymentId: 4,
    memberId: 4,
    memberName: "Chris Green",
    invoiceNumber: "INV-20230504",
    amount: 70,
    paymentMethod: "Debit Card",
    date: "2023-03-05",
    status: "Completed"
  },
  {
    paymentId: 5,
    memberId: 5,
    memberName: "Olivia White",
    invoiceNumber: "INV-20230505",
    amount: 25,
    paymentMethod: "Credit Card",
    date: "2022-03-17",
    status: "Pending"
  },
 
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PaymentsPage() {
  const [paymentData] = useState<Payment[]>(mockPayments);
  const [filterType, setFilterType] = useState<"Daily" | "Monthly" | "Yearly">(
    "Daily"
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = useMemo(() => {
    let filtered = paymentData.filter((entry) => {
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
          entry.memberId.toString().includes(searchTerm) ||
          entry.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [paymentData, filterType, selectedDate, searchTerm]);

  const statsData = useMemo(() => {
    const today = new Date().toDateString();
    const todayPayments = paymentData.filter(
      (entry) => new Date(entry.date).toDateString() === today
    );

    const monthlyPayments = paymentData.filter(
      (entry) =>
        new Date(entry.date).getFullYear() === new Date().getFullYear() &&
        new Date(entry.date).getMonth() === new Date().getMonth()
    );

    const paymentMethods = paymentData.reduce((acc, entry) => {
      acc[entry.paymentMethod] = (acc[entry.paymentMethod] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const paymentStatuses = paymentData.reduce((acc, entry) => {
      acc[entry.status] = (acc[entry.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRevenue: monthlyPayments.reduce((sum, entry) => sum + entry.amount, 0),
      todayRevenue: todayPayments.reduce((sum, entry) => sum + entry.amount, 0),
      todayPayments: todayPayments.length,
      paymentMethods: Object.entries(paymentMethods).map(([method, count]) => ({
        name: method,
        value: count,
      })),
      paymentStatuses: Object.entries(paymentStatuses).map(([status, count]) => ({
        name: status,
        value: count,
      })),
    };
  }, [paymentData]);

  const handlePaymentClick = (memberId: number) => {
    setSelectedMemberId(memberId);
    setViewMode("details");
  };

  const goBackToList = () => {
    setViewMode("list");
    setSelectedMemberId(null);
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
  {/* Sidebar - will be on top on mobile, side on desktop */}
  <aside className="w-full md:w-64 bg-white shadow-md z-50">
    <Sidebar />
  </aside>

  {/* Main content */}
  <main className="flex-1 overflow-y-auto p-4">
    <div className="max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Payments</h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">
            Track and manage member payment records
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">
            {formatDate(new Date())}
          </div>
        </div>
      </div>

      {viewMode === "list" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Today's Revenue Card */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs md:text-sm">Today's Revenue</p>
                  <p className="text-xl md:text-2xl font-bold text-slate-800">
                    ${statsData.todayRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {statsData.todayPayments} payments today
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Monthly Revenue Card */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs md:text-sm">Monthly Revenue</p>
                  <p className="text-xl md:text-2xl font-bold text-slate-800">
                    ${statsData.totalRevenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Current month
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs md:text-sm">Payment Methods</p>
                  <p className="text-xl md:text-2xl font-bold text-slate-800">
                    {statsData.paymentMethods.length}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Different methods
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 mb-4 md:mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {(["Daily", "Monthly", "Yearly"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setSelectedDate(new Date());
                    }}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all ${
                      filterType === type
                        ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm md:text-base"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm md:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Table */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800">
                    Payment Records
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-1">
                    {filterType} view - Click on any row to see detailed information
                  </p>
                </div>
                <button className="mt-2 md:mt-0 flex items-center gap-2 text-xs md:text-sm text-orange-600 hover:text-orange-700">
                  <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
                  Refresh Data
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Member
                    </th>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Method
                    </th>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.length > 0 ? (
                    filteredData
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((payment) => (
                        <tr
                          key={payment.paymentId}
                          onClick={() => handlePaymentClick(payment.memberId)}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 font-medium text-sm">
                            {payment.invoiceNumber}
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                {payment.memberName.charAt(0)}
                              </div>
                              <div className="ml-3 md:ml-4">
                                <div className="text-sm font-medium text-slate-800">
                                  {payment.memberName}
                                </div>
                                <div className="text-xs text-slate-500">
                                  #{payment.memberId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 font-medium text-sm">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 text-sm">
                            <div className="flex items-center">
                              {payment.paymentMethod === "Credit Card" ? (
                                <CreditCard className="w-3 h-3 md:w-4 md:h-4 text-blue-500 mr-1 md:mr-2" />
                              ) : payment.paymentMethod === "Bank Transfer" ? (
                                <BarChart2 className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1 md:mr-2" />
                              ) : (
                                <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1 md:mr-2" />
                              )}
                              {payment.paymentMethod}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 text-sm">
                            <div className="text-xs md:text-sm">
                              {new Date(payment.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(payment.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                payment.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {payment.status === "Completed" ? (
                                <CheckCircle className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              ) : payment.status === "Pending" ? (
                                <Clock className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              ) : (
                                <AlertCircle className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              )}
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <div className="flex items-center space-x-1 md:space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePaymentClick(payment.memberId);
                                }}
                                className="bg-orange-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-orange-600 transition-colors text-xs md:text-sm flex items-center"
                              >
                                <FileText className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                                View
                              </button>
                              <button className="text-slate-500 hover:text-slate-700">
                                <MoreVertical className="w-3 h-3 md:w-4 md:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center px-6 py-8 md:py-12 text-slate-500"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-8 h-8 md:w-12 md:h-12 text-gray-300 mb-2 md:mb-4" />
                          <p className="text-base md:text-lg font-medium text-gray-500">
                            No payment records found
                          </p>
                          <p className="text-xs md:text-sm text-gray-400 mt-1">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
            {/* Payment Methods Pie Chart */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-800">
                  Payment Methods
                </h3>
                <PieChartIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              </div>
              <div className="h-48 md:h-64 bg-gray-50 rounded-lg p-2 md:p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statsData.paymentMethods}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      innerRadius={30}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statsData.paymentMethods.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} payments`, "Count"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Status Bar Chart */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-800">
                  Payment Status
                </h3>
                <BarChart2 className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              </div>
              <div className="h-48 md:h-64 bg-gray-50 rounded-lg p-2 md:p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData.paymentStatuses}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fontSize: 10 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Details View */}
      {viewMode === "details" && selectedMemberId && (
        <div className="space-y-4 md:space-y-6">
          <button
            onClick={goBackToList}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            Back to Payments
          </button>

          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Payment History:{" "}
                  {
                    paymentData.find((m) => m.memberId === selectedMemberId)
                      ?.memberName
                  }
                </h2>
                <p className="text-slate-600 mt-1 text-sm md:text-base">
                  Member ID: #{selectedMemberId}
                </p>
              </div>
              <button className="mt-3 md:mt-0 flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm md:text-base">
                <FileText className="w-3 h-3 md:w-4 md:h-4" />
                Generate Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Payment Summary */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-700">
                  Payment Summary
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-1">
                      <p className="text-slate-500 text-xs md:text-sm">Total Payments</p>
                      <p className="text-lg md:text-xl font-bold text-slate-800">
                        {
                          paymentData.filter(
                            (p) => p.memberId === selectedMemberId
                          ).length
                        }
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 text-xs md:text-sm">Total Amount</p>
                      <p className="text-lg md:text-xl font-bold text-slate-800">
                        $
                        {paymentData
                          .filter((p) => p.memberId === selectedMemberId)
                          .reduce((sum, p) => sum + p.amount, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 text-xs md:text-sm">Last Payment</p>
                      <p className="text-lg md:text-xl font-bold text-slate-800">
                        {new Date(
                          paymentData
                            .filter((p) => p.memberId === selectedMemberId)
                            .sort(
                              (a, b) =>
                                new Date(b.date).getTime() -
                                new Date(a.date).getTime()
                            )[0]?.date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 text-xs md:text-sm">Status</p>
                      <p className="text-lg md:text-xl font-bold text-green-600">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Payments Chart */}
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-700">
                  Recent Payments Trend
                </h3>
                <div className="h-48 md:h-64 bg-gray-50 rounded-lg p-2 md:p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={paymentData
                        .filter((p) => p.memberId === selectedMemberId)
                        .sort(
                          (a, b) =>
                            new Date(a.date).getTime() -
                            new Date(b.date).getTime()
                        )
                        .slice(0, 6)}
                      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="date"
                        stroke="#64748b"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Amount"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5, stroke: "#1d4ed8" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* All Payments Table */}
            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-700 mb-3 md:mb-4">
                All Payments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] md:min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                        Method
                      </th>
                      <th className="text-left px-4 py-3 md:px-6 md:py-4 font-medium text-slate-600 text-xs md:text-sm uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paymentData
                      .filter((p) => p.memberId === selectedMemberId)
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((payment) => (
                        <tr key={payment.paymentId} className="hover:bg-gray-50">
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 text-sm">
                            <div className="text-xs md:text-sm">
                              {new Date(payment.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(payment.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 font-medium text-sm">
                            {payment.invoiceNumber}
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 font-medium text-sm">
                            ${payment.amount.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4 text-slate-700 text-sm">
                            <div className="flex items-center">
                              {payment.paymentMethod === "Credit Card" ? (
                                <CreditCard className="w-3 h-3 md:w-4 md:h-4 text-blue-500 mr-1 md:mr-2" />
                              ) : payment.paymentMethod === "Bank Transfer" ? (
                                <BarChart2 className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1 md:mr-2" />
                              ) : (
                                <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1 md:mr-2" />
                              )}
                              {payment.paymentMethod}
                            </div>
                          </td>
                          <td className="px-4 py-3 md:px-6 md:py-4">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                payment.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {payment.status === "Completed" ? (
                                <CheckCircle className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              ) : payment.status === "Pending" ? (
                                <Clock className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              ) : (
                                <AlertCircle className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              )}
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </main>
</div>
  );
}