// components/ProgressTrendChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const data = [
  { name: 'Week 1', MemberABefore: 10, MemberAAfter: 20, MemberBBefore: 20, MemberBAfter: 30 },
  { name: 'Week 2', MemberABefore: 30, MemberAAfter: 45, MemberBBefore: 35, MemberBAfter: 40 },
  { name: 'Week 3', MemberABefore: 45, MemberAAfter: 60, MemberBBefore: 50, MemberBAfter: 65 },
  { name: 'Week 4', MemberABefore: 65, MemberAAfter: 80, MemberBBefore: 60, MemberBAfter: 75 },
  { name: 'Week 5', MemberABefore: 85, MemberAAfter: 100, MemberBBefore: 80, MemberBAfter: 90 },
];

const ProgressTrendChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200">
      <h3 className="text-lg font-medium text-slate-800 mb-4">Member Progress: Before vs After</h3>
      <div className="h-80 bg-slate-100 rounded p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: '#475569' }} />
            <YAxis tick={{ fill: '#475569' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1' }}
              labelStyle={{ color: '#334155' }}
            />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#334155' }} />

            {/* Member A */}
            <Line
              type="monotone"
              dataKey="MemberABefore"
              name="Member A - Before"
              stroke="#94a3b8" // slate-400
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="MemberAAfter"
              name="Member A - After"
              stroke="#f97316" // orange-500
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            {/* Member B */}
            <Line
              type="monotone"
              dataKey="MemberBBefore"
              name="Member B - Before"
              stroke="#94a3b8" // slate-400
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="MemberBAfter"
              name="Member B - After"
              stroke="#3b82f6" // blue-500
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressTrendChart;
