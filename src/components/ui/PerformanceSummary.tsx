import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend, PieChart, Pie, Cell
} from 'recharts';

const areaData = [
  { day: 'Mon', attendance: 80 },
  { day: 'Tue', attendance: 90 },
  { day: 'Wed', attendance: 70 },
  { day: 'Thu', attendance: 100 },
  { day: 'Fri', attendance: 85 },
  { day: 'Sat', attendance: 60 },
  { day: 'Sun', attendance: 75 },
];

const radialData = [{ name: 'Goal', value: 65, fill: '#f97316' }];

const pieData = [
  { name: 'Active', value: 20 },
  { name: 'Inactive', value: 10 },
];

const COLORS = ['#10b981', '#e5e7eb'];

const GymPerformanceDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {/* Attendance Trend - Area Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow">
        <h4 className="text-slate-800 font-medium mb-2">Weekly Attendance</h4>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={areaData}>
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 12 }} />
            <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
            <Tooltip />
            <Area
              type="linear"
              dataKey="attendance"
              stroke="#3b82f6"
              fill="#bfdbfe"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Goal Progress - Radial Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow flex flex-col items-center">
        <h4 className="text-slate-800 font-medium mb-2">Goal Progress</h4>
        <ResponsiveContainer width="100%" height={150}>
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            barSize={12}
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background dataKey="value" cornerRadius={10} />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="text-2xl font-semibold text-orange-500">65%</div>
      </div>

      {/* Active Days - Pie Chart */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow">
        <h4 className="text-slate-800 font-medium mb-2">Active Days</h4>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center text-lg font-semibold text-green-500 mt-2">20 / 30 Days</div>
      </div>

      {/* Workout Completion - Gauge Style */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow">
        <h4 className="text-slate-800 font-medium mb-2">Workout Completion</h4>
        <div className="flex flex-col items-center justify-center h-[150px]">
          <svg viewBox="0 0 36 36" className="w-24 h-24">
            <path
              className="text-slate-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-500"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="78, 100"
              fill="none"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="text-xs fill-slate-800" textAnchor="middle">
              78%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GymPerformanceDashboard;
