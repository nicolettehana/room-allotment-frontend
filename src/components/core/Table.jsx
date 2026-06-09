import React from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

export const TableContainer = ({ children, ...others }) => {
  return (
    <Box
      overflowX="auto"
      overflowY="hidden"
      shadow="sm"
      border="1px"
      borderColor="border"
      rounded="md"
      __css={{
        "&::-webkit-scrollbar": {
          h: "8px",
          bg: useColorModeValue("zinc.300", "zinc.700"),
        },
        "&::-webkit-scrollbar-thumb": {
          cursor: "pointer",
          borderRadius: "full",
          bg: useColorModeValue("zinc.400", "zinc.600"),
        },
      }}
      {...others}
    >
      {children}
    </Box>
  );
};

export const Table = ({ children }) => {
  return (
    <Box as="table" w="full">
      {children}
    </Box>
  );
};

export const Thead = ({ children }) => {
  return (
    <Box as="thead" bg="zinc.200" borderBottom="1px" borderColor="border">
      {children}
    </Box>
  );
};

export const Tr = ({ children, ...others }) => {
  return (
    <Box
      as="tr"
      p={4}
      borderBottom="1px"
      borderColor="border"

      transition="background-color 0.15s ease-in-out"

      /* Alternating row colors */
      _even={{
        bg: useColorModeValue("zinc.50", "zinc.800"),
      }}

      /* Hover highlight */
      _hover={{
        bg: useColorModeValue("zinc.100", "zinc.700"),
      }}


      _last={{
        borderBottom: "0px",
      }}
      {...others}
    >
      {children}
    </Box>
  );
};

export const Th = ({ children, isNumeric = false }) => {
  return (
    <Box
      as="th"
      textAlign={isNumeric ? "right" : "left"}
      whiteSpace="nowrap"
      fontSize="sm"
      fontWeight="medium"
      color="body"
      px={4}
      py={2}
    >
      {children}
    </Box>
  );
};

export const Tbody = ({ children }) => {
  return <Box as="tbody">{children}</Box>;
};

export const Td = ({ isNumeric = false, wrap = false, children }) => {
  return (
    <Box
      as="td"
      textAlign={isNumeric ? "right" : "left"}
      whiteSpace={`${wrap == false ? "nowrap" : "wrap"}`}
      px={4}
      py={2}
    >
      {children}
    </Box>
  );
};

export const PageSizing = ({ pageSize, setPageSize, setPageNumber }) => {
  // Handlers
  const handlePageSize = (e) => {
    setPageSize(e.target.value);
    setPageNumber(0);
  };

  return (
    <HStack alignItems="center">
      <Text color="body" fontSize="small" flexShrink={0}>
        Page Size
      </Text>
      <Select
        aria-label="Page size"
        value={pageSize}
        w="fit-content"
        onChange={handlePageSize}
        rounded="md"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </Select>
    </HStack>
  );
};

export const Pagination = ({ query, pageNumber, setPageNumber }) => {
  // Handlers
  const nextPage = () => {
    if (query?.data?.data?.last) return;
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (query?.data?.data?.first) return;
    setPageNumber(pageNumber - 1);
  };

  return (
    <HStack justifyContent="space-between">
      {/* Page Number */}
      <Text fontSize="small" color="body">
        <strong>{pageNumber + 1}</strong> of{" "}
        <strong>{query?.data?.data?.totalPages}</strong>{" "}
        {query?.data?.data?.totalPages === 1 ? "page" : "pages"}
      </Text>

      {/* Pagination Buttons */}
      <HStack>
        <Button
          aria-label="Jump to first page"
          variant="outline"
          isDisabled={query?.data?.data?.first}
          onClick={() => setPageNumber(0)}
        >
          First
        </Button>

        <IconButton
          aria-label="Go to previous page"
          variant="outline"
          icon={<MdOutlineChevronLeft size={20} />}
          isDisabled={query?.data?.data?.first}
          onClick={prevPage}
        />

        <IconButton
          aria-label="Go to next page"
          variant="outline"
          icon={<MdOutlineChevronRight size={20} />}
          isDisabled={query?.data?.data?.last}
          onClick={nextPage}
        />

        <Button
          aria-label="Jump to last page"
          variant="outline"
          isDisabled={query?.data?.data?.last}
          onClick={() => setPageNumber(query?.data?.data?.totalPages - 1)}
        >
          Last
        </Button>
      </HStack>
    </HStack>
  );
};

export const elementCounter = (index, query) => {
  if (query?.data?.data) {
    return (
      index +
      query?.data?.data?.pageable?.pageNumber * query?.data?.data?.size +
      1
    );
  }

  return index + 1;
};
