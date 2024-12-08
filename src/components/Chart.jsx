import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ chartData }) => {
  const colors = ["#3ca6ff", "#c9c9c9", "#FF9800", "#2196F3"];

  return (
    <ResponsiveContainer width={"90%"} height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill={colors[0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;