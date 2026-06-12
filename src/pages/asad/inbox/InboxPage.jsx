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

import InboxTableWrapper from "./InboxTableWrapper";
import SearchInput from "../../../components/core/SearchInput";
import { useDebounce } from "use-debounce";
import { PageSizing } from "../../../components/core/Table";
import { useNavigate } from "react-router-dom";
import { FaFileDownload } from "react-icons/fa";
import { useAuth } from "../../../components/auth/useAuth";
import DateFilter from "../../../components/filter/DateFilter";
import dayjs from "dayjs";
import { useFetchUsersProfile } from "../../../hooks/userQueries";
import { useFetchPendingBookings } from "../../../hooks/hallBookingQueries";

const InboxPage = () => {
  // States
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [officeCode, setOfficeCode] = useState("");

  const { role } = useAuth();

  // Hooks
  const navigate = useNavigate();

  // Queries

  const profileQuery = useFetchUsersProfile();

  const pendingBookingsQuery = useFetchPendingBookings(pageNumber, pageSize);

  //Disclosures
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Main */}
      <Main>
        <Section>
          <Container minW="full">
            <Stack spacing={4}>
              {/* Filters */}
              <HStack justifyContent="space-between" spacing={4}>
                <PageSizing
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  setPageNumber={setPageNumber}
                />
              </HStack>

              {/* Table */}
              <InboxTableWrapper
                query={pendingBookingsQuery}
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

export default InboxPage;
