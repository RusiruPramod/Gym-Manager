import React, { useEffect, useState } from "react";
import { Bell, CheckCircle2, AlertCircle } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";

type Notification = {
  notificationId: string;
  message: string;
  dateCreated: string;
  isRead: boolean;
  type: "Payment Expired" | "General";
};

const mockNotifications: Notification[] = [
  {
    notificationId: "1",
    message: "John Doe's membership has expired.",
    dateCreated: "2025-05-26T10:00:00Z",
    isRead: false,
    type: "Payment Expired",
  },
  {
    notificationId: "2",
    message: "Gym will be closed on June 1st for maintenance.",
    dateCreated: "2025-05-25T15:30:00Z",
    isRead: true,
    type: "General",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.notificationId === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6" /> Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications available.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.notificationId}
                className={`rounded-lg border shadow-sm p-4 border-l-4 ${
                  notification.type === "Payment Expired"
                    ? "border-red-500"
                    : "border-blue-500"
                } ${!notification.isRead ? "bg-blue-50" : "bg-white"}`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {notification.type === "Payment Expired" ? (
                        <AlertCircle className="text-red-500 w-5 h-5" />
                      ) : (
                        <Bell className="text-blue-500 w-5 h-5" />
                      )}
                      <span className="font-medium">
                        {notification.message}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.dateCreated).toLocaleString()}
                    </p>
                  </div>

                  {!notification.isRead ? (
                    <button
                      onClick={() => markAsRead(notification.notificationId)}
                      className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <div className="flex items-center text-green-600 text-sm gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Read
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
