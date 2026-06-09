import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import {
  Avatar,
  AvatarBadge,
  Button,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  SkeletonText,
  Badge,
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
import { useFetchUsersProfile } from "../../../hooks/userQueries";
import { useFetchOffices } from "../../../hooks/officeQueries";
import ChangeMobileForm from "../../../forms/profile/ChangeMobileForm";
import { useState } from "react";
import VerifyChangeMobileOTPForm from "../../../forms/profile/VerifyChangeMobileOTPForm";
import {
  getCategoryColor,
  getCategoryColorScheme,
} from "../../../components/core/CategoryColors";
import CreateOfficeModal from "./CreateOfficeModal";
import UpdateOfficeModal from "./UpdateOfficeModal";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { hasPermission } from "../../../components/auth/permissions";
import { useAuth } from "../../../components/auth/useAuth";

const OfficesPage = () => {
  // Queries
  const profileQuery = useFetchUsersProfile();
  const officesQuery = useFetchOffices();

  // States
  const [rowState, setRowState] = useState({});
  const { role } = useAuth();

  // Disclosures
  const createOfficeDisclosure = useDisclosure();
  const updateOfficeDisclosure = useDisclosure();

  return (
    <Main>
      <CreateOfficeModal
        isOpen={createOfficeDisclosure.isOpen}
        onClose={createOfficeDisclosure.onClose}
      />
      <UpdateOfficeModal
        isOpen={updateOfficeDisclosure.isOpen}
        onClose={updateOfficeDisclosure.onClose}
        officeName={rowState?.officeName}
        officeCode={rowState?.officeCode}
      />
      <Section>
        <Container maxW="container.xl">
          {/* User Info */}
          <Stack spacing={8} p={6}>
            <VStack spacing={4}>
              <HStack w="100%" justify="flex-end">
                {/* {hasPermission(role, "canAddCategory") && ( */}
                  <Button
                  variant="brand"
                  leftIcon={<MdOutlineAddCircleOutline />}
                  onClick={createOfficeDisclosure.onOpen}
                >
                  Add Office
                </Button>
               {/* )} */}
              </HStack>

              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Sl. No.</Th>
                      <Th>Office</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {(officesQuery.isPending
                      ? new Array(10).fill(null)
                      : officesQuery?.data?.data
                    )?.map((row, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <SkeletonText
                              w="8"
                              noOfLines={1}
                              isLoaded={!officesQuery.isPending}
                              fadeDuration={index}
                            >
                              {elementCounter(index)}
                            </SkeletonText>
                          </Td>
                          <Td>
                            <SkeletonText
                              noOfLines={1}
                              isLoaded={!officesQuery.isPending}
                              fadeDuration={index}
                            >
                              <Badge
                                colorScheme={getCategoryColorScheme(row?.code)}
                              >
                                {row?.officeName}
                              </Badge>
                            </SkeletonText>
                          </Td>
                          
                          <Td>
                              {/* {hasPermission(role, "canEditCategory") && ( */}
                                <Button
                                variant="outline"
                                minW="auto"
                                //lineHeight="1"
                                bg="brand.50"
                                size="xs"
                                onClick={() => {
                                  setRowState(row);
                                  updateOfficeDisclosure.onOpen();
                                }}
                              >
                                <FaEdit />
                              </Button>
                            {/* )} */}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </Stack>
        </Container>
      </Section>
    </Main>
  );
};

export default OfficesPage;
