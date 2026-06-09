import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

export const DataTableContainer = ({ children, ...others }) => {
  return (
    <Box
      overflow="auto"
      shadow="sm"
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

export const DataTable = ({ children }) => {
  return (
    <Box as="table" w="full">
      {children}
    </Box>
  );
};

export const DThead = ({ children }) => {
  return (
    <Box as="thead" bg={useColorModeValue("zinc.100", "zinc.900")}>
      {children}
    </Box>
  );
};

export const DTr = ({ children, ...others }) => {
  return (
    <Box as="tr" p={4} {...others}>
      {children}
    </Box>
  );
};

export const DTh = ({ children, isNumeric = false, ...others }) => {
  return (
    <Box
      as="th"
      textAlign={isNumeric ? "right" : "left"}
      whiteSpace="nowrap"
      fontSize="sm"
      fontWeight="medium"
      color="body"
      border="1px"
      borderColor="border"
      _first={{
        borderLeft: "0px",
      }}
      _last={{
        borderRight: "0px",
      }}
      __css={{
        borderCollapse: "collapse",
      }}
      px={4}
      py={2}
      {...others}
    >
      {children}
    </Box>
  );
};

export const DTbody = ({ children }) => {
  return <Box as="tbody">{children}</Box>;
};

export const DTd = ({ children, isNumeric = false }) => {
  return (
    <Box
      as="td"
      textAlign={isNumeric ? "right" : "left"}
      whiteSpace="nowrap"
      border="1px"
      borderColor="border"
      _first={{
        borderLeft: "0px",
      }}
      _last={{
        borderRight: "0px",
      }}
      __css={{
        borderCollapse: "collapse",
      }}
      px={4}
      py={2}
    >
      {children}
    </Box>
  );
};

export const DTPageSizing = ({ pageSize, setPageSize }) => {
  // Handlers
  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <HStack alignItems="center">
      <Text color="text" fontSize="small" flexShrink={0}>
        Items per page
      </Text>
      <Select
        value={pageSize}
        w="fit-content"
        onChange={handlePageSize}
        size="sm"
        rounded="md"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </Select>
    </HStack>
  );
};

export const DTPagination = ({ query, pageNumber, setPageNumber }) => {
  // Handlers
  const nextPage = () => {
    if (pageNumber + 1 === query?.data?.data?.totalPages) return;
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1);
  };

  return (
    <Flex justifyContent="end">
      {/* Pagenation Buttons */}
      <ButtonGroup isAttached variant="outline">
        <Button isDisabled={pageNumber === 0} onClick={() => setPageNumber(0)}>
          First
        </Button>

        <IconButton onClick={prevPage} isDisabled={pageNumber === 0}>
          <HiOutlineChevronLeft size={16} />
        </IconButton>

        <Button isDisabled fontWeight="normal" fontSize="small">
          {pageNumber + 1} of {query?.data?.data?.totalPages}{" "}
          {query?.data?.data?.totalPages === 1 ? "page" : "pages"}
        </Button>

        <IconButton
          onClick={nextPage}
          isDisabled={pageNumber + 1 === query?.data?.data?.totalPages}
        >
          <HiOutlineChevronRight size={16} />
        </IconButton>

        <Button
          onClick={() => setPageNumber(query?.data?.data?.totalPages - 1)}
          isDisabled={pageNumber + 1 === query?.data?.data?.totalPages}
        >
          Last
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export const elementCounter = (index, query) => {
  return (
    index +
    query?.data?.data?.pageable?.pageNumber * query?.data?.data?.size +
    1
  );
};

export default Table;
