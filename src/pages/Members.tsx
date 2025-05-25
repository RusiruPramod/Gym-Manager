import { BadgeCheck, XCircle } from "lucide-react";
import Sidebar from "../components/ui/sidebar";
import { useState } from "react";

type Member = {
  id: number;
  name: string;
  plan: "Monthly" | "Quarterly" | "Yearly";
  status: "Active" | "Inactive" | "Expired";
  paymentDue: boolean;
};

const mockMembers: Member[] = [
  {
    id: 1,
    name: "John Doe",
    plan: "Monthly",
    status: "Active",
    paymentDue: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    plan: "Quarterly",
    status: "Expired",
    paymentDue: true,
  },
  {
    id: 3,
    name: "Sam Wilson",
    plan: "Yearly",
    status: "Inactive",
    paymentDue: true,
  },
  {
    id: 4,
    name: "Emily Clark",
    plan: "Monthly",
    status: "Active",
    paymentDue: false,
  },
];

const statusColor = {
  Active: "text-green-600 bg-green-100",
  Inactive: "text-yellow-600 bg-yellow-100",
  Expired: "text-red-600 bg-red-100",
};

export default function Members() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleClear = () => {
    setName("");
    setAge("");
    setWeight("");
    setImage(null);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Members</h1>

        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr className="text-left">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {mockMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{member.id}</td>
                  <td className="px-6 py-4 font-medium">{member.name}</td>
                  <td className="px-6 py-4">{member.plan}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColor[member.status]
                      }`}
                    >
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

        {/* Add New Member Section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Add New Member
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Weight & Height Grouped */}
            <div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter height"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Auto-generated ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value="Auto-generated"
                  disabled
                  className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-md pl-4 pr-10 py-2 cursor-not-allowed"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                  <span className="w-3 h-3 inline-block bg-red-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="col-span-full md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
              {image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
            >
              Clear
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 hover:bg-black-700 text-white rounded-md"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
