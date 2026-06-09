import { Container, Button, HStack, useDisclosure } from "@chakra-ui/react";
import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import { useFetchAllUsers } from "../../../hooks/adminQueries";
import { useState } from "react";
import ManageUsersTableWrapper from "./ManageUsersTableWrapper";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import CreateUserModal from "./CreateUserModal";


const AdminManageUsersPage = () => {
  // States
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Queries
  const usersQuery = useFetchAllUsers(pageNumber, pageSize);

  // Disclosures
  const createUserDisclosure = useDisclosure();

  return (
    <Main>
      <CreateUserModal
        isOpen={createUserDisclosure.isOpen}
        onClose={createUserDisclosure.onClose}
      />
      
      <Section>
        <HStack w="100%" justify="flex-end" p={6}>
          {/* {hasPermission(role, "canAddCategory") && ( */}
          <Button
            variant="brand"
            leftIcon={<MdOutlineAddCircleOutline />}
            onClick={createUserDisclosure.onOpen}
          >
            Add User
          </Button>
          {/* )} */}
        </HStack>
        <Container minW="full">
          <ManageUsersTableWrapper
            query={usersQuery}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Container>
      </Section>
    </Main>
  );
};

export default AdminManageUsersPage;
