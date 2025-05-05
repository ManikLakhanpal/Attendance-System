"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function AttendanceChart({ data }) {
  // Transform data if needed
  const chartData = data.map((entry) => ({
    date: entry.date,
    present: entry.status === "Present" ? 1 : 0,
  }));

  return (
    <div className="w-full h-64 mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="present" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
