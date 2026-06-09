import {
  Badge,
  Box,
  Center,
  Heading,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
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
import { MdOutlineTableChart } from "react-icons/md";
import dayjs from "dayjs";

const LogsTableWrapper = ({ query, pageNumber, setPageNumber }) => {
  // Error State
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
              {query?.error?.response?.data?.detail || "Couldn't fetch data."}
            </Text>
          </VStack>
        </VStack>
      </Center>
    );
  }

  // Empty State
  if (query.isSuccess && query?.data?.data?.empty) {
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
            <Heading size="md">Logs is empty</Heading>
            <Text color="body" textAlign="center">
              Logs will be displayed here.
            </Text>
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
              <Th>Username</Th>
              <Th>URI</Th>
              <Th>Description</Th>
              <Th>Action</Th>
              <Th>Status</Th>
              <Th>IP Address</Th>
              <Th>Timestamp</Th>
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
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {elementCounter(index, query)}
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {row?.username || "-"}
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {row?.uri}
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {row?.description}
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {row?.action}
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      <Badge
                        colorScheme={
                          row?.status === "Success" ? "green" : "red"
                        }
                      >
                        {row?.status}: {row?.httpStatus}
                      </Badge>
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {row?.ipAddress}
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={1}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      {dayjs(new Date(row?.timestamp)).format(
                        "DD MMM YYYY, hh:mm a"
                      )}
                    </SkeletonText>
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

export default LogsTableWrapper;
