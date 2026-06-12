import { Form, Formik, FieldArray } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  Button,
  HStack,
  VStack,
  SimpleGrid,
  Stack,
  useToast,
  Box,
  FormLabel,
  Text,
  Flex,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import InputField from "../../components/core/formik/InputField";

import SelectField from "../../components/core/formik/SelectField";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SelectFieldSearchable from "../../components/core/formik/SelectFieldSearchable";
import dayjs from "dayjs";
import { MdHorizontalRule } from "react-icons/md";
import { useAuth } from "../../components/auth/useAuth";
import { useTakeAction } from "../../hooks/hallBookingQueries";

const TakeActionForm = ({ data, onSuccess }) => {
  const { role } = useAuth();

  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const takeAction = useTakeAction(
    (response) => {
      console.log("SUCCESS", response);
      queryClient.invalidateQueries({ queryKey: ["pending-bookings"] });
      navigate("/asad/inbox");
      //onClose();
      onSuccess(); 
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response?.data?.detail || "Success",
      });

      return response;
    },
    (error) => {
      console.log("ERROR", error);
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description:
          error?.response?.data?.detail || "Error",
      });
      return error;
    },
  );


  const initialValues = {
    remark: "",
    action: "",
    bookingId: data?.bookingId
  };

  const validationSchema = yup.object({
    remark: yup.string(),
    //remarks: yup.string(),
    action: yup.string().required("Action is required"),
    bookingId: yup.string()

  });

  const onSubmit = (values) => {
    const formData = { ...values };
    console.log("form data: ", formData);
    takeAction.mutate(formData);
  };

  return (
    <Formik
      enableReinitialize={!!data}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <>
            <Stack as={Form} spacing={8}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={4}
                mb={5}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                bg="brown.100"
              >
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Booking ID:{" "}
                  </Text>
                  {data.bookingId}
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Department:
                  </Text>{" "}
                  {data.department}
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Purpose:
                  </Text>{" "}
                  {data.purpose}
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Date & Time:
                  </Text>{" "}
                  {new Date(data.meetingDate)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}{" "}
                  (
                  {new Date(`1970-01-01T${data?.startTime}`).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    },
                  )}
                  {" - "}
                  {new Date(`1970-01-01T${data?.endTime}`).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "2-digit",
                    },
                  )}
                  )
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Hall:
                  </Text>{" "}
                  {data.hallName}, {data.buildingName}
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    No. of attendees:
                  </Text>{" "}
                  {data.noOfAttendees}
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Remarks:
                  </Text>{" "}
                  {data.remarks}
                </Text>
                <Text fontSize="md">
                  <Text as="span" fontWeight="bold">
                    Contact Person Details:
                  </Text>{" "}
                  {data.contactName}, {data.contactDesignation},{" "}
                  {data.contactMobileNo}
                </Text>
              </SimpleGrid>
              <SimpleGrid
                columns={{ base: 1 }}
                templateColumns={{ base: "1fr", md: "1fr 3fr" }}
                gap={4}
                mb={5}
              >
                <SelectField
                  name="action"
                  label="Action"
                  placeholder="Select Action"
                >
                  <option value="A">Allot</option>
                  <option value="R">Reject</option>
                  <option value="S">Reschedule</option>
                </SelectField>
                {(formik.values.action === "R" ||
                  formik.values.action === "S") && (
                  <InputField
                    name="remark"
                    label="Remark"
                    placeholder="Enter Remarks"
                  />
                )}
              </SimpleGrid>

              <HStack justifyContent="end">
                <Button
                  type="submit"
                  variant="brand"
                  isLoading={takeAction.isPending}
                  loadingText="Saving"
                  mb={4}
                >
                  Submit
                </Button>
              </HStack>
            </Stack>
          </>
        );
      }}
    </Formik>
  );
};

export default TakeActionForm;
