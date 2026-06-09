import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import GuestNavbar from "../navigations/guest/GuestNavbar";
import GuestNavDrawer from "../navigations/guest/GuestNavDrawer";
import { Center, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import { useFetchUsersProfile } from "../../hooks/userQueries";

const AuthRoutes = () => {
  // Disclosures
  const drawer = useDisclosure();

  // Queries
  const profileQuery = useFetchUsersProfile();

  if (profileQuery.isPending) {
    return (
      <Center minH="100dvh">
        <Spinner thickness="4px" size="xl" color="brand.600" />
      </Center>
    );
  }

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role === "USER")
    return <Navigate to="/user/dashboard" />;

  return (
    <>
      <ScrollToTop />
      <GuestNavDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
      <Stack minH="100dvh" justifyContent="space-between" spacing={8}>
        <GuestNavbar onOpen={drawer.onOpen} />
        <Outlet />
        <div />
      </Stack>
    </>
  );
};

export default AuthRoutes;
