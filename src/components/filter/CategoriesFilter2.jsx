import React, { useEffect } from "react";
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

const CategoriesFilter2 = ({
  categoryCode,
  setCategoryCode,
  setPageNumber,
  query,
  stockType
}) => {
  const categories = query?.data?.data || [];

  // 🔹 Set first item as default
  useEffect(() => {
    if (!categoryCode && categories.length > 0) {
      setCategoryCode(categories[0].code);
      setPageNumber(0);
    }
  }, [categories, categoryCode, setCategoryCode, setPageNumber]);

  const categoryType = categories.find(
    (row) => row.code === categoryCode
  )?.name;

  return (
    <Menu closeOnSelect>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="fit-content"
      ><HStack>
        <Text>Item Category: </Text><Text color="red.700" fontWeight={"bold"}>{categoryType}</Text></HStack>
      </MenuButton>

      <MenuList>
        <MenuOptionGroup
          title="Filter by"
          type="radio"
          value={categoryCode}   // 🔹 controlled
          onChange={(value) => {
            setCategoryCode(value);
            setPageNumber(0);
          }}
        >

          {categories.map((row) => (
            row?.stockType === stockType &&
            <MenuItemOption key={row.code} value={row.code}>
              {row.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default CategoriesFilter2;
