import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import { Box, Center, Container } from "@chakra-ui/react";
import ForgotPasswordForm from "../../../forms/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
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
              <ForgotPasswordForm />
            </Box>
          </Center>
        </Container>
      </Section>
    </Main>
  );
};

export default ForgotPasswordPage;
