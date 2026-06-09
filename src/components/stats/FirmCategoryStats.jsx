import React from "react";
import {
  Center,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

const FirmCategoryStats = ({ data, isPending }) => {
  return (
    <Stack>
      <HStack
        border="1px"
        borderColor="border"
        p={4}
        rounded="md"
        wrap="wrap"
        justifyContent="space-between"
        gap={4}
      >
        <Text>Total: {data?.total}</Text>
        <Text color="green.600">
          {data?.byCategory[0]?.category}: {data?.byCategory[0]?.totalFirms}
        </Text>
        <Text color="red.600">
          {data?.byCategory[2]?.category}: {data?.byCategory[2]?.totalFirms}
        </Text>
        <Text color="yellow.600">
          {data?.byCategory[1]?.category}: {data?.byCategory[1]?.totalFirms}
        </Text>
      </HStack>
    </Stack>
  );
};

export default FirmCategoryStats;
