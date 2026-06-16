import { Container, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Main from "../../components/core/semantics/Main";
import Section from "../../components/core/semantics/Section";
import UpdateBookingForm from "../../forms/register/UpdateBookingForm";

const UpdateBookingPage = () => {
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
          <UpdateBookingForm bookingQuery={data} />
        </Container>
      </Section>
    </Main>
  );
};

export default UpdateBookingPage;
