
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Layers,
  RefreshCw,
  FileText,
  Receipt,
  Wallet,
  Users,
  Tag,
  ChartNoAxesColumn,
  Settings
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/products", icon: Package },
  { name: "Plans", path: "/plans", icon: Layers },
  { name: "Subscriptions", path: "/subscriptions", icon: RefreshCw },
  { name: "Quotations", path: "/quotations", icon: FileText },
  { name: "Invoices", path: "/invoices", icon: Receipt },
  { name: "Payments", path: "/payments", icon: Wallet },
  { name: "Customers", path: "/customers", icon: Users },
  { name: "Discounts", path: "/discounts", icon: Tag },
  { name: "Reports", path: "/reports", icon: ChartNoAxesColumn },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-5 shrink-0">

      <div className="text-2xl font-bold mb-10">
        Brightloop
        <p className="text-xs text-slate-400 font-normal">
          Subscription System
        </p>
      </div>

      <nav className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="mt-12 border-t border-slate-700 pt-5">
        <p className="font-semibold">Parvej Hashami</p>
        <p className="text-sm text-slate-400">Administrator</p>
      </div>

    </aside>
  );
}

export default Sidebar;
