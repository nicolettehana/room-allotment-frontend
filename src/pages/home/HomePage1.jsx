import { useState } from "react";
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
  FormLabel,
  Input
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
  // const xsrfQuery = useGetXsrfToken();

  return (
    <Main bg="red">
      <Section bg="red">
        <Container maxW="container.xl" bg="white">
          <SimpleGrid 
          //columns={{ base: 1, lg: 2 }} 
          templateColumns={{ base: "1fr", lg: "30% 70%" }}
          spacing={5}>

            {/* LHS */}            

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

            {/* RHS */}
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
        <Stack spacing={4} mt={8}>
              {/* Filter */}
              <HStack justifyContent="space-between" spacing={2}>
                <HStack>
                  <VStack>
                    <FormControl>
                      {/* <FormLabel htmlFor="date">Date</FormLabel> */}
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
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
                    setOfficeCode={setOfficeCode}
                  ></OfficeFilter>
                </HStack>
                <Box position="absolute" left="50%">
                  <Text textAlign="center" fontWeight="bold" fontSize={25} color="brown.800">
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
