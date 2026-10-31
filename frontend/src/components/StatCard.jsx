
function StatCard({ title, value, icon: Icon, color, change }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {value}
          </h2>
        </div>

        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={25} />
        </div>

      </div>

      <p className="text-sm text-green-600 mt-4 font-medium">
        {change} vs last month
      </p>

    </div>
  );
}

export default StatCard;
