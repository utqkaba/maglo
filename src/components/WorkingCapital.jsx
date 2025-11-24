export function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-100 shadow-md px-3 py-2 rounded-md text-xs font-medium space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-teal-600">Income:</span>
          <span>₺{payload[0].value.toLocaleString()}</span>
        </div>

        {payload[1] && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-(--color-maglo)">Expenses:</span>
            <span>₺{payload[1].value.toLocaleString()}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { useState } from "react";
import { useWorkingCapital } from "../hooks/useWorkingCapital";

export default function WorkingCapital() {
  const [range, setRange] = useState("7d");
  const [hoverIndex, setHoverIndex] = useState(null);

  const { data, isLoading, error } = useWorkingCapital();

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-white rounded-2xl border border-gray-100 p-4 min-h-[291px]">
        <div className="h-[220px] animate-pulse bg-gray-100 rounded-xl" />
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-white rounded-2xl border border-gray-100 p-4 min-h-[291px] flex items-center justify-center text-red-500">
        Failed to load.
      </section>
    );
  }

  const chartData =
    data?.data?.data?.map((item) => ({
      date: item.month,
      income: item.income,
      expenses: item.expense,
      net: item.net,
    })) || [];

  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-4 min-h-[291px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Working Capital</h2>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-6 mr-13">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span className="text-xs text-gray-600">Income</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-(--color-maglo)"></span>
              <span className="text-xs text-gray-600">Expenses</span>
            </div>
          </div>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="text-xs bg-gray-100 border border-gray-200 rounded-lg px-2 py-1"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="-ml-10 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined) {
                setHoverIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {hoverIndex !== null && (
              <ReferenceArea
                x1={hoverIndex - 0.5}
                x2={hoverIndex + 0.5}
                fill="rgba(20,184,166,0.10)"
                strokeOpacity={0}
              />
            )}

            <XAxis
              dataKey="date"
              padding={{ left: 20 }}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
            />

            <YAxis
              padding={{ bottom: 20 }}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickFormatter={(val) =>
                val >= 1000
                  ? `${(val / 1000).toFixed(val % 1000 ? 1 : 0)}K`
                  : val
              }
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              dataKey="income"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#14b8a6", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#6366f1" }}
              type="monotone"
            />

            <Line
              dataKey="expenses"
              stroke="#d9f224"
              strokeWidth={3}
              dot={{ r: 4, fill: "#d9f224", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#6366f1" }}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
