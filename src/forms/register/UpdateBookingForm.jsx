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
const UpdateBookingForm = ({ bookingQuery }) => {
  const [selectedOffice, setSelectedOffice] = useState(
    bookingQuery?.hallOfficeCode,
  );

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
      console.log("SUCCESS", response);
      //queryClient.invalidateQueries({ queryKey: ["fetch-bookings"] });
      navigate("/dept/booking-history");
      //onClose();
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response?.data?.detail || "Updated",
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
          error?.response?.data?.detail || "Unable to update booking.",
      });
      return error;
    },
  );

  const initialValues = {
    bookingId: bookingQuery?.bookingId,
    department: bookingQuery?.department || "",
    contactName: bookingQuery?.contactName || "",
    noOfAttendees: bookingQuery?.noOfAttendees || "",
    purpose: bookingQuery?.purpose || "",
    remarks: bookingQuery?.remarks || "",
    contactMobileNo: bookingQuery?.contactMobileNo || "",
    meetingDate: bookingQuery?.meetingDate || "",
    startTime: bookingQuery?.startTime?.substring(0, 5) || "",
    endTime: bookingQuery?.endTime?.substring(0, 5) || "",
    hallOfficeCode: bookingQuery?.hallOfficeCode || "",
    hallId: bookingQuery?.hallId || "",
    contactDesignation: bookingQuery?.contactDesignation || "",
  };

  const validationSchema = yup.object({
    bookingId: yup.string().required("Booking ID is required"),
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
    console.log(formData);
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
          <Stack as={Form} spacing={8}>
            <Heading size="sm">{profileQuery?.data?.data?.office}</Heading>

            {/* Top Form Fields */}
            {/* <Text fontWeight="bold" fontSize="lg">Applicant Details:</Text> */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <InputField
                name="department"
                label="Department/Office"
                placeholder="Enter Department"
                isReadOnly={true}
              />

              <InputField
                name="purpose"
                label="Purpose of Meeting"
                placeholder="Enter Meeting Purpose"
              />

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

              <InputField name="meetingDate" label="Meeting Date" type="date" />

              <SimpleGrid
                templateColumns={{ base: "1fr", md: "2fr 2fr" }}
                gap={4}
              >
                {/* <SelectFieldSearchable
                  name="startTime"
                  label="Start Time"
                  options={timeOptions}
                /> */}

                <SelectFieldSearchable
                  name="startTime"
                  label="Start Time of meeting"
                  placeholder="Select Start Time"
                  options={timeOptions}
                />

                {/* <InputField
                  name="startTime"
                  label="Start Time of meeting"
                  type="time"
                  step={900}
                  fontSize="sm"
                /> */}
                {/* <InputField
                  name="endTime"
                  label="End Time of meeting"
                  type="time"
                  fontSize="sm"
                /> */}
                <SelectFieldSearchable
                  name="endTime"
                  label="End Time of meeting"
                  placeholder="Select End Time"
                  options={timeOptions}
                />
              </SimpleGrid>

              <InputField
                name="noOfAttendees"
                label="No. of attendees (approx.)"
                placeholder="Enter no. of attendees"
              />

              <InputField
                name="remarks"
                label="Additional Remarks (Optional)"
                placeholder="Enter remarks (if any)"
                isRequired={false}
              />

              <Box gridColumn={{ md: "span 2" }} mt={8}></Box>
              <Heading size="sm" gridColumn={{ md: "span 2" }}>
                Contact Person Details
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

export default UpdateBookingForm;
