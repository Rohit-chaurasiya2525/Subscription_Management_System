
import { useState } from "react";
import {
  Plus, Search, Eye, Pencil, Trash2, X, Download
} from "lucide-react";

const initialInvoices = [
  { id: "INV-1001", customer: "Rahul Sharma", subscription: "Odoo Software", date: "2026-10-01", due: "2026-11-01", amount: 1500, tax: 18, status: "Paid" },
  { id: "INV-1002", customer: "Aman Verma", subscription: "Cloud Storage", date: "2026-10-15", due: "2026-11-15", amount: 12000, tax: 18, status: "Confirmed" },
  { id: "INV-1003", customer: "Priya Singh", subscription: "CRM Software", date: "2026-10-20", due: "2026-10-30", amount: 2000, tax: 18, status: "Draft" },
];

const emptyForm = {
  customer: "",
  subscription: "",
  date: "",
  due: "",
  amount: "",
  tax: 18,
  status: "Draft",
};

export default function Invoices() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = invoices.filter((inv) => {
    const match =
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());

    return match && (filter === "All" || inv.status === filter);
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

    const data = {
      ...form,
      amount: Number(form.amount),
      tax: Number(form.tax),
    };

    if (editingId) {
      setInvoices(invoices.map((inv) =>
        inv.id === editingId ? { ...data, id: editingId } : inv
      ));
    } else {
      setInvoices([
        ...invoices,
        { ...data, id: `INV-${Date.now().toString().slice(-6)}` },
      ]);
    }

    closeForm();
  };

  const handleEdit = (inv) => {
    setForm({
      ...inv,
      amount: String(inv.amount),
      tax: String(inv.tax),
    });
    setEditingId(inv.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    setInvoices(invoices.map((inv) =>
      inv.id === id ? { ...inv, status } : inv
    ));
    setSelected(null);
  };

  const totalAmount = (inv) =>
    inv.amount + (inv.amount * inv.tax) / 100;

  const stats = [
    ["Total Invoices", invoices.length],
    ["Paid", invoices.filter(i => i.status === "Paid").length],
    ["Pending", invoices.filter(i => i.status === "Confirmed").length],
    ["Draft", invoices.filter(i => i.status === "Draft").length],
  ];

  const badge = {
    Draft: "bg-slate-100 text-slate-600",
    Confirmed: "bg-blue-100 text-blue-700",
    Paid: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
          <p className="mt-2 text-slate-500">
            Create, track and manage customer invoices.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Create Invoice
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
              placeholder="Search invoice or customer..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5"
          >
            {["All", "Draft", "Confirmed", "Paid", "Cancelled"].map(s =>
              <option key={s}>{s}</option>
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Invoice Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-violet-700">{inv.id}</td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{inv.customer}</p>
                    <p className="text-xs text-slate-400">{inv.subscription}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{inv.date}</td>
                  <td className="p-4 text-sm text-slate-600">{inv.due}</td>
                  <td className="p-4 font-semibold">
                    ₹{totalAmount(inv).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(inv)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Eye size={17} /></button>
                      <button onClick={() => handleEdit(inv)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil size={17} /></button>
                      <button onClick={() => handleDelete(inv.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="p-10 text-center text-slate-400">No invoices found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Invoice" : "Create Invoice"}</h2>
              <button onClick={closeForm}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["customer", "Customer Name"],
                  ["subscription", "Subscription"],
                  ["amount", "Amount (₹)"],
                  ["tax", "Tax (%)"],
                  ["date", "Invoice Date"],
                  ["due", "Due Date"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="mb-1 block text-sm font-medium">{label}</label>
                    <input
                      required
                      name={name}
                      type={name === "date" || name === "due" ? "date" : name === "amount" || name === "tax" ? "number" : "text"}
                      min={name === "amount" ? "0" : name === "tax" ? "0" : undefined}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3">
                    {["Draft", "Confirmed", "Paid", "Cancelled"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-violet-50 p-4">
                <p className="text-sm text-violet-700">
                  Tax Amount: ₹{((Number(form.amount || 0) * Number(form.tax || 0)) / 100).toFixed(2)}
                </p>
                <p className="mt-1 font-bold text-violet-900">
                  Total: ₹{(Number(form.amount || 0) * (1 + Number(form.tax || 0) / 100)).toFixed(2)}
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={closeForm} className="rounded-xl border px-5 py-2.5">Cancel</button>
                <button type="submit" className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white">{editingId ? "Update Invoice" : "Save Invoice"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Invoice Details</h2>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>
            <div className="space-y-3 text-sm">
              <p><b>Invoice:</b> {selected.id}</p>
              <p><b>Customer:</b> {selected.customer}</p>
              <p><b>Subscription:</b> {selected.subscription}</p>
              <p><b>Invoice date:</b> {selected.date}</p>
              <p><b>Due date:</b> {selected.due}</p>
              <p><b>Subtotal:</b> ₹{selected.amount}</p>
              <p><b>Tax:</b> {selected.tax}%</p>
              <p><b>Total:</b> ₹{totalAmount(selected).toFixed(2)}</p>
              <p><b>Status:</b> {selected.status}</p>
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">Update Status</label>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                className="w-full rounded-xl border p-3"
              >
                {["Draft", "Confirmed", "Paid", "Cancelled"].map(s =>
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
