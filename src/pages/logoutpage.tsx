import React, { useState } from "react";
import { LogOut, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import clsx from "clsx";

export default function LogoutModal() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleLogout = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/login");
    }, 700); // Match transition duration
  };

  const cancelLogout = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar */}
      <aside className="w-64 h-full bg-white shadow-md z-50">
        <Sidebar />
      </aside>

      {/* Modal Overlay */}
      <div className="flex-1 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <div
          className={clsx(
            "relative bg-gray-900 text-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-700 text-center transition-all duration-700",
            fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        >
          <XCircle
            className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-white"
            onClick={cancelLogout}
          />
          <LogOut className="w-12 h-12 text-red-500 mb-4 animate-pulse mx-auto" />
          <h2 className="text-2xl font-bold mb-2">Confirm Logout</h2>
          <p className="text-sm text-gray-300 mb-6">
            Are you sure you want to logout? You can always come back anytime.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
            <button
              onClick={cancelLogout}
              className="px-5 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
