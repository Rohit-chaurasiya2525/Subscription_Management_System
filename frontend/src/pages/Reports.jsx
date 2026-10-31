
import { useState } from "react";
import {
  Download, TrendingUp, Users, CreditCard,
  FileText, CalendarDays
} from "lucide-react";

const revenueData = [
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 55000 },
  { month: "Jul", revenue: 48000 },
  { month: "Aug", revenue: 70000 },
  { month: "Sep", revenue: 65000 },
  { month: "Oct", revenue: 85000 },
];

const subscriptionData = [
  { id: 1, customer: "Rahul Sharma", plan: "Monthly Basic", amount: 1500, status: "Active" },
  { id: 2, customer: "Aman Verma", plan: "Yearly Premium", amount: 12000, status: "Active" },
  { id: 3, customer: "Priya Singh", plan: "Monthly Basic", amount: 2000, status: "Paused" },
];

const overdueData = [
  { id: "INV-1003", customer: "Priya Singh", due: "2026-10-25", amount: 2360, status: "Overdue" },
  { id: "INV-1004", customer: "Amit Kumar", due: "2026-10-20", amount: 5000, status: "Overdue" },
];

export default function Reports() {
  const [period, setPeriod] = useState("Last 6 Months");

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSubscriptions = subscriptionData.length;
  const activeSubscriptions = subscriptionData.filter(s => s.status === "Active").length;
  const overdueAmount = overdueData.reduce((sum, item) => sum + item.amount, 0);

  const maxRevenue = Math.max(...revenueData.map(item => item.revenue));

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "bg-green-50 text-green-600" },
    { label: "Total Subscriptions", value: totalSubscriptions, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Active Subscriptions", value: activeSubscriptions, icon: CreditCard, color: "bg-violet-50 text-violet-600" },
    { label: "Overdue Amount", value: `₹${overdueAmount.toLocaleString("en-IN")}`, icon: FileText, color: "bg-red-50 text-red-600" },
  ];

  const downloadCSV = (filename, rows) => {
    const csv = [
      Object.keys(rows[0]).join(","),
      ...rows.map(row =>
        Object.values(row).map(value =>
          `"${String(value).replaceAll('"', '""')}"`
        ).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="mt-2 text-slate-500">
            Monitor revenue, subscriptions and business performance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <CalendarDays size={18} className="text-slate-500" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
            <option>Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={21} />
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Revenue Overview</h2>
            <p className="mt-1 text-sm text-slate-500">Monthly revenue performance</p>
          </div>
          <button
            onClick={() => downloadCSV("revenue-report.csv", revenueData)}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <Download size={17} /> Export CSV
          </button>
        </div>

        <div className="flex h-64 items-end justify-around gap-3 border-b border-l border-slate-200 px-3">
          {revenueData.map(item => (
            <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-xs font-medium text-slate-500">
                ₹{(item.revenue / 1000).toFixed(0)}k
              </span>
              <div
                title={`₹${item.revenue.toLocaleString("en-IN")}`}
                className="w-full max-w-14 rounded-t-lg bg-violet-500 transition-all hover:bg-violet-700"
                style={{ height: `${(item.revenue / maxRevenue) * 75}%` }}
              />
              <span className="text-xs text-slate-500">{item.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Report */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Subscription Report</h2>
            <p className="text-sm text-slate-500">Customer subscription overview</p>
          </div>
          <button
            onClick={() => downloadCSV("subscription-report.csv", subscriptionData)}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Download size={17} /> Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionData.map(item => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="p-4 font-medium">{item.customer}</td>
                  <td className="p-4 text-slate-600">{item.plan}</td>
                  <td className="p-4 font-medium">₹{item.amount.toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overdue Invoices */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Overdue Invoices</h2>
            <p className="text-sm text-slate-500">Payments awaiting collection</p>
          </div>
          <button
            onClick={() => downloadCSV("overdue-invoices.csv", overdueData)}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
          >
            <Download size={17} /> Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {overdueData.map(item => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-violet-700">{item.id}</td>
                  <td className="p-4">{item.customer}</td>
                  <td className="p-4 text-sm text-slate-600">{item.due}</td>
                  <td className="p-4 font-medium">₹{item.amount.toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
