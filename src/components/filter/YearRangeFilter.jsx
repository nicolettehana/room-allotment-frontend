import React, { useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdOutlineFilterList } from "react-icons/md";

const YearRangeFilter = ({
  yearRangeId,
  setYearRangeId,
  setPageNumber,
  query,
  includeAll,
}) => {
  useEffect(() => {
    // Do nothing if already set ("" or a value)
    if (yearRangeId !== "") return;

    // Data not ready yet
    if (!query?.data?.data?.length) return;

    // includeAll = 1 → default to FIRST option (not All)
    if (includeAll === "1") {
      setYearRangeId(String(query.data.data[0].id));
      return;
    }

    // includeAll != 1 → also default to FIRST option
    setYearRangeId(String(query.data.data[0].id));
  }, [query?.data?.data, yearRangeId, includeAll]);

  const selectedRange = query?.data?.data?.find(
    (row) => String(row?.id) === yearRangeId
  );

  const buttonLabel =
    yearRangeId === ""
      ? "All"
      : selectedRange
      ? `${selectedRange.startYear} - ${selectedRange.endYear}`
      : "";

  return (
    <Menu closeOnSelect>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="fit-content"
      >
        <HStack>
          <Text>Year: </Text>
          <Text color="red.700">{buttonLabel}</Text>
        </HStack>
      </MenuButton>

      <MenuList>
        <MenuOptionGroup
          title="Filter by Year Range"
          type="radio"
          value={yearRangeId}
          onChange={(value) => {
            setYearRangeId(value);
            setPageNumber(0);
          }}
        >
          {includeAll === "1" && <MenuItemOption value="">All</MenuItemOption>}

          {query?.data?.data?.map((row) => (
            <MenuItemOption key={row.id} value={String(row.id)}>
              {row.startYear} - {row.endYear}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default YearRangeFilter;
