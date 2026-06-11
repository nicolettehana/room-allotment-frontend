import { Container, Heading } from "@chakra-ui/react";
import Main from "../../components/core/semantics/Main";
import Section from "../../components/core/semantics/Section";
import BookingForm from "../../forms/register/BookingForm";

const CreateBookingPage = () => {
  return (
    <Main>
      <Section>
        <Container maxW="container.xl">
          {/* <Heading size="md">Visitor e-Pass Registration</Heading> */}
        </Container>
      </Section>

      <Section>
        <Container maxW="container.xl">
          <BookingForm />
        </Container>
      </Section>
    </Main>
  );
};

export default CreateBookingPage;
