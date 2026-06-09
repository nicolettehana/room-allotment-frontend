import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GuestNavbar from "../navigations/guest/GuestNavbar";
import GuestNavDrawer from "../navigations/guest/GuestNavDrawer";
import Footer from "./Footer";
import {
  Center,
  Spinner,
  Stack,
  useDisclosure,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import { useFetchUsersProfile } from "../../hooks/userQueries";

const GuestRoutes = () => {
  // Disclosures
  const drawer = useDisclosure();

  // Hooks
  //const contianerBg = useColorModeValue("brand.300", "brand.700");
  const contianerBg = useColorModeValue("zinc.100", "white");
  //const stackBg = useColorModeValue("brand.50", "brand.950");
  const stackBg = useColorModeValue("white", "white");

  // Queries
  const profileQuery = useFetchUsersProfile();

  // if (profileQuery.isPending) {
  //   return (
  //     <Center minH="100dvh">
  //       <Spinner thickness="4px" size="xl" color="brand.600" />
  //     </Center>
  //   );
  // }

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role === "USER")
    return <Navigate to="/user/dashboard" />;

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role === "CH")
    return <Navigate to="/ch/dashboard" />;

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role === "ASAD")
    return <Navigate to="/asad/visitors" />;

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role === "SAD")
    return <Navigate to="/sad/register" />;

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role === "ADMIN")
    return <Navigate to="/admin/logs" />;

  return (
    <>
      <ScrollToTop />
      <GuestNavDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
      <Container
        bg={contianerBg}
        w="full"
        maxW="none"
        h="100dvh"
        overflow="hidden"
      >
        <Center h="full" p={{ base: 4, md: 12 }}>
          <Stack
            w="full"
            maxW="container.xl"
            h="full"
            bg={stackBg}
            borderRadius="xl"
            boxShadow="xl"
            justify="space-between"
          >
            <GuestNavbar />
            <Outlet />
            <Footer />
          </Stack>
        </Center>
      </Container>
    </>
  );
};

export default GuestRoutes;
