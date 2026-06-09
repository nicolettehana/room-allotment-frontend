import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import { Container, HStack, Stack } from "@chakra-ui/react";
import { useFetchAuditTrail } from "../../../hooks/adminQueries";
import DateFilter from "../../../components/filter/DateFilter";
import { useState } from "react";
import dayjs from "dayjs";
import LogsTableWrapper from "./LogsTableWrapper";
import { PageSizing } from "../../../components/core/Table";

const AdminLogsPage = () => {
  // States
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [fromDate, setFromDate] = useState(
    dayjs().subtract(2, "months").startOf("M").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState(dayjs().endOf("M").format("YYYY-MM-DD"));

  // Queries
  const auditTrailQuery = useFetchAuditTrail(
    pageNumber,
    pageSize,
    fromDate,
    toDate
  );

  return (
    <Main>
      <Section>
        <Container minW="full">
          <Stack spacing={4}>
            {/* Filter */}
            <HStack justifyContent="space-between">
              <PageSizing
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPageNumber={setPageNumber}
              />

              <DateFilter
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                setPageNumber={setPageNumber}
              />
            </HStack>

            <LogsTableWrapper
              query={auditTrailQuery}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </Stack>
        </Container>
      </Section>
    </Main>
  );
};

export default AdminLogsPage;
