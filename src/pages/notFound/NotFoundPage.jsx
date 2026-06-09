import React from "react";
import Main from "../../components/core/semantics/Main";
import Section from "../../components/core/semantics/Section";
import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";

const NotFoundPage = () => {
  // Routers
  const navigate = useNavigate();

  return (
    <Main>
      <Section>
        <Center minH="100dvh">
          <VStack spacing={4}>
            <VStack>
              <Heading size="xl">404 | Page Not Found</Heading>
              <Text color="body">The page you requested does not exists.</Text>
            </VStack>
            <Button
              size="lg"
              variant="outline"
              leftIcon={<MdOutlineArrowBack size={20} />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </VStack>
        </Center>
      </Section>
    </Main>
  );
};

export default NotFoundPage;
