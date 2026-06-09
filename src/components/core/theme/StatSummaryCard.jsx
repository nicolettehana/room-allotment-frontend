import { Card, CardBody, Heading, Text, Stack, Flex } from "@chakra-ui/react";
import { getCategoryColorScheme } from "../CategoryColors";

const StatSummaryCard = ({ bg, fcolor, title, total, categories }) => {
  //const bg = "#f9fafeff";
  const bg1 = bg + ".900";

  return (
    <Card
      bg={bg}
      color={fcolor}
      shadow="xl"
      border="1px solid"
      borderColor="#CAD5DF"
    >
      {/* <Card> */}
      <CardBody>
        {/* Title + Total */}
        <Heading size="md" mb={2}>
          {title}
        </Heading>

        <Text fontSize="2xl" fontWeight="bold" mb={3}>
          {total}
        </Text>

        {/* Category list */}
        <Stack spacing={1}>
          {categories?.map((cat) => {
            //const color = getCategoryColorScheme(cat?.categoryCode) + ".700";
            //const color = "white";
            //const color = bg + ".200";
            const color = fcolor;

            return (
              <Flex key={cat?.categoryCode} justify="space-between">
                <Text fontWeight="medium" color={color}>
                  {cat?.category}
                </Text>
                <Text fontWeight="bold" color={color}>
                  {cat?.totalFirms}
                </Text>
              </Flex>
            );
          })}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default StatSummaryCard;
