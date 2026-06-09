import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";

const SearchInput = ({
  searchText,
  setSearchText,
  setPageNumber,
  ...others
}) => {
  return (
    <InputGroup {...others}>
      <InputLeftElement pointerEvents="none">
        <MdOutlineSearch size={20} />
      </InputLeftElement>
      <Input
        type="search"
        variant="brand"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setPageNumber(0);
        }}
      />
    </InputGroup>
  );
};

export default SearchInput;
