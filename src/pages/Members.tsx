import { BadgeCheck, XCircle } from "lucide-react";
import Sidebar from "../components/ui/sidebar"; // Adjust path if needed

type Member = {
  id: number;
  name: string;
  plan: "Monthly" | "Quarterly" | "Yearly";
  status: "Active" | "Inactive" | "Expired";
  paymentDue: boolean;
};

const mockMembers: Member[] = [
  { id: 1, name: "John Doe", plan: "Monthly", status: "Active", paymentDue: false },
  { id: 2, name: "Jane Smith", plan: "Quarterly", status: "Expired", paymentDue: true },
  { id: 3, name: "Sam Wilson", plan: "Yearly", status: "Inactive", paymentDue: true },
  { id: 4, name: "Emily Clark", plan: "Monthly", status: "Active", paymentDue: false },
];

const statusColor = {
  Active: "text-green-600 bg-green-100",
  Inactive: "text-yellow-600 bg-yellow-100",
  Expired: "text-red-600 bg-red-100",
};

export default function Members() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 text-gray-800">
        <h1 className="text-2xl font-bold mb-4"> Members</h1>

        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr className="text-left">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {mockMembers.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{member.name}</td>
                  <td className="px-6 py-4">{member.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[member.status]}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.paymentDue ? (
                      <span className="text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Due
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center gap-1">
                        <BadgeCheck className="w-4 h-4" /> Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Placeholder for future chart */}
        <div className="mt-10">
          <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
            {/* You can integrate Chart.js or Recharts here */}
            Chart showing monthly registration trends (coming soon...)
          </div>
        </div>
      </div>
    </div>
  );
}
