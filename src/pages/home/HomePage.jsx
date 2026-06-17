import { useState, useRef } from "react";
import Main from "../../components/core/semantics/Main";
import Section from "../../components/core/semantics/Section";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Hide,
  HStack,
  UnorderedList,
  SimpleGrid,
  Stack,
  Text,
  ListItem,
  Link as CLink,
  Show,
  VStack,
  FormControl,
  Input,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SignInForm from "../../forms/auth/SignInForm";
import frontImg from "../../assets/front3.png";
//import inventoryImg from "../../assets/inventoryy.jpg";
import MdIcon from "../../components/core/MdIcon";
import { useGetXsrfToken } from "../../hooks/authQueries";
import { useFetchHalls } from "../../hooks/roomQueries";
import { useFetchHallAllotments } from "../../hooks/hallBookingQueries";
import TimelineScheduler from "../../components/charts/TimelineScheduler";
import OfficeFilter from "../../components/filter/OfficeFilter";
import { useFetchOffices } from "../../hooks/officeQueries";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const HomePage = () => {
  //States
  const [officeCode, setOfficeCode] = useState("-1");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  // Queries
  const officesQuery = useFetchOffices();
  const hallsQuery = useFetchHalls(officeCode);
  const hallAllotmentQuery = useFetchHallAllotments(selectedDate, officeCode);

  //Ref
  const filterRef = useRef(null);

  //Handlers
  const handleOfficeChange = (value) => {
    setOfficeCode(value);

    filterRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Main bg="red">
      <Section bg="red">
        <Container maxW="container.xl" bg="white">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={0}>
            {/* LHS */}

            {/* RHS */}
            <Center>
              <VStack spacing={8}>
                <Box
                  //bg="brand.100"
                  //bg="paper"
                  bg="brown.50"
                  border="1px"
                  borderColor="border"
                  rounded="2xl"
                  p={8}
                  w="sm"
                  maxW="sm"
                  shadow="lg"
                >
                  <SignInForm />
                </Box>
              </VStack>
            </Center>

            <Hide below="lg">
              <Stack
                spacing={4}
                //mt={16}
                backgroundImage={`url(${frontImg})`}
                minH="100%"
                backgroundSize="cover"
                backgroundPosition="center"
              >
                <Stack spacing={16}>
                  <Stack
                    spacing={16}
                    //backgroundImage={inventoryImg}
                    backgroundSize="cover"
                    backgroundPosition="center"
                  >
                    <Stack spacing={3} color="zinc.900">
                      <Heading size="lg">Room Allotment System</Heading>
                      <Text fontSize="xl">
                        <strong>Secretariat Administration Department</strong>{" "}
                        <br />
                        <Text fontSize="xl">
                          <strong>Government Of Meghalaya</strong>
                        </Text>
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Hide>
          </SimpleGrid>
        </Container>
        <Divider
          borderColor="brown.700 !important"
          borderWidth="10px"
          opacity={1}
        />
        <Stack spacing={4} mx={8} my={17}>
          {/* Filter */}
          <HStack justifyContent="space-between" spacing={2}>
            <HStack>
              <VStack ref={filterRef}>
                <FormControl>
                  {/* <FormLabel htmlFor="date">Date</FormLabel> */}
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      filterRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  />
                </FormControl>

                {/* <Heading size="sm">
                      {profileQuery?.data?.data?.office}
                    </Heading> */}
              </VStack>
              <OfficeFilter
                //setPageNumber={setPageNumber}
                query={officesQuery}
                officeCode={officeCode}
                //setOfficeCode={setOfficeCode}
                setOfficeCode={handleOfficeChange}
              ></OfficeFilter>
            </HStack>
            <Box position="absolute" left="43%">
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize={25}
                color="brown.800"
              >
                Meetings - {formatDate(selectedDate)}
              </Text>
            </Box>
          </HStack>

          <TimelineScheduler
            halls={hallsQuery?.data?.data}
            meetings={hallAllotmentQuery?.data?.data}
          />
        </Stack>
      </Section>
    </Main>
  );
};

export default HomePage;
