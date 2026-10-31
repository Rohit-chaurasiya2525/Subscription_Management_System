
import { useState } from "react";
import {
  Plus, Search, Eye, Pencil, Trash2, X, CreditCard
} from "lucide-react";

const initialPayments = [
  { id: "PAY-1001", customer: "Rahul Sharma", invoice: "INV-1001", amount: 1770, method: "UPI", transaction: "UPI782910", date: "2026-10-20", status: "Completed" },
  { id: "PAY-1002", customer: "Aman Verma", invoice: "INV-1002", amount: 14160, method: "Credit Card", transaction: "CC928371", date: "2026-10-22", status: "Pending" },
  { id: "PAY-1003", customer: "Priya Singh", invoice: "INV-1003", amount: 2360, method: "Net Banking", transaction: "NB123456", date: "2026-10-25", status: "Failed" },
];

const emptyForm = {
  customer: "",
  invoice: "",
  amount: "",
  method: "UPI",
  transaction: "",
  date: "",
  status: "Pending",
  notes: "",
};

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = payments.filter((p) => {
    const match =
      p.customer.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.invoice.toLowerCase().includes(search.toLowerCase());

    return match && (filter === "All" || p.status === filter);
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...form, amount: Number(form.amount) };

    if (editingId) {
      setPayments(payments.map((p) =>
        p.id === editingId ? { ...data, id: editingId } : p
      ));
    } else {
      setPayments([
        ...payments,
        { ...data, id: `PAY-${Date.now().toString().slice(-6)}` },
      ]);
    }

    closeForm();
  };

  const handleEdit = (payment) => {
    setForm({ ...payment, amount: String(payment.amount) });
    setEditingId(payment.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this payment record?")) {
      setPayments(payments.filter((p) => p.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    setPayments(payments.map((p) =>
      p.id === id ? { ...p, status } : p
    ));
    setSelected(null);
  };

  const completed = payments.filter(p => p.status === "Completed");
  const totalReceived = completed.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    ["Total Payments", payments.length],
    ["Completed", completed.length],
    ["Pending", payments.filter(p => p.status === "Pending").length],
    ["Total Received", `₹${totalReceived.toLocaleString("en-IN")}`],
  ];

  const badge = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-amber-100 text-amber-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
          <p className="mt-2 text-slate-500">
            Track transactions and manage customer payments.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Add Payment
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{value}</h2>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search size={19} className="absolute left-3 top-3 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payment or customer..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5"
          >
            {["All", "Completed", "Pending", "Failed", "Refunded"].map(s =>
              <option key={s}>{s}</option>
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Invoice</th>
                <th className="p-4">Method</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-violet-700">{p.id}</td>
                  <td className="p-4 font-medium text-slate-800">{p.customer}</td>
                  <td className="p-4 text-sm text-slate-600">{p.invoice}</td>
                  <td className="p-4 text-sm text-slate-600">{p.method}</td>
                  <td className="p-4 text-sm text-slate-600">{p.date}</td>
                  <td className="p-4 font-semibold">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(p)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Eye size={17} /></button>
                      <button onClick={() => handleEdit(p)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil size={17} /></button>
                      <button onClick={() => handleDelete(p.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="8" className="p-10 text-center text-slate-400">No payments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Payment" : "Add Payment"}</h2>
              <button onClick={closeForm}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["customer", "Customer Name"],
                  ["invoice", "Invoice ID"],
                  ["amount", "Payment Amount (₹)"],
                  ["transaction", "Transaction ID"],
                  ["date", "Payment Date"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="mb-1 block text-sm font-medium">{label}</label>
                    <input
                      required
                      name={name}
                      type={name === "date" ? "date" : name === "amount" ? "number" : "text"}
                      min={name === "amount" ? "0" : undefined}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-1 block text-sm font-medium">Payment Method</label>
                  <select name="method" value={form.method} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3">
                    {["UPI", "Credit Card", "Debit Card", "Net Banking", "Cash", "Bank Transfer"].map(m =>
                      <option key={m}>{m}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Payment Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3">
                    {["Pending", "Completed", "Failed", "Refunded"].map(s =>
                      <option key={s}>{s}</option>
                    )}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                    placeholder="Additional payment notes..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={closeForm} className="rounded-xl border px-5 py-2.5">Cancel</button>
                <button type="submit" className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white">
                  {editingId ? "Update Payment" : "Save Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>
            <div className="space-y-3 text-sm">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2">
                  <span className="capitalize text-slate-500">{key}</span>
                  <span className="text-right font-medium">{String(value || "-")}</span>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">Update Status</label>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                className="w-full rounded-xl border p-3"
              >
                {["Pending", "Completed", "Failed", "Refunded"].map(s =>
                  <option key={s}>{s}</option>
                )}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
