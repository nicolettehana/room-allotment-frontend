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
import VisitorPhotoModal from "./VisitorPhotoModal";
import VisitorPassModal from "./VisitorPassModal";
import dayjs from "dayjs";

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

const BookingHistoryTableWrapper = ({
  isEstate = true,
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

  if (query.isError) {
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
            <Heading size="md">Something went wrong</Heading>
            <Text color="body" textAlign="center">
              {query?.error?.response?.data?.detail}
            </Text>
          </VStack>
        </VStack>
      </Center>
    );
  }

  // Empty Search
  if (
    query.isSuccess &&
    query?.data?.data?.content?.length === 0 &&
    searchText !== ""
  ) {
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
            <MdOutlineSearch size={48} />
          </Box>

          <VStack>
            <Heading size="md">No data</Heading>
            <Text color="body" textAlign="center">
              No data related to "{searchText}"
            </Text>
          </VStack>
        </VStack>
      </Center>
    );
  }

  // Empty State
  if (query.isSuccess && query?.data?.data?.content?.length === 0) {
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
      {selectedVisitorCode && (
        <VisitorPassModal
          visitorCode={selectedVisitorCode}
          vPassNo={selectedVPassNo}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedVisitorCode(null);
          }}
        />
      )}
      {selectedVisitorId && (
        <VisitorPhotoModal
          visitorCode={selectedVisitorId}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedVisitorId(null); // reset for next use
          }}
        />
      )}
      {/* Table */}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Sl. No.</Th>
              <Th>Booking ID.</Th>
              <Th>Department/Office</Th>
              <Th>Purpose</Th>
              <Th>Date & Time</Th>
              <Th>Hall</Th>
              <Th>No. of Attendees</Th>
              <Th>Addl. Remarks</Th>
              <Th>Contact Person Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(query.isPending
              ? new Array(10).fill(null)
              : query?.data?.data?.content
            )?.map((row, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <SkeletonText
                      w="8"
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {index + 1}
                      {/* {elementCounter(index, query)} */}
                    </SkeletonText>
                  </Td>
                  <Td>{row?.id}</Td>
                  <Td>{row?.department}</Td>
                  <Td>{row?.purpose}</Td>
                  <Td>
                    {row?.meetingDate}
                    <br />
                    {new Date(`1970-01-01T${row.startTime}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      },
                    )}
                    {" - "}
                    {new Date(`1970-01-01T${row.endTime}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      },
                    )}
                  </Td>
                  <Td>
                    {row?.hallOfficeCode}
                    <br />
                    {row?.hallId}
                  </Td>
                  <Td>{row?.noOfAttendees}</Td>
                  <Td>{row?.remarks}</Td>
                  <Td>
                    {row?.contactName}
                    <br />
                    {row?.contactDesignation}
                    <br />
                    {row?.contactMobileNo}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        query={query}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </Stack>
  );
};

export default BookingHistoryTableWrapper;
