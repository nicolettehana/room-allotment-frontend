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

const PURPOSE_OPTIONS = [
  "To meet Minister",
  "To meet Chief Secretary",
  "To attend meeting/function",
  "To meet officers",
  "To visit Department",
];

const PurposeFilter = ({ purpose, setPurpose, setPageNumber }) => {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<MdOutlineFilterList size={20} />}
        w="fit-content"
      >
        <HStack>
          <Text>Purpose:</Text>
          <Text color="red.700">{purpose || "All"}</Text>
        </HStack>
      </MenuButton>

      <MenuList>
        <MenuOptionGroup
          title="Filter by Purpose"
          type="radio"
          value={purpose || "All"}
          onChange={(value) => {
            setPurpose(value === "All" ? "All" : value);
            setPageNumber(0);
          }}
        >
          <MenuItemOption key={"All"} value="All">
            All
          </MenuItemOption>

          {PURPOSE_OPTIONS.map((option) => (
            <MenuItemOption key={option} value={option}>
              {option}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default PurposeFilter;
