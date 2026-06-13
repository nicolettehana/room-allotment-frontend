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
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  RadioGroup,
  Radio,
  SelectField,
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
import dayjs from "dayjs";
import { MdNavigateNext } from "react-icons/md";
import TakeActionModal from "./TakeActionModal";
import { AiOutlineFileSearch } from "react-icons/ai";

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

const getStatusColorScheme = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "blue";
    case "allotted":
      return "green";
    case "rejected":
      return "red";
    case "reschedule requested":
      return "orange";
    default:
      return "gray";
  }
};

const InboxTableWrapper = ({
  isEstate = true,
  query,
  searchText,
  pageNumber,
  setPageNumber,
}) => {
  // States
  const [rowState, setRowState] = useState({});
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);
  const [selectedVisitorCode, setSelectedVisitorCode] = useState(null);
  const [selectedVPassNo, setSelectedVPassNo] = useState(null);
  const [withPhoto, setWithPhoto] = useState(0);

  // Hooks
  const toast = useToast();
  const navigate = useNavigate();

  //Disclosures
  const takeActionDisclosure = useDisclosure();

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
            <AiOutlineFileSearch size={48} />
          </Box>

          <VStack>
            <Heading size="md">No data</Heading>
            <Text color="body" textAlign="center">
              No pending requests
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

  const handleTakeAction = () => {
    // exportVisitorsMutation.mutate(
    //   {
    //     startDate,
    //     endDate,
    //     format: format,
    //     withPhoto: withPhoto,
    //   },
    //   {
    //     onSuccess: (response) => {
    //       console.log("Success");
    //       const mimeType =
    //         format === "PDF"
    //           ? "application/pdf"
    //           : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    //       const blob = new Blob([response], { type: mimeType });
    //       const url = window.URL.createObjectURL(blob);
    //       const link = document.createElement("a");
    //       link.href = url;
    //       link.download = `Visitors_${startDate}-${endDate}.${extension}`;
    //       document.body.appendChild(link);
    //       link.click();
    //       link.remove();
    //       onClose();
    //     },
    //   },
    // );
  };

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

      <TakeActionModal
        isOpen={takeActionDisclosure.isOpen}
        onClose={takeActionDisclosure.onClose}
        data={rowState}
      />

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
              <Th>Remarks</Th>
              <Th>Contact Person Details</Th>
              <Th>Action</Th>
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
                      fontSize="sm"
                    >
                      {((pageNumber ) * (query?.data?.data?.size || 0))+ index + 1}
                      {/* {index + 1} */}
                      {/* {elementCounter(index, query)} */}
                    </SkeletonText>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{row?.bookingId}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{row?.department}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{row?.purpose}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {new Date(row?.meetingDate)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                      <br />
                      {new Date(
                        `1970-01-01T${row?.startTime}`,
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {new Date(
                        `1970-01-01T${row?.endTime}`,
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {row?.buildingName}
                      <br />
                      {row?.hallName}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{row?.noOfAttendees}</Text>
                  </Td>

                  <Td>
                    <Text fontSize="sm">{row?.remarks}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {row?.contactName}
                      <br />
                      {row?.contactDesignation}
                      <br />
                      {row?.contactMobileNo}
                    </Text>
                  </Td>
                  <Td>
                    <VStack>
                      {row?.appStatus === 1 && (
                        <Button
                          variant="brand"
                          colorScheme="brand"
                          minW="auto"
                          onClick={() => {
                            setRowState(row);
                            takeActionDisclosure.onOpen();
                          }}
                          size="xs"
                          rightIcon={<MdNavigateNext />}
                        >
                          Take Action
                        </Button>
                      )}
                    </VStack>
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

export default InboxTableWrapper;
