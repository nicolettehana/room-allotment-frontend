import { Form, Formik, FieldArray, Field } from "formik";
import { useEffect, useState, useRef } from "react";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Spinner,
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
  FormControl,
  Input,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Hide,
} from "@chakra-ui/react";
import InputField from "../../components/core/formik/InputField";
import SelectField from "../../components/core/formik/SelectField";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SelectFieldSearchable from "../../components/core/formik/SelectFieldSearchable";
import dayjs from "dayjs";
import { MdHorizontalRule } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useFetchVisitorInformation } from "../../hooks/visitorQueries";
import { useFetchUsersProfile } from "../../hooks/userQueries";
import { useFetchOffices } from "../../hooks/officeQueries";
import { useFetchHalls } from "../../hooks/roomQueries";
import { useCreateBooking } from "../../hooks/hallBookingQueries";
import { useGetPublicKey } from "../../hooks/authQueries";
import { encryptRSA } from "../../components/utils/security";
import { IoInformationCircle } from "react-icons/io5";

const timeOptions = [];

for (let h = 8; h <= 22; h++) {
  for (let m = 0; m < 60; m += 15) {
    const hour12 = h % 12 || 12;
    const period = h >= 12 ? "PM" : "AM";

    timeOptions.push({
      value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`, // keep 24h value for backend
      label: `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`, // display AM/PM
    });
  }
}

const BookingForm = () => {
  const [selectedOffice, setSelectedOffice] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const iframeRef = useRef(null);

  const profileQuery = useFetchUsersProfile();
  const officesQuery = useFetchOffices();
  const hallsQuery = useFetchHalls(selectedOffice);
  const publicKeyQuery = useGetPublicKey();

  const createBooking = useCreateBooking(
    (response) => {
      //console.log("SUCCESS", response);
      //queryClient.invalidateQueries({ queryKey: ["fetch-bookings"] });
      navigate("/dept/booking-history");
      //onClose();
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response?.data?.detail || "Request Submitted",
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
          error?.response?.data?.detail || "Unable to create booking.",
      });
      return error;
    },
  );

  const initialValues = {
    department: profileQuery?.data?.department || "",
    contactName: profileQuery?.data?.name || "",
    noOfAttendees: "",
    purpose: "",
    remarks: "",
    contactMobileNo: "",
    meetingDate: "",
    startTime: dayjs().format("HH:mm"),
    endTime: dayjs().add(1, "hour").format("HH:mm"),
    hallOfficeCode: "",
    hallId: "",
    contactDesignation: profileQuery?.data?.designation || "",
    requireNet: "",
    vc: "",
    refreshments: "",
  };

  const validationSchema = yup.object({
    requireNet: yup.number().required("Select requirement"),
    vc: yup.number().required("Select VC requirement"),
    refreshments: yup.number().required("Select Refreshment requirement"),
    department: yup.string().required("Department is required"),
    contactName: yup.string().required("Name is required"),
    noOfAttendees: yup
      .number()
      .min(1, "At least 1 visitor is required")
      .max(70, "Maximum 50 visitors allowed")
      .typeError("Please enter a valid number")
      .required("No. of attendees is required"),
    purpose: yup.string().required("Purpose is required"),
    remarks: yup.string(),
    contactMobileNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number (10 digits)")
      .required("Contact Information required"),
    meetingDate: yup
      .date()
      .typeError("Invalid meeting date")
      .required("Meeting date is required")
      .min(
        dayjs().startOf("day").toDate(),
        "Meeting date cannot be in the past",
      ),

    startTime: yup
      .string()
      .required("Start time is required")
      .test(
        "start-time-future",
        "Start time must be later than the current time",
        function (value) {
          const { meetingDate } = this.parent;

          if (!meetingDate || !value) return true;

          const selectedDate = dayjs(meetingDate).format("YYYY-MM-DD");
          const today = dayjs().format("YYYY-MM-DD");

          // Only validate against current time when meeting is today
          if (selectedDate === today) {
            const selectedDateTime = dayjs(
              `${selectedDate} ${value}`,
              "YYYY-MM-DD HH:mm",
            );

            return selectedDateTime.isAfter(dayjs());
          }

          return true;
        },
      ),

    endTime: yup
      .string()
      .required("End time is required")
      .test(
        "end-after-start",
        "End time must be after start time",
        function (value) {
          const { startTime } = this.parent;

          if (!startTime || !value) return true;

          return value > startTime;
        },
      ),
    contactDesignation: yup.string().required("Designation is required"),
    hallOfficeCode: yup.number(),
    hallId: yup.number(),
  });

  // Submit handler
  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;
    const formData = { ...values };

    if (
      formData.contactMobileNo &&
      /^[0-9]{10}$/.test(formData.contactMobileNo)
    ) {
      formData.contactMobileNo = encryptRSA(
        formData.contactMobileNo,
        publicKey,
      );
    } else {
      formData.contactMobileNo = null;
    }
    //formData.password = encryptRSA(formData.password, publicKey);

    createBooking.mutate(formData);
  };

  return (
    <Formik
      //enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Stack as={Form} spacing={0}>
            {/* <Heading size="sm">{profileQuery?.data?.data?.office}</Heading> */}

            {/* Top Form Fields */}
            {/* <Text fontWeight="bold" fontSize="lg">Applicant Details:</Text> */}
            <Box
              position="sticky"
              top="0"
              zIndex="1000"
              bg="brown.300"
              borderBottom="1px solid"
              borderColor="blue.200"
              p={3}
              mb={5}
              w="fit-content"
              mx="auto"
            >
              <HStack>
                <IoInformationCircle />
                <Text fontSize="sm" fontWeight="medium" textAlign="center">
                  NIC VC can only be conducted in Conference Room II,
                  Secretariat.
                </Text>
              </HStack>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Hide>
                <InputField
                  name="department"
                  label="Department/Office"
                  placeholder="Enter Department"
                  isReadOnly={true}
                />
              </Hide>

              <Box
                gridColumn={{ md: "span 2" }}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg="brown.50"
                shadow="md"
              >
                <Box
                  px={6}
                  p={3}
                  bg="brown.700"
                  color="white"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  display="inline-block"
                  borderRadius="lg"
                  mb={3}
                >
                  <Heading size="sm">Meeting Details</Heading>
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <InputField
                    name="purpose"
                    label="Purpose of Meeting"
                    placeholder="Enter Meeting Purpose"
                  />

                  <SimpleGrid
                    templateColumns={{ base: "1fr", md: "2fr 2fr" }}
                    gap={4}
                  >
                    <SelectFieldSearchable
                      name="hallOfficeCode"
                      label="Building"
                      placeholder="Select Building"
                      onChange={(option) => {
                        const officeCode = option?.value;

                        setSelectedOffice(officeCode);
                        formik.setFieldValue("hallOfficeCode", officeCode);
                        formik.setFieldValue("hallId", "");
                      }}
                      options={
                        officesQuery?.data?.data?.map((row) => ({
                          value: row.officeCode,
                          label: row.officeName,
                        })) || []
                      }
                    />
                    <SelectFieldSearchable
                      name="hallId"
                      label="Hall"
                      placeholder="Select Hall"
                      options={
                        hallsQuery?.data?.data?.map((hall) => ({
                          value: hall.id,
                          label: hall.name,
                        })) || []
                      }
                    />
                  </SimpleGrid>

                  <SimpleGrid
                    templateColumns={{ base: "1fr", md: "2fr 2fr 2fr" }}
                    gap={4}
                  >
                    <InputField
                      name="meetingDate"
                      label="Meeting Date"
                      type="date"
                    />
                    <SelectFieldSearchable
                      name="startTime"
                      label="Start Time of meeting"
                      placeholder="Start Time"
                      options={timeOptions}
                    />
                    <SelectFieldSearchable
                      name="endTime"
                      label="End Time of meeting"
                      placeholder="End Time"
                      options={timeOptions}
                    />
                  </SimpleGrid>
                  <SimpleGrid
                    templateColumns={{ base: "1fr", md: "2fr 4fr" }}
                    gap={4}
                  >
                    <InputField
                      name="noOfAttendees"
                      label="No. of attendees"
                      placeholder="Enter no. of attendees"
                    />
                    <InputField
                      name="remarks"
                      label="Additional Remarks (Optional)"
                      placeholder="Enter remarks (if any)"
                      isRequired={false}
                    />
                  </SimpleGrid>
                </SimpleGrid>
              </Box>

              <Box
                gridColumn={{ md: "span 2" }}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                mt={8}
                bg="brown.50"
                shadow="md"
              >
                <Box
                  px={6}
                  p={3}
                  bg="brown.700"
                  color="white"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  display="inline-block"
                  borderRadius="lg"
                  mb={3}
                >
                  <Heading size="sm">Additional Requirements</Heading>
                </Box>
                <SimpleGrid
                  templateColumns={{ base: "1fr", md: "2fr 2fr 2fr" }}
                  gap={4}
                >
                  <SelectFieldSearchable
                    name="requireNet"
                    label="Require Internet/Projector"
                    placeholder="Select Option"
                    onChange={(option) => {
                      formik.setFieldValue("requireNet", option?.value);
                    }}
                    options={[
                      {
                        value: 1,
                        label: "Yes",
                      },
                      {
                        value: 0,
                        label: "No",
                      },
                    ]}
                  />

                  <SelectFieldSearchable
                    name="vc"
                    label="Video Conference"
                    placeholder="Select Option"
                    onChange={(option) => {
                      formik.setFieldValue("vc", option?.value);
                    }}
                    options={[
                      {
                        value: 1,
                        label: "Yes",
                      },
                      {
                        value: 0,
                        label: "No",
                      },
                    ]}
                  />
                  <SelectFieldSearchable
                    name="refreshments"
                    label="Refreshments"
                    placeholder="Select Option"
                    onChange={(option) => {
                      formik.setFieldValue("refreshmentst", option?.value);
                    }}
                    options={[
                      {
                        value: 1,
                        label: "Yes",
                      },
                      {
                        value: 0,
                        label: "No",
                      },
                    ]}
                  />
                </SimpleGrid>
              </Box>

              <Box
                gridColumn={{ md: "span 2" }}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                mt={8}
                bg="brown.50"
                shadow="md"
              >
                <Box
                  px={6}
                  py={3}
                  bg="brown.700"
                  color="white"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  display="inline-block"
                  borderRadius="lg"
                  mb={3}
                >
                  <Heading size="sm">Contact Person Details</Heading>
                </Box>

                <Heading size="sm" py={4}>
                  Department: {profileQuery?.data?.department || ""}
                </Heading>

                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap={4}
                  gridColumn={{ md: "span 2" }}
                >
                  <InputField
                    name="contactName"
                    label="Name"
                    placeholder="Enter Name"
                  />
                  <InputField
                    name="contactDesignation"
                    label="Designation"
                    placeholder="Enter Designation"
                  />
                  <InputField
                    name="contactMobileNo"
                    label="Mobile No."
                    placeholder="Enter Mobile no."
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, ""); // only digits
                      if (val.length > 10) val = val.slice(0, 10);
                      formik.setFieldValue("contactMobileNo", val);
                    }}
                  />
                </SimpleGrid>
              </Box>
            </SimpleGrid>

            {/* Submit Buttons */}
            <HStack justifyContent="flex-end" mt={6}>
              <Button
                type="submit"
                variant="brand"
                size="lg"
                isLoading={createBooking.isPending}
                loadingText="Generating Pass..."
                isDisabled={createBooking.isPending}
                rightIcon={<IoMdSend />}
              >
                Submit
              </Button>
            </HStack>
          </Stack>
        );
      }}
    </Formik>
  );
};

export default BookingForm;
