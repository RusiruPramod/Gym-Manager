import { useState } from "react";
import { QrCode, Users, XCircle, Edit, Trash2, Search } from "lucide-react";
import Sidebar from "../components/ui/sidebar";

type Member = {
  memberId: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  nicNumber: string;
  email: string;
};

const mockMembers: Member[] = [
  { memberId: 1, name: "John Doe", age: 30, height: 175, weight: 80, nicNumber: "123456789V", email: "john@example.com" },
  { memberId: 2, name: "Jane Smith", age: 25, height: 165, weight: 60, nicNumber: "987654321V", email: "jane@example.com" },
  { memberId: 3, name: "Sam Wilson", age: 40, height: 180, weight: 90, nicNumber: "456789123V", email: "sam@example.com" },
  { memberId: 4, name: "Emily Clark", age: 28, height: 170, weight: 65, nicNumber: "321654987V", email: "emily@example.com" },
];

export default function Members() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrFilter, setQrFilter] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    email: "",
    nicNumber: "",
  });
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    nicNumber: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handleAddOrEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData: Member = {
      memberId: editingMember ? editingMember.memberId : members.length + 1,
      name: formData.name,
      age: parseInt(formData.age),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      nicNumber: formData.nicNumber,
      email: formData.email,
    };

    if (editingMember) {
      setMembers(members.map((m) => (m.memberId === editingMember.memberId ? memberData : m)));
    } else {
      setMembers([...members, memberData]);
    }

    setFormData({ name: "", age: "", height: "", weight: "", nicNumber: "", email: "" });
    setEditingMember(null);
    setIsModalOpen(false);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      age: member.age.toString(),
      height: member.height.toString(),
      weight: member.weight.toString(),
      nicNumber: member.nicNumber,
      email: member.email,
    });
    setIsModalOpen(true);
  };

  const handleRemoveMember = (memberId: number) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter((member) => member.memberId !== memberId));
    }
  };

  const handleQrScan = () => {
    const scannedNic = prompt("Enter NIC number from QR scan:");
    if (scannedNic) {
      setQrFilter(scannedNic);
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesName = member.name.toLowerCase().includes(searchFilters.name.toLowerCase());
    const matchesEmail = member.email.toLowerCase().includes(searchFilters.email.toLowerCase());
    const matchesNic = member.nicNumber.toLowerCase().includes(searchFilters.nicNumber.toLowerCase());
    const matchesQr = qrFilter ? member.nicNumber.includes(qrFilter) : true;
    return matchesName && matchesEmail && matchesNic && matchesQr;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Members</h1>
              <p className="text-slate-600">Manage your gym members and track their details.</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-slate-200">
                <span className="text-sm text-slate-600">Today:</span>
                <span className="ml-2 font-semibold text-slate-800">May 25, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              setEditingMember(null);
              setFormData({ name: "", age: "", height: "", weight: "", nicNumber: "", email: "" });
              setIsModalOpen(true);
            }}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200 text-center hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Add Member</span>
          </button>
          <button
            onClick={handleQrScan}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <QrCode className="w-6 h-6" />
            <span className="text-sm font-medium">Scan QR to Filter</span>
          </button>
          {(qrFilter || searchFilters.name || searchFilters.email || searchFilters.nicNumber) && (
            <button
              onClick={() => {
                setQrFilter("");
                setSearchFilters({ name: "", email: "", nicNumber: "" });
              }}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Search Filters */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Search by Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="name"
                value={searchFilters.name}
                onChange={handleSearchChange}
                placeholder="Enter name"
                className="w-full pl-10 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Search by Email</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="email"
                value={searchFilters.email}
                onChange={handleSearchChange}
                placeholder="Enter email"
                className="w-full pl-10 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Search by NIC Number</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                name="nicNumber"
                value={searchFilters.nicNumber}
                onChange={handleSearchChange}
                placeholder="Enter NIC number"
                className="w-full pl-10 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr className="text-left">
                <th className="px-6 py-3 font-medium text-slate-600">Name</th>
                <th className="px-6 py-3 font-medium text-slate-600">Age</th>
                <th className="px-6 py-3 font-medium text-slate-600">Height (cm)</th>
                <th className="px-6 py-3 font-medium text-slate-600">Weight (kg)</th>
                <th className="px-6 py-3 font-medium text-slate-600">NIC Number</th>
                <th className="px-6 py-3 font-medium text-slate-600">Email</th>
                <th className="px-6 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.memberId} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">{member.name}</td>
                  <td className="px-6 py-4 text-slate-600">{member.age}</td>
                  <td className="px-6 py-4 text-slate-600">{member.height}</td>
                  <td className="px-6 py-4 text-slate-600">{member.weight}</td>
                  <td className="px-6 py-4 text-slate-600">{member.nicNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{member.email}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                      title="Edit Member"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveMember(member.memberId)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      title="Remove Member"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Member Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  {editingMember ? "Edit Member" : "Add New Member"}
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingMember(null);
                    setFormData({ name: "", age: "", height: "", weight: "", nicNumber: "", email: "" });
                  }}
                  className="text-slate-600 hover:text-slate-800"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddOrEditMember}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600">NIC Number</label>
                    <input
                      type="text"
                      name="nicNumber"
                      value={formData.nicNumber}
                      onChange={handleInputChange}
                      required
                      disabled={!!editingMember || formData.nicNumber !== ""}
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingMember(null);
                      setFormData({ name: "", age: "", height: "", weight: "", nicNumber: "", email: "" });
                    }}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    {editingMember ? "Update Member" : "Add Member"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}