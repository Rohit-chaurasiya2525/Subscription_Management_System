
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const revenueData = [
  { month: "Apr", revenue: 300000 },
  { month: "May", revenue: 450000 },
  { month: "Jun", revenue: 620000 },
  { month: "Jul", revenue: 750000 },
  { month: "Aug", revenue: 850000 },
  { month: "Sep", revenue: 1050000 },
  { month: "Oct", revenue: 1248600 },
];

function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Revenue Trend
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Monthly recurring revenue (MRR)
        </p>
      </div>

      <div className="h-72 w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={revenueData}>

            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

            <XAxis dataKey="month" stroke="#64748B" />

            <YAxis
              stroke="#64748B"
              tickFormatter={(value) => `${value / 100000}L`}
            />

            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RevenueChart;
