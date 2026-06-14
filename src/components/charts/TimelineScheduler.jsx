import {
  Box,
  Flex,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

const START_HOUR = 10;
const END_HOUR = 18;

const TOTAL_MINUTES = (END_HOUR - START_HOUR+1) * 60;

const timeToMinutes = (time) => {
  const [h, m] = time.split(":")?.map(Number);
  return (h - START_HOUR) * 60 + m;
};

const EVENT_COLORS = [
  "blue.700",
  "green.700",
  "purple.700",
  "orange.700",
  "pink.700",
];

let colorIndex = 0;

export default function TimelineScheduler({
  halls,
  meetings,
}) {
  return (
    <Box
      overflowX="auto"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
    >
      {/* Header */}
      <Flex bg="gray.50" minW="1400px">
        <Box
          w="220px"
          p={4}
          borderRight="1px solid"
          borderColor="gray.200"
          fontWeight="bold"
        >
          Hall
        </Box>

        <Flex flex={1}>
          {Array.from(
            { length: END_HOUR - START_HOUR +1},
            (_, i) => START_HOUR + i
          )?.map((hour) => (
            <Box
              key={hour}
              flex={1}
              textAlign="center"
              borderLeft="1px solid"
              borderColor="gray.200"
              py={3}
              fontWeight="600"
            >
              {hour <= 12
                ? `${hour}:00 AM`
                : `${hour - 12}:00 PM`}
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Rows */}
      <VStack spacing={0} align="stretch" minW="1400px">
        {halls?.map((hall) => {
          const hallMeetings = meetings?.filter(
            (m) => m?.hallId === hall?.id
          );

          return (
            <Flex
              key={hall?.id}
              h="90px"
              borderTop="1px solid"
              borderColor="gray.200"
            >
              {/* Hall Name */}
              <Box
                w="220px"
                p={4}
                borderRight="1px solid"
                borderColor="gray.200"
                fontWeight="500"
              >
                {hall?.name}, {hall?.office}
              </Box>

              {/* Timeline */}
              <Box
                flex={1}
                position="relative"
              >
                {/* Hour Grid */}
                <Flex
                  position="absolute"
                  inset={0}
                >
                  {Array.from({
                    length:
                      END_HOUR - START_HOUR + 1,
                  })?.map((_, index) => (
                    <Box
                      key={index}
                      flex={1}
                      borderLeft="1px solid"
                      borderColor="gray.100"
                    />
                  ))}
                </Flex>

                {/* Events */}
                {hallMeetings?.map((meeting, index) => {
                  const color =
    EVENT_COLORS[colorIndex % EVENT_COLORS.length];

  colorIndex++;
                  const start =
                    timeToMinutes(meeting?.start);

                  const end =
                    timeToMinutes(meeting?.end);

                  const left =
                    (start / TOTAL_MINUTES) * 100;

                  const width =
                    ((end - start) /
                      TOTAL_MINUTES) *
                    100;

                  return (
                    <Tooltip
                      key={meeting?.id}
                      hasArrow
                      placement="top"
                      label={
                        <Box>
                          <Text fontWeight="bold">
                            {meeting?.department}
                          </Text>

                          <Text>
                            Purpose:
                            {" "}
                            {meeting?.purpose}
                          </Text>

                          <Text>
                            {meeting?.start}
                            {" - "}
                            {meeting?.end}
                          </Text>
                        </Box>
                      }
                    >
                      <Box
                        position="absolute"
                        top="12px"
                        left={`${left}%`}
                        width={`${width}%`}
                        h="60px"
                        bg={color}
                        //bg={EVENT_COLORS[index % EVENT_COLORS.length]}
                        //bg={meeting?.color}
                        color="white"
                        borderRadius="md"
                        px={3}
                        py={2}
                        cursor="pointer"
                        overflow="hidden"
                      >
                        <Text
                          fontWeight="bold"
                          fontSize="sm"
                        >
                          {meeting?.department}
                        </Text>

                        <Text fontSize="xs">
                          {meeting?.start}
                          {" - "}
                          {meeting?.end}
                        </Text>
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
}
