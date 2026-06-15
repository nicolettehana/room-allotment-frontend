import { useState } from "react";
import {
  elementCounter,
  Pagination,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../../components/core/Table";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  HStack,
  IconButton,
  LightMode,
  SkeletonText,
  Stack,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  MdOutlineInfo,
  MdOutlineSearch,
  MdOutlineSensorOccupied,
  MdOutlineTableChart,
} from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 -> 12

  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
}

const HallsTableWrapper = ({
  query,
  searchText,
  pageNumber,
  setPageNumber,
}) => {
  // States
  const [rowState, setRowState] = useState({});
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVisitorCode, setSelectedVisitorCode] = useState(null);
  const [selectedVPassNo, setSelectedVPassNo] = useState(null);

  // Hooks
  const toast = useToast();
  const navigate = useNavigate();

  // Queries
  const queryClient = useQueryClient();

  // Empty Search
  if (query?.length === 0 && searchText !== "") {
    return (
      <Center py={16}>
        <VStack spacing={4}>
          <Box
            bg="paperSecondary"
            w="fit-content"
            border="1px"
            borderColor="border"
            rounded="full"
            p={4}
          >
            <MdOutlineSearch size={25} />
          </Box>

          <VStack>
            <Heading size="sm">
              No halls have been added for this Office
            </Heading>
            {/* <Text color="body" textAlign="center">
              No Halls
            </Text> */}
          </VStack>
        </VStack>
      </Center>
    );
  }

  // Empty State
  if (query?.length === 0) {
    return (
      <Center py={16}>
        <VStack spacing={4}>
          <Box
            bg="paperSecondary"
            w="fit-content"
            border="1px"
            borderColor="border"
            rounded="full"
            p={4}
          >
            <MdOutlineTableChart size={48} />
          </Box>

          <VStack>
            <Heading size="md">No data</Heading>
          </VStack>
        </VStack>
      </Center>
    );
  }

  return (
    <Stack spacing={4}>
      {/* Table */}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Sl. No.</Th>
              <Th>Hall Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(query?.length === 0 ? new Array(10).fill(null) : query)?.map(
              (row, index) => {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    {/* <SkeletonText
                        w="8"
                        noOfLines={1}
                        isLoaded={!query}
                        fadeDuration={index}
                      >
                        {index + 1}
                        {/* {elementCounter(index, query)} */}
                    {/* </SkeletonText> */}
                    <Td>{row?.name}</Td>
                  </Tr>
                );
              },
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {/* <Pagination
        query={query}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      /> */}
    </Stack>
  );
};

export default HallsTableWrapper;
