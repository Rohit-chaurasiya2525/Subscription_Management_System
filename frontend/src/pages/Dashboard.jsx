
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";

import {
  Wallet,
  Users,
  Receipt,
  CircleCheck
} from "lucide-react";

function Dashboard() {
  return (
    <main className="p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome to Subscription Management System
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Revenue"
          value="₹12,48,600"
          icon={Wallet}
          color="bg-violet-100 text-violet-600"
          change="+18.4%"
        />

        <StatCard
          title="Active Subscriptions"
          value="1,248"
          icon={Users}
          color="bg-blue-100 text-blue-600"
          change="+7.2%"
        />

        <StatCard
          title="Pending Payments"
          value="₹2,36,400"
          icon={Receipt}
          color="bg-orange-100 text-orange-600"
          change="+12.6%"
        />

        <StatCard
          title="Paid Invoices"
          value="1,036"
          icon={CircleCheck}
          color="bg-green-100 text-green-600"
          change="+21.1%"
        />

      </div>

      <div className="mt-6">
        <RevenueChart />
      </div>

    </main>
  );
}

export default Dashboard;
