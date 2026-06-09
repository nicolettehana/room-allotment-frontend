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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import { useExportVisitors } from "../../hooks/visitorQueries";
import { useFetchVisitors } from "../../hooks/visitorQueries";
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

const VisitorsAdminPage = () => {
  // States
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [withPhoto, setWithPhoto] = useState(0);
  const [officeCode, setOfficeCode] = useState("");
  const [format, setFormat] = useState("PDF");
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

  const visitorsQuery = useFetchVisitors(
    searchValue,
    pageNumber,
    pageSize,
    startDate,
    endDate,
    officeCode,
  );
  const exportVisitorsMutation = useExportVisitors();

  //Disclosures
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Handlers

  const handleExportVisitors = () => {
    const extension = format === "PDF" ? "pdf" : "xlsx";
    console.log("here");

    exportVisitorsMutation.mutate(
      {
        startDate,
        endDate,
        format: format,
        withPhoto: withPhoto,
        officeCode,
      },
      {
        // onSuccess: (response) => {
        //   const url = window.URL.createObjectURL(new Blob([response]));
        //   const mimeType =
        //     exportFormat === "PDF"
        //       ? "application/pdf"
        //       : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        //   const blob = new Blob([response], { type: mimeType });

        //   const link = document.createElement("a");
        //   link.href = url;
        //   link.download = `Visitors_${startDate}-${endDate}.${extension}`;
        //   link.click();
        //   link.remove();

        //   onClose();
        // },
        onSuccess: (response) => {
          console.log("Seuccess");
          const mimeType =
            format === "PDF"
              ? "application/pdf"
              : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

          const blob = new Blob([response], { type: mimeType });

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `Visitors_${startDate}-${endDate}.${extension}`;
          document.body.appendChild(link);
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
            <Stack spacing={4}>
              {/* Filter */}
              <HStack justifyContent="space-between" spacing={2}>
                <HStack>
                  <VStack>
                    <DateFilter
                      fromDate={startDate}
                      setFromDate={setStartDate}
                      toDate={endDate}
                      setToDate={setEndDate}
                      setPageNumber={setPageNumber}
                    />
                    <Heading size="sm">
                      {profileQuery?.data?.data?.office}
                    </Heading>
                  </VStack>
                  <OfficeFilter
                    pageNumber={pageNumber}
                    query={officesQuery}
                    officeCode={officeCode}
                    setOfficeCode={setOfficeCode}
                  ></OfficeFilter>
                </HStack>

                <HStack>
                  <Menu>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Export Options</ModalHeader>
                        <ModalBody>
                          <RadioGroup value={withPhoto} onChange={setWithPhoto}>
                            <VStack align="start">
                              <Radio value="1">Include Visitor Photos</Radio>
                              <Radio value="0">Without Photos</Radio>
                            </VStack>
                          </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button mr={3} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={handleExportVisitors}
                            variant="brand"
                          >
                            Download {format}
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <MenuButton
                      as={Button}
                      leftIcon={<FaFileDownload />}
                      variant="brand"
                    >
                      Download
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          setFormat("Excel");
                          onOpen();
                        }}
                      >
                        Excel
                      </MenuItem>
                      {/* <MenuItem onClick={() => handleExportVisitors("Excel")}>
                        Excel
                      </MenuItem> */}
                      {/* <MenuItem onClick={() => handleExportVisitors("PDF")}> */}
                      <MenuItem
                        onClick={() => {
                          setFormat("PDF");
                          onOpen();
                        }}
                      >
                        PDF
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  {/* <Button
                    variant="brand"
                    leftIcon={<FaFileExport />}
                    onClick={() => {
                      handleExport();
                    }}
                  >
                    Export to Excel
                  </Button> */}
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
              <VisitorsTableWrapper
                query={visitorsQuery}
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

export default VisitorsAdminPage;
