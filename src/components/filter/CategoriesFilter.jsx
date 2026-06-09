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

const CategoriesFilter = ({
  categoryCode,
  setCategoryCode,
  setPageNumber,
  query,
  stockType,
}) => {
  const categoryType = query?.data?.data?.find(
    (row) => row?.code === categoryCode
  )?.name;

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="fit-content"
      >
        <HStack>
          <Text>Item Category: </Text>
          <Text color="red.700">{categoryType || "All"}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          title="Filter by"
          type="radio"
          defaultValue={categoryCode}
          onChange={(value) => {
            setCategoryCode(value);
            setPageNumber(0);
          }}
        >
          <MenuItemOption value="">All</MenuItemOption>
          {query?.data?.data?.map(
            (row) =>
              row?.stockType === stockType && (
                <MenuItemOption key={row?.code} value={`${row?.code}`}>
                  {row?.name}
                </MenuItemOption>
              )
          )}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default CategoriesFilter;
