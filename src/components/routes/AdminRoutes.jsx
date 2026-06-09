import { Navigate, Outlet } from "react-router-dom";
import { Center, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import ScrollToTop from "./ScrollToTop";
import LogoutForm from "../../forms/auth/LogoutForm";
import UsersSidebar from "../navigations/users/UsersSidebar";
import UsersNavbar from "../navigations/users/UsersNavbar";
import UsersSidebarDrawer from "../navigations/users/UsersSidebarDrawer";
import { useFetchUsersProfile } from "../../hooks/userQueries";
import { useAuthContext } from "../auth/authContext";

const AdminRoutes = () => {
  const logoutModal = useDisclosure();
  const drawer = useDisclosure();
  const { role, isAuthLoading, logout } = useAuthContext();

  // Only fetch profile after auth restoration and correct role
  const profileQuery = useFetchUsersProfile({
    enabled: !isAuthLoading && role === "ADMIN",
  });

  // 1️⃣ Still restoring session
  if (isAuthLoading) {
    return (
      <Center minH="100dvh">
        <Spinner thickness="4px" size="xl" color="brand.600" />
      </Center>
    );
  }

  // 2️⃣ No valid session
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Logged in but wrong role
  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Waiting for profile verification
  if (profileQuery.isPending) {
    return (
      <Center minH="100dvh">
        <Spinner thickness="4px" size="xl" color="brand.600" />
      </Center>
    );
  }

  // 5️⃣ Profile fetch failed → force logout
  if (profileQuery.isError) {
    logout();
    return <Navigate to="/" replace />;
  }

  // Optional strict backend verification
  // if (profileQuery.data?.data?.role !== "ADMIN") {
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
            <div />
          </Stack>
        </Stack>
        {/* Footer here */}
      </Stack>
    </>
  );
};

export default AdminRoutes;
