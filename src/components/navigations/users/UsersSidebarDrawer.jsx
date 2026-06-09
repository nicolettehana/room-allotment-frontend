import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useColorModeValue,
  Link,
  Stack,
  Divider,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import MdIcon from "../../core/MdIcon";
import { useFetchMenuLinks } from "../../../hooks/uiQueries";

const UsersSidebarDrawer = ({ isOpen, onClose }) => {
  // Queries
  const menuQuery = useFetchMenuLinks();
  const sortedMenu = menuQuery?.data?.data?.sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <Drawer
      as="header"
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay
        bg="blackAlpha.700"
        backdropFilter="auto"
        backdropBlur="18px"
        backdropSaturate="180%"
      />
      <DrawerContent bg="black">
        <DrawerCloseButton />
        <DrawerHeader bg="gray.800">
          <Heading size="md" color="white">
            Visitor Pass | SAD
          </Heading>
        </DrawerHeader>

        <DrawerBody as="nav" bg="gray.800">
          <Stack spacing={1}>
            <Text fontSize="2xs" mb={2} letterSpacing="wider">
              MENU
            </Text>
            {sortedMenu?.map((link) => (
              <Link
                key={link.url}
                as={NavLink}
                variant="sidebar"
                to={link.url}
                onClick={onClose}
              >
                <HStack>
                  <MdIcon iconName={link.icon} />
                  <Text>{link.label}</Text>
                </HStack>
              </Link>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
};

export default UsersSidebarDrawer;
