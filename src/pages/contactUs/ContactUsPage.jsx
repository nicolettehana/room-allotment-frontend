import React from "react";
import Main from "../../components/core/semantics/Main";
import Section from "../../components/core/semantics/Section";
import { Container, Heading, Stack, Text } from "@chakra-ui/react";

const ContactUsPage = () => {
  return (
    <Main>
      <Section>
        <Container maxW="container.xl">
          <Heading size="lg">Contact Us</Heading>
        </Container>
      </Section>

      <Section>
        <Container maxW="container.xl">
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Text fontWeight="bold">
                Secretariat Administration Department (Nazarat)
              </Text>
              <Stack spacing={0}>
                {/* <Text color="body">Room No.228 (1st floor)</Text> */}
                <Text color="body">Rilang Building Meghalaya Secretariat,</Text>
                <Text color="body">Shillong - 793001</Text>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Text fontWeight="bold">Technical Contact</Text>
              <Stack spacing={0}>
                <Text color="body">National Informatics Centre,</Text>
                <Text color="body">Meghalaya Secretariat Hill,</Text>
                <Text color="body">Shillong - 793001</Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </Main>
  );
};

export default ContactUsPage;
