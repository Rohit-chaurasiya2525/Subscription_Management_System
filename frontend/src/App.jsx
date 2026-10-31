
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Plans from "./pages/Plans";
import Subscriptions from "./pages/Subscriptions";
import Quotations from "./pages/Quotations";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers";
import Discounts from "./pages/Discounts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

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

          <Route path="/products" element={<Products />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
         <Route path="/quotations" element={<Quotations />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<ModulePage title="Page Not Found" />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
