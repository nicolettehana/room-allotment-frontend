import { Container, Heading } from "@chakra-ui/react";
import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import ASADBookingForm from "../../../forms/asad/ASADBookingForm";

const ASADCreateBookingPage = () => {
  return (
    <Main>
      <Section>
        <Container maxW="container.xl">
          {/* <Heading size="md">Visitor e-Pass Registration</Heading> */}
        </Container>
      </Section>

      <Section>
        <Container maxW="container.xl">
          <ASADBookingForm />
        </Container>
      </Section>
    </Main>
  );
};

export default ASADCreateBookingPage;
