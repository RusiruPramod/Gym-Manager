import React, { useState } from "react";
import {
  Settings,
  Fingerprint,
  QrCode,
  ToggleRight,
  ToggleLeft,
  Lock,
  Mail,
  ImagePlus,
  Bell,
  Smartphone,
  Monitor,
  BrainCircuit,
  Moon,
  LayoutGrid,
  Languages,
  CreditCard,
  ReceiptText,
  Tags,
  Download,
  Trash2,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    enableQR: true,
    enableFingerprint: true,
    notifications: true,
    emailReminders: true,
    smsAlerts: false,
    twoFactorAuth: false,
    autoRenewal: true,
    darkMode: false,
    aiAssistance: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderToggle = (label, icon, key, description) => (
    <div className="bg-white shadow rounded-xl p-5 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h2 className="text-lg font-semibold">{label}</h2>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
        </div>
        <button
          onClick={() => toggleSetting(key)}
          className="focus:outline-none"
        >
          {settings[key] ? (
            <ToggleRight className="text-green-500 w-7 h-7" />
          ) : (
            <ToggleLeft className="text-gray-400 w-7 h-7" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed h-full border-r bg-white shadow z-10">
        <Sidebar />
      </aside>
      <main className="ml-64 flex-1 px-6 py-10 space-y-10 bg-gray-50">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <Settings className="w-6 h-6" /> System Settings
        </h1>

        {/* Section 1: Profile & Security */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Profile & Security</h2>
          {renderToggle("Two-Factor Authentication", <Lock className="text-purple-500 w-6 h-6" />, "twoFactorAuth", "Enable extra login security.")}
          <div className="bg-white p-5 rounded-xl border shadow">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500 w-6 h-6" />
              <div>
                <p className="font-semibold">Email Address</p>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <ImagePlus className="text-pink-500 w-6 h-6" />
            <span className="font-semibold">Upload Profile Picture</span>
          </div>
        </section>

        {/* Section 2: Gym Access */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Gym Access Settings</h2>
          {renderToggle("QR Code System", <QrCode className="text-blue-500 w-6 h-6" />, "enableQR")}
          {renderToggle("Fingerprint System", <Fingerprint className="text-purple-500 w-6 h-6" />, "enableFingerprint")}
          <div className="bg-white p-5 rounded-xl border shadow">
            <h3 className="font-semibold">Opening/Closing Time</h3>
            <p className="text-sm text-gray-500">Mon–Sun: 6:00 AM – 10:00 PM</p>
          </div>
        </section>

        {/* Section 3: Notification Settings */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Notifications</h2>
          {renderToggle("Push Notifications", <Bell className="text-orange-500 w-6 h-6" />, "notifications")}
          {renderToggle("Email Reminders", <Mail className="text-blue-500 w-6 h-6" />, "emailReminders")}
          {renderToggle("SMS Alerts", <Smartphone className="text-gray-700 w-6 h-6" />, "smsAlerts")}
        </section>

        {/* Section 4: Device Management */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Device Management</h2>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <Monitor className="text-gray-700 w-6 h-6" />
            <span className="font-semibold">3 Trusted Devices</span>
          </div>
          {renderToggle("AI Assistance", <BrainCircuit className="text-indigo-500 w-6 h-6" />, "aiAssistance")}
        </section>

        {/* Section 5: Appearance Settings */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Appearance</h2>
          {renderToggle("Dark Mode", <Moon className="text-gray-900 w-6 h-6" />, "darkMode")}
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <LayoutGrid className="text-teal-500 w-6 h-6" />
            <span className="font-semibold">Dashboard Layout: Grid</span>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <Languages className="text-green-500 w-6 h-6" />
            <span className="font-semibold">Language: English (US)</span>
          </div>
        </section>

        {/* Section 6: Billing & Membership */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Billing & Membership</h2>
          {renderToggle("Auto-Renewal", <CreditCard className="text-red-500 w-6 h-6" />, "autoRenewal")}
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <ReceiptText className="text-blue-600 w-6 h-6" />
            <span className="font-semibold">Invoice Preference: Monthly</span>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <Tags className="text-yellow-500 w-6 h-6" />
            <span className="font-semibold">Membership Plan: Gold</span>
          </div>
        </section>

        {/* Section 7: Data & Privacy */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold">Data & Privacy</h2>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <Download className="text-green-500 w-6 h-6" />
            <span className="font-semibold">Download My Data</span>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3 text-red-600">
            <Trash2 className="w-6 h-6" />
            <span className="font-semibold">Delete My Account</span>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow flex items-center gap-3">
            <ShieldCheck className="text-blue-500 w-6 h-6" />
            <span className="font-semibold">Privacy: Attendance Visible Only to Admin</span>
          </div>
        </section>

        {/* Logout Option */}
        <div className="pt-10">
          <button className="flex items-center gap-2 text-red-500 font-semibold">
            <LogOut className="w-5 h-5" /> 
            <Link to="/login" className="text-red-500 hover:underline">logout</Link>
          </button>
        </div>
      </main>
    </div>
  );
}