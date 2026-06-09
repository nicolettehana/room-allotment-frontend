import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import {
  Avatar,
  AvatarBadge,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useFetchUsersProfile } from "../../../hooks/userQueries";
import ChangePasswordForm from "../../../forms/profile/ChangePasswordForm";
import UpdateProfileForm from "../../../forms/profile/UpdateProfileForm";
import { encodeEmail } from "../../../components/utils/emailFormatter";
import ChangeMobileForm from "../../../forms/profile/ChangeMobileForm";
import { useState } from "react";
import VerifyChangeMobileOTPForm from "../../../forms/profile/VerifyChangeMobileOTPForm";

const UserProfilePage = () => {
  // Queries
  const profileQuery = useFetchUsersProfile();

  // States
  const [otpToken, setOtpToken] = useState("");
  const [mobileno, setMobileno] = useState("");

  // Disclosures
  const mobileDisclosure = useDisclosure();
  const verifyOtpDisclosure = useDisclosure();

  return (
    <Main>
      {/* Modals */}
      <ChangeMobileForm
        isOpen={mobileDisclosure.isOpen}
        onClose={mobileDisclosure.onClose}
        verifyOtpOnOpen={verifyOtpDisclosure.onOpen}
        setOtpToken={setOtpToken}
        setMobileno={setMobileno}
      />

      <VerifyChangeMobileOTPForm
        isOpen={verifyOtpDisclosure.isOpen}
        onClose={verifyOtpDisclosure.onClose}
        otpToken={otpToken}
        mobileno={mobileno}
      />

      <Section>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {/* User Info */}
            <Stack
              spacing={8}
              border="1px"
              borderColor="border"
              rounded="md"
              p={6}
            >
              <VStack spacing={4}>
                <Avatar
                  name={profileQuery?.data?.data?.name}
                  ring="1px"
                  ringColor="border"
                  bg={useColorModeValue("zinc.100", "zinc.900")}
                  color={useColorModeValue("zinc.950", "zinc.50")}
                  size="lg"
                >
                  <AvatarBadge
                    boxSize="1.25rem"
                    bg="lgreen.900"
                    borderColor={useColorModeValue("lgreen.200", "lgreen.800")}
                  />
                </Avatar>
                <VStack spacing={0}>
                  <Heading size="md">{profileQuery?.data?.data?.name}</Heading>
                  <Text color="body">{profileQuery?.data?.data?.username}</Text>
                </VStack>
              </VStack>

              <Stack>
                <SimpleGrid columns={2} gap={4}>
                  <Text color="body">Role</Text>
                  <Text>
                    {profileQuery?.data?.data?.role === "ADMIN"
                      ? "SuperAdmin"
                      : profileQuery?.data?.data?.role === "ASAD"
                        ? "Admin"
                        : "Security"}
                  </Text>
                </SimpleGrid>

                <SimpleGrid columns={2} gap={4}>
                  <Text color="body">Email</Text>
                  <Text>
                    {profileQuery?.data?.data?.email
                      ? encodeEmail(profileQuery?.data?.data?.email)
                      : "-"}
                  </Text>
                </SimpleGrid>

                <SimpleGrid columns={2} gap={4}>
                  <Text color="body">Department</Text>
                  <Text>{profileQuery?.data?.data?.department}</Text>
                </SimpleGrid>

                {profileQuery?.data?.data?.office && (
                  <SimpleGrid columns={2} gap={4}>
                    <Text color="body">Office</Text>
                    <Text>{profileQuery?.data?.data?.office}</Text>
                  </SimpleGrid>
                )}

                <SimpleGrid columns={2} gap={4}>
                  <Text color="body">Designation</Text>
                  <Text>{profileQuery?.data?.data?.designation}</Text>
                </SimpleGrid>

                <SimpleGrid columns={2} gap={4}>
                  <Text color="body">Mobile Number</Text>
                  <Text>{profileQuery?.data?.data?.mobileno}</Text>
                </SimpleGrid>
              </Stack>

              {/* <Button
                variant="outline"
                onClick={() => mobileDisclosure.onOpen()}
              >
                Edit Mobile Number
              </Button> */}
            </Stack>

            {/* Profile Forms */}
            <Tabs>
              <TabList>
                <Tab>Update Profile</Tab>
                <Tab>Change Password</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0} pt={4}>
                  <Stack
                    spacing={4}
                    border="1px"
                    borderColor="border"
                    rounded="md"
                    p={6}
                  >
                    <UpdateProfileForm profileQuery={profileQuery} />
                  </Stack>
                </TabPanel>
                <TabPanel p={0} pt={4}>
                  <Stack
                    spacing={4}
                    border="1px"
                    borderColor="border"
                    rounded="md"
                    p={6}
                  >
                    <ChangePasswordForm />
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </SimpleGrid>
        </Container>
      </Section>
    </Main>
  );
};

export default UserProfilePage;
