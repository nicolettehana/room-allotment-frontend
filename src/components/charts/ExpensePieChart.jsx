import React from "react";
import { Box, Heading, useToken, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// data will be passed as a prop

// Colors now derived using getCategoryColorScheme // chakra-like blue & green

import {
  getCategoryColor,
  getCategoryColorDark,
  getCategoryColorScheme,
} from "../core/CategoryColors";

import PropTypes from "prop-types";

export default function ExpensePieChart({ data }) {
  const colorTokens = data?.categories?.map((entry) =>
    getCategoryColorDark(entry.categoryCode)
  );
  const hexColors = useToken("colors", colorTokens);
  return (
    <Box p={0} bg="white" maxW="400px" mx="auto" textAlign="center">
      <Heading mb={4} size="md">
        Expense Breakdown
      </Heading>
      <Box
        bg="#F3F5F8"
        pb={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
      >
        <PieChart width={350} height={390}>
          <Pie
            data={data?.categories}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            dataKey="value"
            label={({ category, percent }) => ` ${(percent * 100).toFixed(0)}%`}
          >
            {data?.categories.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={hexColors[index]}
                //fill={getColor(getCategoryColor(entry.categoryCode))}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => {
              return [`₹${value}`, `${props?.payload?.category}`];
            }}
          />

          <Legend
            formatter={(value, entry, index) => {
              // value is the default name (usually 0, 1 if not set)
              // entry.payload contains the data object
              return entry.payload.category; // or entry.payload.name
            }}
          />
        </PieChart>
        <Text pt={1} fontWeight="bold">
          Total: ₹{data?.total}
        </Text>
      </Box>
    </Box>
  );
}

ExpensePieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};
