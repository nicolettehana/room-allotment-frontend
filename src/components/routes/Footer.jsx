import React from "react";
import { Box, Container, Link, Show, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container as="footer" maxW="container.xl">
      <Box
        py={4}
        //bg="paper"
        bg="brown.50"
        roundedTop="2xl"
        border="1px"
        borderBottom="0px"
        borderColor="border"
        shadow="lg"
      >
        <VStack>
          <VStack spacing={0}>
            <Text fontSize="xs" textAlign="center" color="brown.600">
              Content owned by Secretariat Administration Department, Government
              of Meghalaya
            </Text>

            <Text fontSize="xs" textAlign="center" color="brown.600">
              Developed and hosted by National Informatics Centre, Meghalaya
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Footer;
