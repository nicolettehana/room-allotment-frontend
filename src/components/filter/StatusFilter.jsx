import React from "react";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text
} from "@chakra-ui/react";
import { MdOutlineFilterList } from "react-icons/md";

const STATUS_OPTIONS = [
  { label: "All", value: "0" },
  { label: "Pending", value: "1" },
  { label: "Allotted", value: "2" },
  { label: "Reschedule Requested", value: "3" },
  { label: "Rejected", value: "4" },
  { label: "Cancelled", value: "5" },
];

const StatusFilter = ({
  status,
  setStatus,
  setPageNumber,
}) => {
  const selectedLabel =
    STATUS_OPTIONS.find((opt) => opt.value === status)?.label || "All";

  return (
    <Menu closeOnSelect>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="fit-content"
      >
        <HStack>
          <Text>Status:</Text>
          <Text color="red.700">{selectedLabel}</Text>
        </HStack>
      </MenuButton>

      <MenuList>
        <MenuOptionGroup
          title="Filter by"
          type="radio"
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPageNumber(0);
          }}
        >
          {STATUS_OPTIONS.map((option) => (
            <MenuItemOption key={option.value} value={option.value}>
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default StatusFilter;
