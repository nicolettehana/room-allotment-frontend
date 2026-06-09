import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Center, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import LogoutForm from "../../forms/auth/LogoutForm";
import UsersSidebar from "../navigations/users/UsersSidebar";
import UsersNavbar from "../navigations/users/UsersNavbar";
import UsersSidebarDrawer from "../navigations/users/UsersSidebarDrawer";
import { useFetchUsersProfile } from "../../hooks/userQueries";

const UserRoutes = () => {
  // Disclosures
  const logout = useDisclosure();
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

  if (profileQuery.isError) {
    return <Navigate to="/" />;
  }

  if (profileQuery.isSuccess && profileQuery?.data?.data?.role !== "USER") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <ScrollToTop />
      <UsersSidebarDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
      <LogoutForm isOpen={logout.isOpen} onClose={logout.onClose} />

      <Stack minH="100dvh" justifyContent="space-between" spacing={8}>
        <Stack direction="row" spacing={0}>
          <UsersSidebar profile={profileQuery?.data?.data} />
          <Stack spacing={4} w="full" ml={{ base: 0, lg: 64 }}>
            <UsersNavbar
              onOpen={drawer.onOpen}
              openLogout={logout.onOpen}
              profile={profileQuery?.data?.data}
            />
            <Outlet />
            <div />
          </Stack>
        </Stack>
        {/* Footer Here */}
      </Stack>
    </>
  );
};

export default UserRoutes;
