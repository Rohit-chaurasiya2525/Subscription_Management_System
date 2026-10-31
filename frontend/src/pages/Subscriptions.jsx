
import { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, X, Eye
} from "lucide-react";

const initialSubscriptions = [
  {
    id: 1,
    customer: "Rahul Sharma",
    product: "Odoo Software",
    plan: "Monthly Basic",
    start_date: "2026-10-01",
    next_billing: "2026-11-01",
    amount: 1500,
    status: "Active",
  },
  {
    id: 2,
    customer: "Aman Verma",
    product: "Cloud Storage",
    plan: "Yearly Premium",
    start_date: "2026-09-15",
    next_billing: "2027-09-15",
    amount: 12000,
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Priya Singh",
    product: "CRM Software",
    plan: "Monthly Basic",
    start_date: "2026-08-01",
    next_billing: "2026-11-01",
    amount: 2000,
    status: "Paused",
  },
];

const emptyForm = {
  customer: "",
  product: "",
  plan: "",
  start_date: "",
  next_billing: "",
  amount: "",
  status: "Draft",
};

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer.toLowerCase().includes(search.toLowerCase()) ||
      sub.product.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
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
      setSubscriptions(subscriptions.map((sub) =>
        sub.id === editingId ? { ...data, id: editingId } : sub
      ));
    } else {
      setSubscriptions([
        ...subscriptions,
        { ...data, id: Date.now() },
      ]);
    }

    closeForm();
  };

  const handleEdit = (sub) => {
    setForm({ ...sub, amount: String(sub.amount) });
    setEditingId(sub.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this subscription?")) {
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    }
  };

  const changeStatus = (id, status) => {
    setSubscriptions(subscriptions.map((sub) =>
      sub.id === id ? { ...sub, status } : sub
    ));
    setSelected(null);
  };

  const statusStyle = {
    Draft: "bg-slate-100 text-slate-600",
    Confirmed: "bg-blue-100 text-blue-700",
    Active: "bg-green-100 text-green-700",
    Paused: "bg-amber-100 text-amber-700",
    Closed: "bg-red-100 text-red-700",
    Quotation: "bg-purple-100 text-purple-700",
  };

  const counts = {
    Total: subscriptions.length,
    Active: subscriptions.filter(s => s.status === "Active").length,
    Paused: subscriptions.filter(s => s.status === "Paused").length,
    Closed: subscriptions.filter(s => s.status === "Closed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Subscriptions</h1>
          <p className="mt-2 text-slate-500">
            Manage customer subscriptions and their lifecycle.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Create Subscription
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Object.entries(counts).map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label} Subscriptions</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{value}</h2>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search size={19} className="absolute left-3 top-3 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customer or product..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none"
          >
            {["All", "Draft", "Quotation", "Confirmed", "Active", "Paused", "Closed"].map(status => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Product / Plan</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Next Billing</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-slate-800">{sub.customer}</td>
                  <td className="p-4">
                    <p className="font-medium text-slate-700">{sub.product}</p>
                    <p className="text-xs text-slate-400">{sub.plan}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{sub.start_date}</td>
                  <td className="p-4 text-sm text-slate-600">{sub.next_billing}</td>
                  <td className="p-4 font-medium text-slate-700">
                    ₹{Number(sub.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[sub.status] || statusStyle.Draft}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(sub)} title="View" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                        <Eye size={17} />
                      </button>
                      <button onClick={() => handleEdit(sub)} title="Edit" className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                        <Pencil size={17} />
                      </button>
                      <button onClick={() => handleDelete(sub.id)} title="Delete" className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400">
                    No subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Subscription" : "Create Subscription"}
              </h2>
              <button onClick={closeForm}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["customer", "Customer Name"],
                  ["product", "Product Name"],
                  ["plan", "Plan Name"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label className="mb-1 block text-sm font-medium">{label}</label>
                    <input
                      required
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-1 block text-sm font-medium">Amount (₹)</label>
                  <input
                    required
                    min="0"
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Start Date</label>
                  <input
                    required
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Next Billing Date</label>
                  <input
                    required
                    type="date"
                    name="next_billing"
                    value={form.next_billing}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  >
                    {["Draft", "Quotation", "Confirmed", "Active", "Paused", "Closed"].map(status => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={closeForm} className="rounded-xl border px-5 py-2.5">
                  Cancel
                </button>
                <button type="submit" className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white">
                  {editingId ? "Update Subscription" : "Save Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Subscription Details</h2>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>
            <div className="space-y-3 text-sm">
              {Object.entries(selected).filter(([key]) => key !== "id").map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2">
                  <span className="capitalize text-slate-500">{key.replaceAll("_", " ")}</span>
                  <span className="text-right font-medium text-slate-800">{String(value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">Update Status</label>
              <select
                value={selected.status}
                onChange={(e) => changeStatus(selected.id, e.target.value)}
                className="w-full rounded-xl border p-3"
              >
                {["Draft", "Quotation", "Confirmed", "Active", "Paused", "Closed"].map(status => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
