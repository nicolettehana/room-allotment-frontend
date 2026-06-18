import { useState, useEffect } from "react";
import Main from "../../components/core/semantics/Main";
import Section from "../../components/core/semantics/Section";
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
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { useExportVisitors } from "../../hooks/visitorQueries";
import VisitorsTableWrapper from "./VisitorsTableWrapper";
import SearchInput from "../../components/core/SearchInput";
import { useDebounce } from "use-debounce";
import { PageSizing } from "../../components/core/Table";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import { useAuth } from "../../components/auth/useAuth";
import DateFilter from "../../components/filter/DateFilter";
import dayjs from "dayjs";
import { useFetchUsersProfile } from "../../hooks/userQueries";
import { useFetchOffices } from "../../hooks/officeQueries";
import OfficeFilter from "../../components/filter/OfficeFilter";
import YearMonthFilter from "../../components/filter/YearMonthFIlter";
import PurposeFilter from "../../components/filter/PurposeFilter";
import StatCard2 from "../../components/core/theme/StatCard2";
import { Link } from "react-router-dom";
import {
  useFetchPendingBookings,
  useFetchHistory,
} from "../../hooks/hallBookingQueries";
import TimelineScheduler from "../../components/charts/TimelineScheduler";
import { useFetchHalls } from "../../hooks/roomQueries";
import { useFetchHallAllotments } from "../../hooks/hallBookingQueries";
import RescheduleTableWrapper from "./RescheduleTableWrapper";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const DashboardPage = () => {
  const currentDate = new Date();

  // States
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [withPhoto, setWithPhoto] = useState(0);
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [officeCode, setOfficeCode] = useState("-1");
  const [purpose, setPurpose] = useState("All");
  const [format, setFormat] = useState("PDF");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [startDate, setStartDate] = useState(
    dayjs().subtract(2, "months").startOf("M").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    dayjs().add(1, "months").startOf("day").format("YYYY-MM-DD"),
  );
  const { role } = useAuth();

  // Hooks
  const [searchValue] = useDebounce(searchText, 300);
  const navigate = useNavigate();

  // Queries
  const officesQuery = useFetchOffices();
  const profileQuery = useFetchUsersProfile();
  const hallsQuery = useFetchHalls(officeCode);
  const hallAllotmentQuery = useFetchHallAllotments(selectedDate, officeCode);
  const rescheduleQuery = useFetchHistory(
    searchValue,
    0,
    50,
    startDate,
    endDate,
    3,
    0,
  );
  const allottedQuery = useFetchHistory(
    searchValue,
    0,
    50,
    dayjs().subtract(1, "days").startOf("day").format("YYYY-MM-DD"),
    endDate,
    2,
    0,
  );
  const rejectedQuery = useFetchHistory(
    searchValue,
    0,
    50,
    dayjs().startOf("day").format("YYYY-MM-DD"),
    endDate,
    4,
    0,
  );

  const pendingQuery = useFetchHistory(
    searchValue,
    0,
    50,
    dayjs().startOf("day").format("YYYY-MM-DD"),
    endDate,
    1,
    0,
  );

  const exportVisitorsMutation = useExportVisitors();

  //Disclosures
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Handlers

  const handleExportVisitors = (exportFormat) => {
    const extension = format === "PDF" ? "pdf" : "xlsx";

    exportVisitorsMutation.mutate(
      {
        startDate,
        endDate,
        format: format,
        withPhoto: withPhoto,
        officeCode,
      },
      {
        onSuccess: (response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const mimeType =
            exportFormat === "PDF"
              ? "application/pdf"
              : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

          const blob = new Blob([response], { type: mimeType });

          const link = document.createElement("a");
          link.href = url;
          link.download = `Visitors_${startDate}-${endDate}.${extension}`;
          link.click();
          link.remove();

          onClose();
        },
      },
    );
  };

  useEffect(() => {
    if (
      officesQuery?.data?.data?.length > 0 &&
      !officeCode // only if not already set
    ) {
      setOfficeCode(officesQuery.data.data[0].officeCode.toString());
    }
  }, [officesQuery?.data?.data]);

  return (
    <>
      {/* Main */}
      <Main>
        <Section>
          <Container minW="full">
            {allottedQuery?.data?.data?.content?.length > 0 && (
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="md"
                p={5}
                bg="brown.50"
                mb={4}
              >
                <Heading size="sm" pb={2} color="green.600">
                  Upcoming Meetings
                </Heading>
                <RescheduleTableWrapper
                  query={allottedQuery}
                  pageNumber={0}
                  setPageNumber={setPageNumber}
                ></RescheduleTableWrapper>
              </Box>
            )}
            {rescheduleQuery?.data?.data?.content?.length > 0 && (
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="md"
                p={5}
                bg="brown.50"
                mb={4}
              >
                <Heading size="sm" py={2} color="orange.600">
                  Pending for Reschedule
                </Heading>
                <RescheduleTableWrapper
                  query={rescheduleQuery}
                  pageNumber={0}
                  setPageNumber={setPageNumber}
                ></RescheduleTableWrapper>
              </Box>
            )}
            {pendingQuery?.data?.data?.content?.length > 0 && (
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="md"
                p={5}
                bg="brown.50"
                mb={2}
              >
                <Heading size="sm" py={2} color="blue.600">
                  Pending Bookings
                </Heading>
                <RescheduleTableWrapper
                  query={pendingQuery}
                  pageNumber={0}
                  setPageNumber={setPageNumber}
                ></RescheduleTableWrapper>
              </Box>
            )}
            {rejectedQuery?.data?.data?.content?.length > 0 && (
              <Box
                border="1px solid"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="md"
                p={5}
                bg="brown.50"
                mb={2}
              >
                <Heading size="sm" py={2} color="red.600">
                  Rejected Bookings
                </Heading>
                <RescheduleTableWrapper
                  query={rejectedQuery}
                  pageNumber={0}
                  setPageNumber={setPageNumber}
                ></RescheduleTableWrapper>
              </Box>
            )}
            <Stack spacing={4} mt={8}>
              {/* Filter */}
              <HStack justifyContent="space-between" spacing={2}>
                <HStack>
                  <VStack>
                    <FormControl>
                      {/* <FormLabel htmlFor="date">Date</FormLabel> */}
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </FormControl>

                    <Heading size="sm">
                      {profileQuery?.data?.data?.office}
                    </Heading>
                  </VStack>
                  <OfficeFilter
                    setPageNumber={setPageNumber}
                    query={officesQuery}
                    officeCode={officeCode}
                    setOfficeCode={setOfficeCode}
                  ></OfficeFilter>
                </HStack>
                <Box position="absolute" left="50%">
                  <Text textAlign="center" fontWeight="bold" fontSize={25}>
                    Meetings - {formatDate(selectedDate)}
                  </Text>
                </Box>
              </HStack>

              <TimelineScheduler
                halls={hallsQuery?.data?.data}
                meetings={hallAllotmentQuery?.data?.data}
              />
            </Stack>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default DashboardPage;
