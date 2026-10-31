
import { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, X, CalendarDays
} from "lucide-react";

const initialPlans = [
  {
    id: 1,
    name: "Monthly Basic",
    billing_period: "Monthly",
    billing_interval: 1,
    minimum_quantity: 1,
    start_date: "2026-01-01",
    end_date: "2026-12-31",
    auto_close: false,
    pause_allowed: true,
    renewal_allowed: true,
  },
  {
    id: 2,
    name: "Yearly Premium",
    billing_period: "Yearly",
    billing_interval: 1,
    minimum_quantity: 1,
    start_date: "2026-01-01",
    end_date: "2027-12-31",
    auto_close: true,
    pause_allowed: true,
    renewal_allowed: true,
  },
];

const emptyForm = {
  name: "",
  billing_period: "Monthly",
  billing_interval: 1,
  minimum_quantity: 1,
  start_date: "",
  end_date: "",
  auto_close: false,
  pause_allowed: false,
  renewal_allowed: true,
};

export default function Plans() {
  const [plans, setPlans] = useState(initialPlans);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const planData = {
      ...form,
      billing_interval: Number(form.billing_interval),
      minimum_quantity: Number(form.minimum_quantity),
    };

    if (editingId) {
      setPlans(plans.map((plan) =>
        plan.id === editingId
          ? { ...planData, id: editingId }
          : plan
      ));
    } else {
      setPlans([...plans, { ...planData, id: Date.now() }]);
    }

    closeForm();
  };

  const handleEdit = (plan) => {
    setForm({ ...plan });
    setEditingId(plan.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((plan) => plan.id !== id));
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Plans</h1>
          <p className="mt-2 text-slate-500">
            Manage your subscription plans and billing cycles.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
        >
          <Plus size={19} /> Add Plan
        </button>
      </div>

      {/* Plans Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3 text-slate-400" size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plans..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>

          <p className="text-sm text-slate-500">
            Total Plans: {plans.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="p-4">Plan Name</th>
                <th className="p-4">Billing Period</th>
                <th className="p-4">Interval</th>
                <th className="p-4">Min. Quantity</th>
                <th className="p-4">Renewal</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="border-t border-slate-100">
                  <td className="p-4 font-semibold text-slate-800">
                    {plan.name}
                  </td>
                  <td className="p-4 text-slate-600">
                    {plan.billing_period}
                  </td>
                  <td className="p-4 text-slate-600">
                    Every {plan.billing_interval}
                  </td>
                  <td className="p-4 text-slate-600">
                    {plan.minimum_quantity}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      plan.renewal_allowed
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {plan.renewal_allowed ? "Allowed" : "Not Allowed"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPlans.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-400">
                    No plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Plan Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Plan" : "Create New Plan"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your subscription plan details.
                </p>
              </div>
              <button onClick={closeForm} className="rounded-lg p-2 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Plan Name</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Monthly Premium"
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Billing Period</label>
                  <select
                    name="billing_period"
                    value={form.billing_period}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Billing Interval</label>
                  <input
                    required
                    min="1"
                    type="number"
                    name="billing_interval"
                    value={form.billing_interval}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">Minimum Quantity</label>
                  <input
                    required
                    min="1"
                    type="number"
                    name="minimum_quantity"
                    value={form.minimum_quantity}
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
                  <label className="mb-1 block text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3 rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Plan Options</p>

                {[
                  ["auto_close", "Automatically close plan"],
                  ["pause_allowed", "Allow subscription pause"],
                  ["renewal_allowed", "Allow subscription renewal"],
                ].map(([name, label]) => (
                  <label key={name} className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name={name}
                      checked={form[name]}
                      onChange={handleChange}
                      className="h-4 w-4 accent-violet-600"
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white hover:bg-violet-700"
                >
                  {editingId ? "Update Plan" : "Save Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
