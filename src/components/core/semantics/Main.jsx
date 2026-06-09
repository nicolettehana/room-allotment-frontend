import React from "react";
import { Stack } from "@chakra-ui/react";

const Main = ({ spacing = 8, children }) => {
  return (
    <Stack as="main" spacing={spacing}>
      {children}
    </Stack>
  );
};

export default Main;
