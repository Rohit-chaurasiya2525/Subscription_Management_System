
import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, Package, X } from "lucide-react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "Software",
    sales_price: "",
    cost_price: "",
    notes: "",
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products/");
      setProducts(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Form input handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        sales_price: Number(form.sales_price),
        cost_price: Number(form.cost_price),
      };

      if (editingId !== null) {
        await API.put(`/products/${editingId}`, payload);
      } else {
        await API.post("/products/", payload);
      }

      setShowForm(false);
      setEditingId(null);

      setForm({
        name: "",
        type: "Software",
        sales_price: "",
        cost_price: "",
        notes: "",
      });

      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to save product.");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      type: product.type,
      sales_price: product.sales_price,
      cost_price: product.cost_price,
      notes: product.notes || "",
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await API.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8">

      {/* Page heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Products
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your products and pricing.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              name: "",
              type: "Software",
              sales_price: "",
              cost_price: "",
              notes: "",
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl font-medium"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search and count */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={19}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <p className="text-sm text-slate-500">
            Total Products: {products.length}
          </p>

        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl mb-4 flex justify-between">
            {error}
            <button onClick={() => setError("")}>
              <X size={18} />
            </button>
          </div>
        )}

        {/* Products table */}
        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Sales Price</th>
                <th className="p-4">Cost Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-10 text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-10">
                    <Package size={35} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-slate-500">No products found.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">

                    <td className="p-4 font-medium text-slate-800">
                      {product.name}
                    </td>

                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {product.type}
                      </span>
                    </td>

                    <td className="p-4 text-slate-700">
                      ₹{Number(product.sales_price).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4 text-slate-700">
                      ₹{Number(product.cost_price).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
          >

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {editingId !== null ? "Edit Product" : "Add New Product"}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-slate-500"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-200"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 bg-white"
                >
                  <option value="Software">Software</option>
                  <option value="Service">Service</option>
                  <option value="Physical">Physical Product</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sales Price (₹)
                  </label>
                  <input
                    type="number"
                    name="sales_price"
                    min="0"
                    step="0.01"
                    value={form.sales_price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-3"
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cost Price (₹)
                  </label>
                  <input
                    type="number"
                    name="cost_price"
                    min="0"
                    step="0.01"
                    value={form.cost_price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl p-3"
                    placeholder="900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded-xl p-3"
                  placeholder="Product description..."
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
              >
                {editingId !== null ? "Update Product" : "Save Product"}
              </button>
            </div>

          </form>
        </div>
      )}

    </main>
  );
}

export default Products;
