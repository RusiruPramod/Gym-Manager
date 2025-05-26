import {
  CreditCard,
  DollarSign,
  FileText,
  RefreshCw,
  BarChart2,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import Sidebar from '../components/ui/sidebar';

const PaymentsDashboard = () => {
  const paymentData = {
    todayPayments: 4820,
    todayCompleted: 42,
    todayPending: 8,
    monthlyTotal: 24750,
    collectionRate: 92,
    upcomingRenewals: 24,
    nextRenewalDate: 'May 28',
    pendingTransactions: 7,
    paymentMethods: [
      { method: 'Credit/Debit', percentage: 65, color: 'bg-blue-600', icon: <CreditCard className="w-4 h-4" /> },
      { method: 'Bank Transfer', percentage: 20, color: 'bg-purple-600', icon: <RefreshCw className="w-4 h-4" /> },
      { method: 'Cash', percentage: 15, color: 'bg-green-600', icon: <DollarSign className="w-4 h-4" /> }
    ],
    recentTransactions: [
      { id: 'PT001', member: 'John D.', amount: 135.00, method: 'Credit Card', status: 'completed', date: 'May 24, 3:45 PM' },
      { id: 'PT002', member: 'Sarah M.', amount: 85.50, method: 'Bank Transfer', status: 'pending', date: 'May 24, 2:30 PM' },
      { id: 'PT003', member: 'Alex R.', amount: 65.00, method: 'Cash', status: 'completed', date: 'May 24, 1:15 PM' },
      { id: 'PT004', member: 'Emma S.', amount: 120.00, method: 'Credit Card', status: 'completed', date: 'May 24, 12:00 PM' },
      { id: 'PT005', member: 'Mike T.', amount: 95.00, method: 'Bank Transfer', status: 'pending', date: 'May 24, 10:45 AM' }
    ]
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Payments Dashboard</h1>
              <p className="text-slate-600">Manage all payment activities and transactions</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                <span className="text-sm text-slate-600">Today:</span>
                <span className="ml-2 font-semibold text-slate-800">May 24, 2025</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all">
                <DollarSign className="w-4 h-4 mr-2" />
                New Payment
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <StatCard 
              title="Today's Payments" 
              value={`$${paymentData.todayPayments.toLocaleString()}`} 
              icon={<DollarSign className="w-5 h-5 text-blue-600" />} 
              footer={
                <div className="flex justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="text-green-600 text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {paymentData.todayCompleted} completed
                  </span>
                  <span className="text-yellow-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {paymentData.todayPending} pending
                  </span>
                </div>
              } 
            />

            <StatCard 
              title="Monthly Revenue" 
              value={`$${paymentData.monthlyTotal.toLocaleString()}`} 
              icon={<CreditCard className="w-5 h-5 text-purple-600" />} 
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Collection rate</span>
                    <span className="font-medium">{paymentData.collectionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${paymentData.collectionRate}%` }}></div>
                  </div>
                </div>
              } 
            />

            <StatCard 
              title="Payment Methods" 
              value="3 active" 
              icon={<BarChart2 className="w-5 h-5 text-green-600" />} 
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  {paymentData.paymentMethods.map((item) => (
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
              } 
            />

            <StatCard 
              title="Upcoming Renewals" 
              value={paymentData.upcomingRenewals} 
              icon={<Clock className="w-5 h-5 text-orange-600" />} 
              footer={
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-slate-600 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Next batch: {paymentData.nextRenewalDate}
                  </p>
                </div>
              } 
            />
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold text-slate-800 mb-2 sm:mb-0">Recent Transactions</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search transactions..." 
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Member</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Method</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paymentData.recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 text-center">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-center">{transaction.member}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 text-center">${transaction.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">
                        <div className="flex items-center justify-center">
                          {transaction.method === 'Credit Card' && <CreditCard className="h-4 w-4 mr-2 text-blue-500" />}
                          {transaction.method === 'Bank Transfer' && <RefreshCw className="h-4 w-4 mr-2 text-purple-500" />}
                          {transaction.method === 'Cash' && <DollarSign className="h-4 w-4 mr-2 text-green-500" />}
                          {transaction.method}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="text-slate-400 hover:text-slate-600 mx-auto">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Centered Pagination */}
            <div className="px-6 py-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> transactions
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
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default PaymentsDashboard;