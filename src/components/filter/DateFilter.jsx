import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { MdOutlineFilterList } from "react-icons/md";

const today = new Date().toISOString().split("T")[0];

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DateFilter = ({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setPageNumber,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" leftIcon={<MdOutlineFilterList size={20} />}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.2,
            }}
          >
            <VStack spacing={0} align="start">
              <Text>Date:</Text>
              <Text fontSize="sm">
                {formatDate(fromDate)} – {formatDate(toDate)}
              </Text>
            </VStack>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Date Filter</PopoverHeader>
        <PopoverBody>
          <Stack>
            <FormControl>
              <FormLabel htmlFor="fromDate">From Date</FormLabel>
              <Input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setPageNumber(0);
                }}
                max={toDate}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="toDate">To Date</FormLabel>
              <Input
                type="date"
                name="toDate"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setPageNumber(0);
                }}
                min={fromDate}
                max={today}
              />
            </FormControl>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
