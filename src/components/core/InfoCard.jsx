import React from "react";
import {
  Box,
  Flex,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";

// Reusable Card Component
export const InfoCard = ({ label, value, subLabels = [] }) => {
  return (
    <Card borderWidth="1px" borderRadius="lg" p={4} boxShadow="sm" w="100%">
      <CardHeader>
        <Heading size="md">{label}</Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize="xl" fontWeight="bold">
          {value}
        </Text>
        <Stack mt={3} spacing={1}>
          {subLabels.map((sub, i) => (
            <Text key={i} fontSize="sm" color="gray.600">
              • {sub}
            </Text>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

// Main Layout Component
export default function PageLayout() {
  const topCards = [
    { label: "Card 1", value: "123", subLabels: ["a", "b"] },
    { label: "Card 2", value: "456", subLabels: ["c", "d"] },
    { label: "Card 3", value: "789", subLabels: ["e", "f"] },
  ];

  const bottomCards = [
    { label: "Card A", value: "10", subLabels: ["x", "y"] },
    { label: "Card B", value: "20", subLabels: ["z", "w"] },
    { label: "Card C", value: "30", subLabels: ["m", "n"] },
  ];

  return (
    <Flex h="100vh">
      {/* Left Column (80%) */}
      <Box w="80%" p={4}>
        <Flex direction="column" h="100%" gap={4}>
          {/* Top Stack */}
          <Flex gap={4}>
            {topCards.map((card, i) => (
              <InfoCard key={i} {...card} />
            ))}
          </Flex>

          {/* Bottom Stack */}
          <Flex gap={4}>
            {bottomCards.map((card, i) => (
              <InfoCard key={i} {...card} />
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Right Column (20%) */}
      <Box w="20%" bg="gray.50" p={4}>
        Right Column Content
      </Box>
    </Flex>
  );
}
