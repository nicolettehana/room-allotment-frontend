import React from "react";
import { Stack } from "@chakra-ui/react";

const Section = ({ children }) => {
  return (
    <Stack spacing={4} as="section">
      {children}
    </Stack>
  );
};

export default Section;
