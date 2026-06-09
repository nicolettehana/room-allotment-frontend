import React from "react";
import Header from "../../core/semantics/Header";
import { NavLink, Link as RouterLink } from "react-router-dom";
import {
  Button,
  Hide,
  Stack,
  HStack,
  IconButton,
  Link,
  Show,
  useColorMode,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { MdOutlineMenu, MdOutlineWbSunny } from "react-icons/md";
import { AiOutlineMoon } from "react-icons/ai";
import meghalayaImg from "../../../assets/meg_emblem.png";
import emblemSvg from "../../../assets/indian-emblem.svg";
import digitalImg from "../../../assets/digital.png";

const GuestNavbar = ({ onOpen }) => {
  const links = [
    // { label: "Home", path: "/" },
    // { label: "Manual", path: "/manual" },
    // { label: "Contact Us", path: "/contact-us" },
    // { label: "Privacy Policy", path: "/privacy-policy" },
  ];

  // Theme
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack pl={5}>
      <Header borderBottom="none" pos="relative">
        <HStack direction="row" justifyContent="space-between">
          {/* LHS */}

          <Link as={RouterLink} variant="logo" to="/">
            <HStack spacing={4}>
              <Image
                src={meghalayaImg}
                w={14}
                h={14}
                alt="Meghalaya Emblem"
                rounded="full"
              />
              <Image
                src={emblemSvg}
                h={14}
                alt="Indian Emblem"
                filter={useColorModeValue("none", "auto")}
                brightness={0}
                invert={1}
              />
              <Image src={digitalImg} h={14} alt="Digital India" />{" "}
            </HStack>
          </Link>

          {/* MID */}
          <HStack
            as="ul"
            spacing={8}
            listStyleType="none"
            display={{ base: "none", xl: "flex" }}
          >
            {links.map((link) => (
              <li key={link.path}>
                <Link as={NavLink} variant="nav" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </HStack>

          {/* RHS */}
          <HStack>
            <IconButton
              aria-label="Theme mode"
              variant="ghost"
              icon={
                colorMode === "light" ? (
                  <MdOutlineWbSunny size={20} />
                ) : (
                  <AiOutlineMoon size={20} />
                )
              }
              onClick={toggleColorMode}
            />
            {/* <Hide below="xl">
              <Button variant="brand" as={RouterLink} to="/auth/sign-in">
                Official's Sign In
              </Button>
            </Hide> */}
            <Show below="xl">
              <IconButton
                variant="ghost"
                icon={<MdOutlineMenu size={20} />}
                onClick={onOpen}
              />
            </Show>
          </HStack>
        </HStack>
      </Header>
    </Stack>
  );
};

export default GuestNavbar;
