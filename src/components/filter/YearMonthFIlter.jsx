import React, { useMemo } from "react";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdOutlineFilterList } from "react-icons/md";

const YearMonthFilter = ({ year, setYear, month, setMonth, setPageNumber }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Years from 2025 → current
  const years = useMemo(() => {
    const arr = [];
    for (let y = 2026; y <= currentYear; y++) {
      arr.push(y);
    }
    return arr;
  }, [currentYear]);

  // Months (limit future months)
  const months = useMemo(() => {
    const maxMonth = year === currentYear ? currentMonth : 12;
    return Array.from({ length: maxMonth }, (_, i) => i + 1);
  }, [year, currentYear, currentMonth]);

  const monthName = new Date(0, month - 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="fit-content"
      >
        <HStack>
          <Text>Month:</Text>
          <Text color="red.700">
            {monthName} {year}
          </Text>
        </HStack>
      </MenuButton>

      <MenuList minW="250px">
        <HStack align="start" p={2} spacing={4}>
          {/* Year Selector */}
          <MenuOptionGroup
            title="Year"
            type="radio"
            value={year?.toString()}
            onChange={(value) => {
              setYear(Number(value));
              setPageNumber(0);
            }}
          >
            {years.map((y) => (
              <MenuItemOption key={y} value={y.toString()}>
                {y}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>

          {/* Month Selector */}
          <MenuOptionGroup
            title="Month"
            type="radio"
            value={month?.toString()}
            onChange={(value) => {
              setMonth(Number(value));
              setPageNumber(0);
            }}
          >
            {months.map((m) => (
              <MenuItemOption key={m} value={m.toString()}>
                {new Date(0, m - 1).toLocaleString("default", {
                  month: "long",
                })}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </HStack>
      </MenuList>
    </Menu>
  );
};

export default YearMonthFilter;
