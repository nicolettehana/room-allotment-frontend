import { useState } from "react";
import {
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  LightMode,
  SkeletonText,
  Stack,
  Switch,
  Text,
  useToast,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  elementCounter,
  PageSizing,
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
import { useEnableDisableUsers } from "../../../hooks/adminQueries";
import { useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { useFetchOffices } from "../../../hooks/officeQueries";
import UpdateUserModal from "./UpdateUserModal";

const ManageUsersTableWrapper = ({
  query,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
}) => {
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
            <Heading size="md">Users is empty</Heading>
            <Text color="body" textAlign="center">
              Users that are registered will be displayed here.
            </Text>
          </VStack>
        </VStack>
      </Center>
    );
  }

  // States
  const [rowState, setRowState] = useState({});

  // Hooks
  const toast = useToast();

  // Queries
  const queryClient = useQueryClient();
  const officesQuery = useFetchOffices();
  const enableDisableQuery = useEnableDisableUsers(
    (response) => {
      queryClient.invalidateQueries({
        queryKey: ["fetch-all-users"],
      });

      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.message || "Enabled/Disabled successfully",
      });
      return response;
    },
    (error) => {
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description:
          error.response.data.detail ||
          "Oops! something went wrong. Couldn't enable/disable users.",
      });
      return error;
    },
  );

  //Disclosure
  const updateUserDisclosure = useDisclosure();

  return (
    <Stack spacing={4}>
      <UpdateUserModal
        isOpen={updateUserDisclosure.isOpen}
        onClose={updateUserDisclosure.onClose}
        row={rowState}
      />
      {/* Page Size */}
      <PageSizing
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
      />

      {/* Table */}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Sl. No.</Th>
              <Th>Office</Th>
              <Th>Name & Username</Th>
              <Th>Designation & Department</Th>
              <Th>Email & Mobile No.</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(query.isPending
              ? new Array(pageSize).fill(null)
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
                    {officesQuery?.data?.data?.find(
                      (office) => office.officeCode === row?.officeCode,
                    )?.officeName || "-"}
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={2}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      <Stack spacing={0}>
                        <Text>{row?.name}</Text>
                        <Text color="body" fontSize="sm">
                          {row?.username}
                        </Text>
                      </Stack>
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={2}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      <Stack spacing={0}>
                        <Text color="body" fontSize="sm">
                          {row?.designation}
                        </Text>
                        <Text>{row?.department}</Text>
                      </Stack>
                    </SkeletonText>
                  </Td>

                  <Td>
                    <SkeletonText
                      noOfLines={2}
                      isLoaded={!query.isPending}
                      fadeDuration={index}
                    >
                      <Stack spacing={0}>
                        <Text>{row?.email || "-"}</Text>
                        <Text color="body" fontSize="sm">
                          {row?.mobileNo}
                        </Text>
                      </Stack>
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
                          row?.role === "ASAD"
                            ? "orange"
                            : row?.role === "ADMIN"
                              ? "red"
                              : row?.role === "SAD"
                                ? "brand"
                                : ""
                        }
                      >
                        {row?.role === "ADMIN"
                          ? "SuperAdmin"
                          : row?.role === "ASAD"
                            ? "Admin"
                            : "Security"}
                      </Badge>
                    </SkeletonText>
                  </Td>

                  <Td>
                    <HStack>
                      {row?.enabled ? (
                        <Badge colorScheme="green">Enabled</Badge>
                      ) : (
                        <Badge colorScheme="red">Disabled</Badge>
                      )}

                      <LightMode>
                        <Switch
                          colorScheme="brand"
                          isChecked={row?.enabled}
                          onChange={() => {
                            enableDisableQuery.mutate({
                              username: row?.username,
                            });
                          }}
                        />
                      </LightMode>

                      <Button
                        variant="outline"
                        minW="auto"
                        //lineHeight="1"
                        bg="brand.50"
                        size="xs"
                        onClick={() => {
                          setRowState(row);
                          updateUserDisclosure.onOpen();
                        }}
                      >
                        <FaEdit />
                      </Button>
                    </HStack>
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

export default ManageUsersTableWrapper;
