
import { useState } from "react";
import {
  Plus, Search, Eye, Pencil, Trash2, X, FileText
} from "lucide-react";

const initialData = [
  { id: 1001, customer: "Rahul Sharma", product: "Odoo Software", plan: "Monthly Basic", date: "2026-10-20", expiry: "2026-11-20", amount: 1500, status: "Sent" },
  { id: 1002, customer: "Aman Verma", product: "Cloud Storage", plan: "Yearly Premium", date: "2026-10-22", expiry: "2026-11-22", amount: 12000, status: "Confirmed" },
  { id: 1003, customer: "Priya Singh", product: "CRM Software", plan: "Monthly Basic", date: "2026-10-25", expiry: "2026-11-25", amount: 2000, status: "Draft" },
];

const emptyForm = {
  customer: "",
  product: "",
  plan: "",
  date: "",
  expiry: "",
  amount: "",
  status: "Draft",
};

export default function Quotations() {
  const [quotations, setQuotations] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = quotations.filter((q) => {
    const matchSearch =
      q.customer.toLowerCase().includes(search.toLowerCase()) ||
      q.product.toLowerCase().includes(search.toLowerCase());

    return matchSearch && (filter === "All" || q.status === filter);
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
      setQuotations(quotations.map((q) =>
        q.id === editingId ? { ...data, id: editingId } : q
      ));
    } else {
      setQuotations([...quotations, { ...data, id: Date.now() }]);
    }

    closeForm();
  };

  const handleEdit = (q) => {
    setForm({ ...q, amount: String(q.amount) });
    setEditingId(q.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this quotation?")) {
      setQuotations(quotations.filter((q) => q.id !== id));
    }
  };

  const confirmQuotation = (id) => {
    setQuotations(quotations.map((q) =>
      q.id === id ? { ...q, status: "Confirmed" } : q
    ));
    setSelected(null);
  };

  const badge = {
    Draft: "bg-slate-100 text-slate-600",
    Sent: "bg-blue-100 text-blue-700",
    Confirmed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const stats = [
    ["Total", quotations.length],
    ["Draft", quotations.filter(q => q.status === "Draft").length],
    ["Sent", quotations.filter(q => q.status === "Sent").length],
    ["Confirmed", quotations.filter(q => q.status === "Confirmed").length],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quotations</h1>
          <p className="mt-2 text-slate-500">
            Create and manage customer subscription quotations.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Create Quotation
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label} Quotations</p>
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
              placeholder="Search quotations..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5"
          >
            {["All", "Draft", "Sent", "Confirmed", "Cancelled"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Quotation ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product / Plan</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-violet-700">#{q.id}</td>
                  <td className="p-4 font-medium text-slate-800">{q.customer}</td>
                  <td className="p-4">
                    <p className="text-slate-700">{q.product}</p>
                    <p className="text-xs text-slate-400">{q.plan}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{q.date}</td>
                  <td className="p-4 font-medium">₹{q.amount.toLocaleString("en-IN")}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[q.status]}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(q)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Eye size={17} /></button>
                      <button onClick={() => handleEdit(q)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil size={17} /></button>
                      <button onClick={() => handleDelete(q.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="p-10 text-center text-slate-400">No quotations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Quotation" : "Create Quotation"}</h2>
              <button onClick={closeForm}><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["customer", "Customer Name"],
                  ["product", "Product Name"],
                  ["plan", "Subscription Plan"],
                  ["amount", "Amount (₹)"],
                  ["date", "Quotation Date"],
                  ["expiry", "Expiry Date"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="mb-1 block text-sm font-medium">{label}</label>
                    <input
                      required
                      name={name}
                      type={name === "date" || name === "expiry" ? "date" : name === "amount" ? "number" : "text"}
                      min={name === "amount" ? "0" : undefined}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3">
                    {["Draft", "Sent", "Confirmed", "Cancelled"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={closeForm} className="rounded-xl border px-5 py-2.5">Cancel</button>
                <button type="submit" className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white">{editingId ? "Update Quotation" : "Save Quotation"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Quotation Details</h2>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>
            <div className="space-y-3 text-sm">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2">
                  <span className="capitalize text-slate-500">{key}</span>
                  <span className="font-medium text-slate-800">{String(value)}</span>
                </div>
              ))}
            </div>
            {selected.status === "Sent" && (
              <button
                onClick={() => confirmQuotation(selected.id)}
                className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
              >
                Confirm Quotation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
