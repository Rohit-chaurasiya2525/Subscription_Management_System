
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <Outlet />
      </div>

    </div>
  );
}

export default DashboardLayout;
