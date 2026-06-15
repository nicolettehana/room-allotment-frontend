import React from "react";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { MdOutlineFilterList } from "react-icons/md";

const OfficeFilter = ({ officeCode, setOfficeCode, setPageNumber, query }) => {
  const office =
    officeCode === "-1"
      ? "All"
      : query?.data?.data?.find((row) => row?.officeCode === Number(officeCode))
          ?.officeName;

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="auto"
      >
        <HStack>
          <Text>Office: </Text>
          <Text color="red.700">{office || "All"}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          title="Filter by"
          type="radio"
          value={officeCode}
          onChange={(value) => {
            setOfficeCode(value);
            setPageNumber(0);
          }}
        >
          <MenuItemOption value="-1">All</MenuItemOption>
          {query?.data?.data?.map((row) => (
            <MenuItemOption
              key={row?.officeCode}
              value={row.officeCode.toString()}
            >
              {row?.officeName}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default OfficeFilter;
