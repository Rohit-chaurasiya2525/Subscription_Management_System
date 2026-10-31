
import { useState } from "react";
import {
  Plus, Search, Eye, Pencil, Trash2, X, Tag, Percent
} from "lucide-react";

const initialDiscounts = [
  {
    id: 1,
    name: "New Customer Offer",
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    min_purchase: 1000,
    usage_limit: 100,
    used: 25,
    start_date: "2026-10-01",
    end_date: "2026-12-31",
    status: "Active",
  },
  {
    id: 2,
    name: "Festive Discount",
    code: "FESTIVE500",
    type: "Fixed",
    value: 500,
    min_purchase: 2000,
    usage_limit: 50,
    used: 12,
    start_date: "2026-10-01",
    end_date: "2026-11-30",
    status: "Active",
  },
  {
    id: 3,
    name: "Old Customer Offer",
    code: "OLD15",
    type: "Percentage",
    value: 15,
    min_purchase: 500,
    usage_limit: 20,
    used: 20,
    start_date: "2026-08-01",
    end_date: "2026-09-30",
    status: "Expired",
  },
];

const emptyForm = {
  name: "",
  code: "",
  type: "Percentage",
  value: "",
  min_purchase: 0,
  usage_limit: 100,
  used: 0,
  start_date: "",
  end_date: "",
  status: "Active",
};

export default function Discounts() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = discounts.filter((d) => {
    const match =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase());

    return match && (filter === "All" || d.status === filter);
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
      code: form.code.trim().toUpperCase(),
      value: Number(form.value),
      min_purchase: Number(form.min_purchase),
      usage_limit: Number(form.usage_limit),
      used: Number(form.used),
    };

    if (editingId) {
      setDiscounts(discounts.map((d) =>
        d.id === editingId ? { ...data, id: editingId } : d
      ));
    } else {
      setDiscounts([...discounts, { ...data, id: Date.now() }]);
    }

    closeForm();
  };

  const handleEdit = (discount) => {
    setForm({
      ...discount,
      value: String(discount.value),
      min_purchase: String(discount.min_purchase),
      usage_limit: String(discount.usage_limit),
      used: String(discount.used),
    });
    setEditingId(discount.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this discount?")) {
      setDiscounts(discounts.filter((d) => d.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    setDiscounts(discounts.map((d) =>
      d.id === id ? { ...d, status } : d
    ));
    setSelected(null);
  };

  const stats = [
    ["Total Discounts", discounts.length],
    ["Active", discounts.filter(d => d.status === "Active").length],
    ["Expired", discounts.filter(d => d.status === "Expired").length],
    ["Total Uses", discounts.reduce((sum, d) => sum + d.used, 0)],
  ];

  const badge = {
    Active: "bg-green-100 text-green-700",
    Expired: "bg-red-100 text-red-700",
    Inactive: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Discounts</h1>
          <p className="mt-2 text-slate-500">
            Create promotional offers and manage discount rules.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Create Discount
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
              placeholder="Search discount or code..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5"
          >
            {["All", "Active", "Expired", "Inactive"].map(s =>
              <option key={s}>{s}</option>
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Discount Name</th>
                <th className="p-4">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Minimum Purchase</th>
                <th className="p-4">Usage</th>
                <th className="p-4">Validity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-slate-800">{d.name}</td>
                  <td className="p-4">
                    <span className="rounded-lg bg-violet-50 px-3 py-1 font-mono text-xs font-bold text-violet-700">
                      {d.code}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-700">
                    {d.type === "Percentage" ? `${d.value}%` : `₹${d.value}`}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    ₹{d.min_purchase.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {d.used}/{d.usage_limit}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {d.start_date} to {d.end_date}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(d)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Eye size={17} /></button>
                      <button onClick={() => handleEdit(d)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil size={17} /></button>
                      <button onClick={() => handleDelete(d.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-10 text-center text-slate-400">
                    No discounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Discount" : "Create Discount"}
              </h2>
              <button onClick={closeForm}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Discount Name</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="e.g. Festival Offer" className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Discount Code</label>
                  <input required name="code" value={form.code} onChange={handleChange} placeholder="e.g. SAVE20" className="w-full rounded-xl border border-slate-200 p-3 uppercase outline-none focus:border-violet-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Discount Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3">
                    <option>Percentage</option>
                    <option>Fixed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Discount Value {form.type === "Percentage" ? "(%)" : "(₹)"}
                  </label>
                  <input required min="0" max={form.type === "Percentage" ? "100" : undefined} type="number" name="value" value={form.value} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Minimum Purchase (₹)</label>
                  <input min="0" type="number" name="min_purchase" value={form.min_purchase} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Usage Limit</label>
                  <input required min="1" type="number" name="usage_limit" value={form.usage_limit} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Start Date</label>
                  <input required type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3" />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">End Date</label>
                  <input required type="date" min={form.start_date || undefined} name="end_date" value={form.end_date} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-3">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={closeForm} className="rounded-xl border px-5 py-2.5">Cancel</button>
                <button type="submit" className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white">
                  {editingId ? "Update Discount" : "Save Discount"}
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
              <h2 className="text-xl font-bold">Discount Details</h2>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>

            <div className="space-y-3 text-sm">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2">
                  <span className="capitalize text-slate-500">{key.replaceAll("_", " ")}</span>
                  <span className="text-right font-medium">{String(value)}</span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">Update Status</label>
              <select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)} className="w-full rounded-xl border p-3">
                <option>Active</option>
                <option>Inactive</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
