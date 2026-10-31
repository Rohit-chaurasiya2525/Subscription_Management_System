
import { Search, Bell, CircleHelp } from "lucide-react";

function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      <h2 className="text-lg font-semibold text-slate-800">
        Subscription Management System
      </h2>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl w-72">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <Bell size={21} className="text-slate-600 cursor-pointer" />

        <CircleHelp size={21} className="text-slate-600 cursor-pointer" />

        <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-semibold">
          P
        </div>

      </div>
    </header>
  );
}

export default Navbar;
