// src/components/dashboard/StockList.jsx

import {
  Card,
  CardBody,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const StockList = ({ title, value, items }) => {
  return (
    <Card>
      <CardBody>
        <Heading size="sm">{title}</Heading>

        <Text mt={2} fontWeight="bold">
          {value}
        </Text>

        <UnorderedList styleType="square" spacing={2} mt={2}>
          {items.map((parent, i) => (
            <ListItem key={i}>
              <Text as="span" fontWeight="bold">
                {parent.name}
              </Text>

              {parent.children && parent.children.length > 0 && (
                <UnorderedList ml={6} mt={2}>
                  {parent.children.map((child, j) => (
                    <ListItem key={j}>{child}</ListItem>
                  ))}
                </UnorderedList>
              )}
            </ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export default StockList;
