
import { useState } from "react";
import {
  User, Building2, Bell, ShieldCheck, Save, Camera
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@brightloop.com",
    phone: "9876543210",
    role: "Administrator",
  });

  const [company, setCompany] = useState({
    name: "Brightloop Software",
    email: "info@brightloop.com",
    phone: "9876543210",
    address: "Lucknow, Uttar Pradesh, India",
    website: "www.brightloop.com",
  });

  const [preferences, setPreferences] = useState({
    billingPeriod: "Monthly",
    currency: "INR (₹)",
    tax: 18,
    autoRenewal: true,
    autoInvoice: true,
  });

  const [notifications, setNotifications] = useState({
    newSubscription: true,
    paymentReceived: true,
    overdueInvoice: true,
    renewalReminder: false,
    productUpdates: false,
  });

  const tabs = [
    { name: "Profile", icon: User },
    { name: "Company", icon: Building2 },
    { name: "Subscription", icon: ShieldCheck },
    { name: "Notifications", icon: Bell },
  ];

  const handleChange = (e, setter) => {
    const { name, value, type, checked } = e.target;
    setter(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    alert(`${activeTab} settings saved successfully!`);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const toggle = (label, name, state, setter) => (
    <label
      key={name}
      className="flex cursor-pointer items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0"
    >
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={state[name]}
        onChange={(e) => handleChange(e, setter)}
        className="h-5 w-5 accent-violet-600"
      />
    </label>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-500">
          Manage your account, company and application preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Settings Sidebar */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          {tabs.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === name
                  ? "bg-violet-50 text-violet-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={19} />
              {name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {activeTab === "Profile" && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Profile Settings</h2>
              <p className="mt-1 text-sm text-slate-500">Manage your personal information.</p>

              <div className="my-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{profile.name}</p>
                  <p className="text-sm text-slate-500">{profile.role}</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ["name", "Full Name"],
                  ["email", "Email Address"],
                  ["phone", "Phone Number"],
                  ["role", "Role"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className={labelClass}>{label}</label>
                    <input
                      name={name}
                      value={profile[name]}
                      onChange={(e) => handleChange(e, setProfile)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Company" && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Company Settings</h2>
              <p className="mt-1 text-sm text-slate-500">Manage your business information.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[
                  ["name", "Company Name"],
                  ["email", "Company Email"],
                  ["phone", "Phone Number"],
                  ["website", "Website"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className={labelClass}>{label}</label>
                    <input
                      name={name}
                      value={company[name]}
                      onChange={(e) => handleChange(e, setCompany)}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className={labelClass}>Company Address</label>
                  <textarea
                    rows="3"
                    name="address"
                    value={company.address}
                    onChange={(e) => handleChange(e, setCompany)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Subscription" && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Subscription Preferences</h2>
              <p className="mt-1 text-sm text-slate-500">Set your default billing preferences.</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Default Billing Period</label>
                  <select
                    name="billingPeriod"
                    value={preferences.billingPeriod}
                    onChange={(e) => handleChange(e, setPreferences)}
                    className={inputClass}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Currency</label>
                  <select
                    name="currency"
                    value={preferences.currency}
                    onChange={(e) => handleChange(e, setPreferences)}
                    className={inputClass}
                  >
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Default Tax (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="tax"
                    value={preferences.tax}
                    onChange={(e) => handleChange(e, setPreferences)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                {toggle("Enable automatic renewal", "autoRenewal", preferences, setPreferences)}
                {toggle("Generate invoices automatically", "autoInvoice", preferences, setPreferences)}
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">Notification Settings</h2>
              <p className="mt-1 text-sm text-slate-500">Choose which notifications you want to receive.</p>

              <div className="mt-6">
                {toggle("New subscription notifications", "newSubscription", notifications, setNotifications)}
                {toggle("Payment received notifications", "paymentReceived", notifications, setNotifications)}
                {toggle("Overdue invoice alerts", "overdueInvoice", notifications, setNotifications)}
                {toggle("Subscription renewal reminders", "renewalReminder", notifications, setNotifications)}
                {toggle("Product updates and announcements", "productUpdates", notifications, setNotifications)}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end border-t border-slate-100 pt-5">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
