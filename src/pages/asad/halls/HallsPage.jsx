import { useState, useEffect } from "react";
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
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import HallsTableWrapper from "./HallsTableWrapper";
import SearchInput from "../../../components/core/SearchInput";
import { useDebounce } from "use-debounce";
import { PageSizing } from "../../../components/core/Table";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import { useAuth } from "../../../components/auth/useAuth";
import DateFilter from "../../../components/filter/DateFilter";
import dayjs from "dayjs";
import { useFetchUsersProfile } from "../../../hooks/userQueries";
import { useFetchOffices } from "../../../hooks/officeQueries";
import OfficeFilter from "../../../components/filter/OfficeFilter";
import YearMonthFilter from "../../../components/filter/YearMonthFIlter";
import PurposeFilter from "../../../components/filter/PurposeFilter";
import VisitorPieChart from "../../../components/charts/VisitorPieChart";
import VisitorsBarChart from "../../../components/charts/VisitorsBarChart";
import { Link } from "react-router-dom";
import { useFetchPendingBookings } from "../../../hooks/hallBookingQueries";
import {
  useFetchHalls,
  useFetchHallsOfficeWise,
} from "../../../hooks/roomQueries";
import { useFetchHallAllotments } from "../../../hooks/hallBookingQueries";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import CreateOfficeModal from "../../admin/offices/CreateOfficeModal";
import CreateHallModal from "./CreateHallModal";
import UpdateOfficeModal from "../../admin/offices/UpdateOfficeModal";

const HallsPage = () => {
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
  const [rowState, setRowState] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [startDate, setStartDate] = useState(
    dayjs().subtract(2, "months").startOf("M").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    dayjs().startOf("day").format("YYYY-MM-DD"),
  );
  const { role } = useAuth();

  // Hooks
  const [searchValue] = useDebounce(searchText, 300);
  const navigate = useNavigate();

  // Queries
  const officesQuery = useFetchOffices();
  const profileQuery = useFetchUsersProfile();
  const pendingBookingsQuery = useFetchPendingBookings(0, 10);
  const hallsQuery = useFetchHalls(officeCode);
  const hallAllotmentQuery = useFetchHallAllotments(selectedDate, officeCode);
  const hallsOfficeWiseQuery = useFetchHallsOfficeWise();

  //Disclosures
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Disclosures
  const createOfficeDisclosure = useDisclosure();
  const updateOfficeDisclosure = useDisclosure();
  const createHallDisclosure = useDisclosure();

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
        <CreateOfficeModal
          isOpen={createOfficeDisclosure.isOpen}
          onClose={createOfficeDisclosure.onClose}
        />
        <CreateHallModal
          isOpen={createHallDisclosure.isOpen}
          onClose={createHallDisclosure.onClose}
          officeQuery={officesQuery}
        />
        <UpdateOfficeModal
          isOpen={updateOfficeDisclosure.isOpen}
          onClose={updateOfficeDisclosure.onClose}
          officeName={rowState?.officeName}
          officeCode={rowState?.officeCode}
        />
        <Section>
          <Container minW="full">
            <Stack spacing={0} mt={8}>
              {/* Filter */}
              <HStack justifyContent="space-between" spacing={0}>
                <OfficeFilter
                  setPageNumber={setPageNumber}
                  query={officesQuery}
                  officeCode={officeCode}
                  setOfficeCode={setOfficeCode}
                ></OfficeFilter>
              </HStack>
              <HStack w="100%" justify="flex-end">
                <Button
                  variant="brand"
                  leftIcon={<MdOutlineAddCircleOutline />}
                  onClick={createOfficeDisclosure.onOpen}
                >
                  Add Office
                </Button>

                <Button
                  variant="brand"
                  leftIcon={<MdOutlineAddCircleOutline />}
                  onClick={createHallDisclosure.onOpen}
                >
                  Add Hall
                </Button>
              </HStack>
              {(hallsOfficeWiseQuery.isPending
                ? new Array(10).fill(null)
                : hallsOfficeWiseQuery?.data?.data
              )?.map((row, index) => {
                return (
                  <>
                    <Text fontWeight="bold">
                      {hallsOfficeWiseQuery?.data?.data[index]?.officeName}
                    </Text>
                    {/* Table */}
                    <HallsTableWrapper
                      query={hallsOfficeWiseQuery?.data?.data[index]?.rooms}
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                    />
                  </>
                );
              })}
            </Stack>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default HallsPage;
