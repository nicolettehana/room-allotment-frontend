// src/components/dashboard/StatCard.jsx

import { Card, CardBody, Heading, Text } from "@chakra-ui/react";

const StatCard = ({ title, value, bg, color }) => {
  return (
    <Card bg={bg} color={color}>
      <CardBody>
        <Heading size="sm">{title}</Heading>
        <Text mt={2} fontSize="xl" fontWeight="bold">
          {value}
        </Text>
      </CardBody>
    </Card>
  );
};

export default StatCard;
