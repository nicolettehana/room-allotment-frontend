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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import VisitorSignInForm from "../../forms/auth/VisitorSignInForm";
import frontImg from "../../assets/frontImg22.png";
//import inventoryImg from "../../assets/inventoryy.jpg";
import MdIcon from "../../components/core/MdIcon";
import { useGetXsrfToken } from "../../hooks/authQueries";

const HomePage = () => {
  // Queries
  // const xsrfQuery = useGetXsrfToken();

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
                  // bg="white"
                  border="1px"
                  borderColor="border"
                  rounded="2xl"
                  p={8}
                  w="sm"
                  maxW="sm"
                  shadow="lg"
                >
                  <VisitorSignInForm />
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
                    <Stack spacing={3} color="lgreen.950">
                      <Heading size="lg">Visitor e-Pass System</Heading>
                      <Text fontSize="2xl">
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
      </Section>
    </Main>
  );
};

export default HomePage;
