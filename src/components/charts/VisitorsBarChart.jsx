import React, { useMemo } from "react";
import { Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper to get first letter of day
const getDayLetter = (dateString) => {
  const date = new Date(dateString);
  const dayLetterMap = ["Su", "M", "T", "W", "Th", "F", "S"];
  return dayLetterMap[date.getDay()];
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  const dateObj = new Date(data.date);
  const dayNumber = dateObj.getDate();
  const dayLetter = getDayLetter(data.date);

  return (
    <div
      style={{
        background: "#fff",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
      }}
    >
      <strong>
        {dayNumber} ({dayLetter})
      </strong>
      <p>Total Visitors: {data.totalNoOfVisitors}</p>
      <p>Minister: {data.minister}</p>
      <p>CS: {data.cs}</p>
      <p>Meeting: {data.meeting}</p>
      <p>Officer: {data.officer}</p>
      <p>Department: {data.department}</p>
    </div>
  );
};

const VisitorsBarChart = ({ details = [] }) => {
  const sortedData = useMemo(() => {
    if (!Array.isArray(details)) return [];
    return [...details].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [details]);

  if (!sortedData.length) {
    return <p>No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={sortedData}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        {/* XAxis shows date number + day letter */}
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const dateObj = new Date(value);
            const dayNumber = dateObj.getDate();
            const dayLetter = getDayLetter(value);
            return `${dayNumber} (${dayLetter})`;
          }}
        />

        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="totalNoOfVisitors" fill="#1a5515" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VisitorsBarChart;
