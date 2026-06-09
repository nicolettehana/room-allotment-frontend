import React from "react";
import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import { Box, Center, Container } from "@chakra-ui/react";
import RegisterForm from "../../../forms/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <Main>
      <Section>
        <Container maxW="container.xl">
          <Center>
            <Box
              bg="paper"
              border="1px"
              borderColor="border"
              rounded="2xl"
              p={8}
              w="sm"
              maxW="sm"
            >
              <RegisterForm />
            </Box>
          </Center>
        </Container>
      </Section>
    </Main>
  );
};

export default RegisterPage;
