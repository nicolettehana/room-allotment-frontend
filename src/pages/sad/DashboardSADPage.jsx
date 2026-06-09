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
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import {
  useExportVisitors,
  useFetchPurposeStats,
} from "../../hooks/visitorQueries";
import { useFetchVisitors } from "../../hooks/visitorQueries";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/useAuth";
import dayjs from "dayjs";
import { useFetchUsersProfile } from "../../hooks/userQueries";

import { useFetchStats } from "../../hooks/visitorQueries";
import YearMonthFilter from "../../components/filter/YearMonthFIlter";
import PurposeFilter from "../../components/filter/PurposeFilter";
import VisitorPieChart from "../../components/charts/VisitorPieChart";
import VisitorsBarChart from "../../components/charts/VisitorsBarChart";

const DashboardSADPage = () => {
  const currentDate = new Date();

  // States
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [withPhoto, setWithPhoto] = useState(0);
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [officeCode, setOfficeCode] = useState(-1);
  const [purpose, setPurpose] = useState("All");
  const [format, setFormat] = useState("PDF");
  const [startDate, setStartDate] = useState(
    dayjs().subtract(2, "months").startOf("M").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    dayjs().startOf("day").format("YYYY-MM-DD"),
  );
  const { role } = useAuth();

  const allPurposes = [
    "To meet Minister",
    "To meet Chief Secretary",
    "To attend meeting/function",
    "To meet officers",
    "To visit Department",
  ];

  // Hooks
  const [searchValue] = useDebounce(searchText, 300);
  const navigate = useNavigate();

  // Queries

  const profileQuery = useFetchUsersProfile();
  const statsQuery = useFetchStats(month, year, purpose, officeCode);
  const purposeStatsQuery = useFetchPurposeStats(month, year, officeCode);

  //Disclosures
  const { isOpen, onOpen, onClose } = useDisclosure();

  const apiData = purposeStatsQuery?.data?.data || [];

  const pieData = allPurposes.map((purpose) => {
    const found = apiData.find((item) => item.purpose === purpose);

    return {
      name: purpose,
      value: found ? found.totalVisitors : 0,
    };
  });

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
                  <VStack>
                    <YearMonthFilter
                      year={year}
                      setYear={setYear}
                      month={month}
                      setMonth={setMonth}
                      setPageNumber={setPageNumber}
                    />
                    <Heading size="sm">
                      {profileQuery?.data?.data?.office}
                    </Heading>
                  </VStack>
                  {/* <PurposeFilter
                    purpose={purpose}
                    setPurpose={setPurpose}
                    setPageNumber={setPageNumber}
                  /> */}
                </HStack>
              </HStack>
              <Text fontWeight="bold">
                No. of Visitors: {statsQuery?.data?.data?.noOfVisitors}
              </Text>
              {/* <Text fontWeight="bold">
                Average visitors per day: {statsQuery?.data?.data?.avgVisitors}
              </Text> */}
              <Box
                flex="3"
                bg="gray.50"
                p={4}
                borderRadius="lg"
                boxShadow="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <VisitorsBarChart details={statsQuery?.data?.data?.details} />
              </Box>
              <HStack w="100%" spacing={4}>
                <Box
                  flex="1"
                  bg="gray.50"
                  p={4}
                  h="400px"
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <VisitorPieChart data={pieData} />
                </Box>
              </HStack>
            </Stack>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default DashboardSADPage;
