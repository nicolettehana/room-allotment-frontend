import React from "react";
import {
  Box,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { useFetchMenuLinks } from "../../../hooks/uiQueries";
import MdIcon from "../../core/MdIcon";

const UsersSidebar = ({ profile }) => {
  // Queries
  const menuQuery = useFetchMenuLinks();
  const sortedMenu = menuQuery?.data?.data?.sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <Stack
      display={{ base: "none", lg: "block" }}
      w={256}
      borderRight="1px"
      borderColor="border"
      //bg="paperSecondary"
      bg="gray.800"
      minH="100dvh"
      pos="fixed"
      color="white"
      top={0}
      left={0}
      py={7}
    >
      <VisuallyHidden>Sidebar Menu</VisuallyHidden>
      <Stack spacing={8}>
        <Box px={4}>
          <Link
            as={RouterLink}
            variant="logo"
            to={
              profile?.role === "USER"
                ? "/user/dashboard"
                : profile?.role === "DA"
                ? "/da/dashboard"
                : profile?.role === "CH"
                ? "/ch/dashboard"
                : profile?.role === "ASAD"
                ? "/asad/visitors"
                : profile?.role === "SAD"
                ? "/sad/register"
                : ""
            }
          >
            <Heading size="md" color="white">
              Visitor Pass | SAD
            </Heading>
          </Link>
        </Box>

        <Stack spacing={1} px={4}>
          <Text fontSize="xs" mb={2} letterSpacing="wider">
            MENU
          </Text>
          {sortedMenu?.map((link) => (
            <Link key={link.url} as={NavLink} variant="sidebar" to={link.url}>
              <HStack>
                <MdIcon iconName={link.icon} />
                <Text>{link.label}</Text>
              </HStack>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UsersSidebar;
