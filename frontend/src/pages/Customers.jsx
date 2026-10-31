
import { useState } from "react";
import {
  Plus, Search, Eye, Pencil, Trash2, X, Users
} from "lucide-react";

const initialCustomers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", company: "Tech Solutions", address: "Lucknow, UP", status: "Active" },
  { id: 2, name: "Aman Verma", email: "aman@gmail.com", phone: "9876543211", company: "Digital World", address: "Delhi, India", status: "Active" },
  { id: 3, name: "Priya Singh", email: "priya@gmail.com", phone: "9876543212", company: "Creative Studio", address: "Kanpur, UP", status: "Inactive" },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  status: "Active",
};

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = customers.filter((c) => {
    const match =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());

    return match && (filter === "All" || c.status === filter);
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

    if (editingId) {
      setCustomers(customers.map((c) =>
        c.id === editingId ? { ...form, id: editingId } : c
      ));
    } else {
      setCustomers([
        ...customers,
        { ...form, id: Date.now() },
      ]);
    }

    closeForm();
  };

  const handleEdit = (customer) => {
    setForm({ ...customer });
    setEditingId(customer.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const updateStatus = (id, status) => {
    setCustomers(customers.map((c) =>
      c.id === id ? { ...c, status } : c
    ));
    setSelected(null);
  };

  const stats = [
    ["Total Customers", customers.length],
    ["Active", customers.filter(c => c.status === "Active").length],
    ["Inactive", customers.filter(c => c.status === "Inactive").length],
    ["Companies", new Set(customers.map(c => c.company).filter(Boolean)).size],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="mt-2 text-slate-500">
            Manage your customers and their contact information.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Add Customer
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
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5"
          >
            {["All", "Active", "Inactive"].map(s =>
              <option key={s}>{s}</option>
            )}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Company</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t border-slate-100">
                  <td className="p-4">
                    <p className="font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.email}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{c.company || "-"}</td>
                  <td className="p-4 text-sm text-slate-600">{c.phone}</td>
                  <td className="p-4 text-sm text-slate-600">{c.address}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button onClick={() => setSelected(c)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Eye size={17} /></button>
                      <button onClick={() => handleEdit(c)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"><Pencil size={17} /></button>
                      <button onClick={() => handleDelete(c.id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-400">
                    No customers found.
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
                {editingId ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button onClick={closeForm}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["name", "Full Name"],
                  ["email", "Email Address"],
                  ["phone", "Phone Number"],
                  ["company", "Company Name"],
                  ["address", "Address"],
                ].map(([name, label]) => (
                  <div key={name} className={name === "address" ? "sm:col-span-2" : ""}>
                    <label className="mb-1 block text-sm font-medium">{label}</label>
                    <input
                      required={["name", "email", "phone"].includes(name)}
                      name={name}
                      type={name === "email" ? "email" : "text"}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={closeForm} className="rounded-xl border px-5 py-2.5">
                  Cancel
                </button>
                <button type="submit" className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white">
                  {editingId ? "Update Customer" : "Save Customer"}
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
              <h2 className="text-xl font-bold">Customer Details</h2>
              <button onClick={() => setSelected(null)}><X /></button>
            </div>

            <div className="space-y-3 text-sm">
              {Object.entries(selected).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b pb-2">
                  <span className="capitalize text-slate-500">{key}</span>
                  <span className="text-right font-medium text-slate-800">{String(value || "-")}</span>
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
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
