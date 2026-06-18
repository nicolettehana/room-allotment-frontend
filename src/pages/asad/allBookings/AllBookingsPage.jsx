import { useState } from "react";
import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  HStack,
  VStack,
  Stack,
  SimpleGrid,
  useDisclosure,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";

import AllBookingsTableWrapper from "./AllBookingsTableWrapper";
import SearchInput from "../../../components/core/SearchInput";
import { useDebounce } from "use-debounce";
import { PageSizing } from "../../../components/core/Table";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import { useAuth } from "../../../components/auth/useAuth";
import DateFilter from "../../../components/filter/DateFilter";
import dayjs from "dayjs";
import { useFetchUsersProfile } from "../../../hooks/userQueries";
import { useFetchHistory } from "../../../hooks/hallBookingQueries";
import StatusFilter from "../../../components/filter/StatusFilter";
import { useExportBookings } from "../../../hooks/hallBookingQueries";

const AllBookingsPage = () => {
  // States
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [withPhoto, setWithPhoto] = useState(0);
  const [officeCode, setOfficeCode] = useState("");
  const [format, setFormat] = useState("PDF");
  const [status, setStatus] = useState("0");
  const [startDate, setStartDate] = useState(
    dayjs().subtract(2, "months").startOf("M").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    dayjs().add(30, "day").startOf("day").format("YYYY-MM-DD"),
  );
  const { role } = useAuth();

  // Hooks
  const [searchValue] = useDebounce(searchText, 300);
  const navigate = useNavigate();

  // Queries
  const exportBookingsMutation = useExportBookings();
  const profileQuery = useFetchUsersProfile();

  const historyQuery = useFetchHistory(
    searchValue,
    pageNumber,
    pageSize,
    startDate,
    endDate,
    status,
    1,
  );

  //Disclosures
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Handlers

  const handleExportData = () => {
    exportBookingsMutation.mutate(
      {
        startDate,
        endDate,
        status,
        all: 1,
      },
      {
        onSuccess: (response) => {
          const mimeType = "PDF";

          const blob = new Blob([response], { type: mimeType });

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `Bookings_${startDate}-${endDate}.pdf`;
          document.body.appendChild(link);
          link.click();
          link.remove();

          onClose();
        },
      },
    );
  };

  return (
    <>
      {/* Main */}
      <Main>
        <Section>
          <Container minW="full">
            <Stack spacing={4}>
              {/* Filter */}
              <HStack justifyContent="space-between" spacing={2}>
                <HStack>
                  <VStack spacing={7}>
                    <DateFilter
                      fromDate={startDate}
                      setFromDate={setStartDate}
                      toDate={endDate}
                      setToDate={setEndDate}
                      setPageNumber={setPageNumber}
                    />
                  </VStack>
                  <StatusFilter
                    setPageNumber={setPageNumber}
                    status={status}
                    setStatus={setStatus}
                  />
                </HStack>

                <HStack>
                  <Button
                    //type="submit"
                    colorScheme="brand"
                    //isLoading={authenticateQuery.isPending}
                    loadingText="Downloading..."
                    variant="brand"
                    width="full"
                    leftIcon={<FaFileDownload />}
                    onClick={handleExportData}
                  >
                    Download
                  </Button>
                </HStack>
              </HStack>

              {/* Filters */}
              <HStack justifyContent="space-between" spacing={4}>
                <PageSizing
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  setPageNumber={setPageNumber}
                />
                <SearchInput
                  searchText={searchText}
                  setSearchText={setSearchText}
                  setPageNumber={setPageNumber}
                  w="fit-content"
                />
              </HStack>

              {/* Table */}
              <AllBookingsTableWrapper
                query={historyQuery}
                searchText={searchText}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </Stack>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default AllBookingsPage;
