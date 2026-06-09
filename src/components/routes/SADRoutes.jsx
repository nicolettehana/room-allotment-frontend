import { Navigate, Outlet } from "react-router-dom";
import { Center, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import LogoutForm from "../../forms/auth/LogoutForm";
import { useFetchUsersProfile } from "../../hooks/userQueries";
import UsersSidebarDrawer from "../navigations/users/UsersSidebarDrawer";
import UsersSidebar from "../navigations/users/UsersSidebar";
import UsersNavbar from "../navigations/users/UsersNavbar";
import { useAuthContext } from "../auth/authContext";

const SADRoutes = () => {
  const logoutModal = useDisclosure();
  const drawer = useDisclosure();
  const { role, isAuthLoading, logout } = useAuthContext();

  const profileQuery = useFetchUsersProfile({
    enabled: !isAuthLoading && role === "SAD",
  });

  // 1. Still restoring session from storage → show loading
  if (isAuthLoading) {
    return (
      <Center minH="100dvh">
        <Spinner thickness="4px" size="xl" color="brand.600" />
      </Center>
    );
  }

  // 2. Auth check finished → no valid session
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // 3. Logged in but wrong role
  if (role !== "SAD") {
    return <Navigate to="/" replace />;
  }

  // 4. Optional: wait for profile verification
  if (profileQuery.isPending) {
    return (
      <Center minH="100dvh">
        <Spinner thickness="4px" size="xl" color="brand.600" />
      </Center>
    );
  }

  // 5. Profile fetch failed → force logout
  if (profileQuery.isError) {
    logout();
    return <Navigate to="/" replace />;
  }

  // Optional strict check (uncomment if you want extra safety)
  // if (profileQuery.data?.data?.role !== "SAD") {
  //   logout();
  //   return <Navigate to="/" replace />;
  // }

  const profile = profileQuery.data?.data;

  return (
    <>
      <ScrollToTop />
      <UsersSidebarDrawer isOpen={drawer.isOpen} onClose={drawer.onClose} />
      <LogoutForm isOpen={logoutModal.isOpen} onClose={logoutModal.onClose} />

      <Stack minH="100dvh" justifyContent="space-between" spacing={8}>
        <Stack direction="row" spacing={0}>
          <UsersSidebar profile={profile} />
          <Stack spacing={4} w="full" ml={{ base: 0, lg: 64 }}>
            <UsersNavbar
              onOpen={drawer.onOpen}
              openLogout={logoutModal.onOpen}
              profile={profile}
            />
            <Outlet />
            <div /> {/* optional spacer */}
          </Stack>
        </Stack>
        {/* Footer goes here if you have one */}
      </Stack>
    </>
  );
};

export default SADRoutes;
