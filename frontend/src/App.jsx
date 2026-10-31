
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function ModulePage({ title }) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="text-slate-500 mt-2">
        Manage your {title.toLowerCase()} here.
      </p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<ModulePage title="Products" />} />
          <Route path="/plans" element={<ModulePage title="Plans" />} />
          <Route path="/subscriptions" element={<ModulePage title="Subscriptions" />} />
          <Route path="/quotations" element={<ModulePage title="Quotations" />} />
          <Route path="/invoices" element={<ModulePage title="Invoices" />} />
          <Route path="/payments" element={<ModulePage title="Payments" />} />
          <Route path="/customers" element={<ModulePage title="Customers" />} />
          <Route path="/discounts" element={<ModulePage title="Discounts" />} />
          <Route path="/reports" element={<ModulePage title="Reports" />} />
          <Route path="/settings" element={<ModulePage title="Settings" />} />

          <Route path="*" element={<ModulePage title="Page Not Found" />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
