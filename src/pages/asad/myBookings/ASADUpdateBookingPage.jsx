import { Container, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Main from "../../../components/core/semantics/Main";
import Section from "../../../components/core/semantics/Section";
import ASADUpdateBookingForm from "../../../forms/asad/ASADUpdateBookingForm";

const ASADUpdateBookingPage = () => {
  const { state } = useLocation();

  const data = state?.bookingQuery;

  return (
    <Main>
      <Section>
        <Container maxW="container.xl">
          {/* <Heading size="md">Visitor e-Pass Registration</Heading> */}
        </Container>
      </Section>

      <Section>
        <Container maxW="container.xl">
          <ASADUpdateBookingForm bookingQuery={data} />
        </Container>
      </Section>
    </Main>
  );
};

export default ASADUpdateBookingPage;
