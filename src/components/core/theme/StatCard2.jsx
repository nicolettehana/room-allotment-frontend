import { Card, CardBody, Heading, Text, Badge } from "@chakra-ui/react";
import { getCategoryColor, getCategoryColorScheme } from "../CategoryColors";

const StatCard2 = ({ title, value, categoryCode }) => {
  //const bg = getCategoryColorScheme(categoryCode) + ".50";
  //const bg = "#f7f7fcff";
  const bg = "gray.50";
  const textColor = getCategoryColorScheme(categoryCode) + ".100"; // readable on all your color backgrounds

  return (
    <>
      <Card
        bg={bg}
        color="brand.900"
        shadow="md"
        border="1px solid"
        borderColor={textColor}
      
      >
        <CardBody>
          <Heading size="sm">{title}</Heading>
          <Text mt={2} fontSize="lg" fontWeight="bold">
            {value}
          </Text>
        </CardBody>
      </Card>
    </>
  );
};

export default StatCard2;
