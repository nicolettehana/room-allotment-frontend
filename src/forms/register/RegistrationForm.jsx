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

import { useCreateRegistration } from "../../hooks/registrationQueries";
import SelectField from "../../components/core/formik/SelectField";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SelectFieldSearchable from "../../components/core/formik/SelectFieldSearchable";
import dayjs from "dayjs";
import { MdHorizontalRule } from "react-icons/md";
import PhotoInput from "./PhotoInput";
import { IoMdSend } from "react-icons/io";
import { useFetchVisitorInformation } from "../../hooks/visitorQueries";
import { useFetchUsersProfile } from "../../hooks/userQueries";

const RegistrationForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `visitor-pass-${dayjs().format("YYYYMMDD-HHmm")}.pdf`;
    link.click();
  };

  const handlePrint = () => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow?.focus();
    iframeRef.current.contentWindow?.print();
  };

  // const handlePrint = () => {
  //   if (!pdfUrl) return;
  //   const printWindow = window.open(pdfUrl, "_blank");
  //   if (printWindow) {
  //     printWindow.onload = () => {
  //       printWindow.focus();
  //       printWindow.print();
  //     };
  //   }
  // };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (isOpen && pdfUrl) {
      handlePrint();
    }
  }, [isOpen, pdfUrl]);

  const titles = ["Shri", "Smti", "Kumari", "Mr.", "Mrs.", "Ms.", "Dr."];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ].sort();

  const moodOptions = [
    "To meet Minister",
    "To meet Chief Secretary",
    "To attend meeting/function",
    "To meet officers",
    "To visit Department",
  ];

  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const iframeRef = useRef(null);

  const profileQuery = useFetchUsersProfile();

  const visitorInfoQuery = useFetchVisitorInformation(mobileNo);

  const createRegistration = useCreateRegistration(
    (response) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      //navigate("/sad/purchase");
      //navigate(-1);
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.detail || "Registered",
      });
    },
    (error) => {
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description: error.response.data.detail || "Unable to register.",
      });
    },
  );

  const initialValues = {
    name: "",
    noOfVisitors: "",
    state: "Meghalaya",
    address: "",
    purpose: "",
    purposeDetails: "",
    mobileNo: "",
    email: "",
    dateTime: dayjs().format("YYYY-MM-DDTHH:mm"),
    photo: null,
    title: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    noOfVisitors: yup
      .number()
      .min(1, "At least 1 visitor is required")
      .max(50, "Maximum 50 visitors allowed")
      .typeError("Please enter a valid number")
      .required("No. of visitors is required"),
    state: yup.string().required("State is required"),
    address: yup.string().required("Address is required"),
    purpose: yup.string().required("Purpose is required"),
    purposeDetails: yup.string().required("Purpose Details/Name is required"),
    title: yup.string(),
    mobileNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number (10 digits)"),
    email: yup.string().email("Invalid email address"),
    dateTime: yup
      .date()
      .typeError("Invalid date & time")
      .required("Date & time is required"),
    photo: yup
      .mixed()
      .required("Photo is required")
      .test(
        "fileType",
        "Only JPG or PNG allowed",
        (v) => v && ["image/jpeg", "image/png"].includes(v.type),
      ),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    const visitor = {
      name: values.name,
      noOfVisitors: values.noOfVisitors,
      state: values.state,
      address: values.address,
      purpose: values.purpose,
      purposeDetails: values.purposeDetails,
      mobileNo: values.mobileNo,
      email: values.email,
      visitDateTime: dayjs(values.dateTime).format("YYYY-MM-DDTHH:mm:ss"),
      title: values.title,
    };

    formData.append(
      "visitor",
      new Blob([JSON.stringify(visitor)], { type: "application/json" }),
    );

    formData.append("photo", values.photo);

    try {
      const blobResponse = await createRegistration.mutateAsync(formData);
      const blob = blobResponse;

      const url = window.URL.createObjectURL(blob);

      setPdfBlob(blob);
      setPdfUrl(url);
      resetForm();
      onOpen();

      toast({
        title: "Visitor Registered",
        description: "Visitor pass generated successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error?.response?.data?.detail || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        useEffect(() => {
          if (visitorInfoQuery?.data?.data) {
            const lastVisit = visitorInfoQuery?.data?.data;

            if (lastVisit.name && !formik.values.name)
              formik.setFieldValue("name", lastVisit.name);
            if (lastVisit.address && !formik.values.address)
              formik.setFieldValue("address", lastVisit.address);
            if (lastVisit.state && !formik.values.state)
              formik.setFieldValue("state", lastVisit.state);
            if (lastVisit.email && !formik.values.email)
              formik.setFieldValue("email", lastVisit.email);
            if (lastVisit.title && !formik.values.title)
              formik.setFieldValue("title", lastVisit.title);
          }
        }, [visitorInfoQuery?.data?.data]);

        return (
          <Stack as={Form} spacing={8}>
            <Heading size="sm">{profileQuery?.data?.data?.office}</Heading>
            <Modal
              isOpen={isOpen}
              onClose={() => {
                onClose();
                if (pdfUrl) {
                  window.URL.revokeObjectURL(pdfUrl);
                  setPdfUrl(null);
                  setPdfBlob(null);
                }
              }}
              size="6xl"
              scrollBehavior="inside"
              closeOnOverlayClick={false}
              isCentered
            >
              <ModalOverlay />
              <ModalContent maxH="90vh">
                <ModalHeader>Visitor Pass</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={0}>
                  {pdfUrl ? (
                    <iframe
                      ref={iframeRef}
                      src={pdfUrl}
                      title="Visitor Pass PDF"
                      width="100%"
                      height="620px"
                      style={{ border: "none", backgroundColor: "#f8f9fa" }}
                      onLoad={() => {
                        if (iframeRef.current) {
                          iframeRef.current.contentWindow?.focus();
                          iframeRef.current.contentWindow?.print();
                        }
                      }}
                    />
                  ) : (
                    // <iframe
                    //   src={pdfUrl}
                    //   title="Visitor Pass PDF"
                    //   width="100%"
                    //   height="620px"
                    //   style={{ border: "none", backgroundColor: "#f8f9fa" }}
                    // />
                    <Flex
                      height="500px"
                      align="center"
                      justify="center"
                      direction="column"
                      gap={4}
                    >
                      <Spinner size="xl" color="blue.500" />
                      <Text color="gray.600">
                        Preparing your visitor pass...
                      </Text>
                    </Flex>
                  )}
                </ModalBody>

                <ModalFooter gap={3}>
                  <Button
                    //leftIcon={<DownloadIcon />}
                    variant="brand"
                    onClick={handleDownload}
                    isDisabled={!pdfUrl}
                  >
                    Download
                  </Button>

                  <Button
                    //leftIcon={<PrinterIcon />}
                    colorScheme="teal"
                    onClick={handlePrint}
                    isDisabled={!pdfUrl}
                    variant="brand"
                  >
                    Print
                  </Button>

                  <Spacer />

                  {/* <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Top Form Fields */}
            {/* <Text fontWeight="bold" fontSize="lg">Applicant Details:</Text> */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <SimpleGrid
                templateColumns={{ base: "1fr", md: "1fr 3fr" }}
                gap={4}
              >
                <SelectFieldSearchable
                  name="title"
                  label="Title"
                  placeholder="Select Title"
                  isRequired={false}
                  options={titles.map((title) => ({
                    value: title,
                    label: title,
                  }))}
                />
                <InputField
                  name="name"
                  label="Applicant's Name"
                  placeholder="Enter name"
                />
              </SimpleGrid>
              <InputField
                name="noOfVisitors"
                label="No. of visitors"
                placeholder="Enter no. of visitors"
              />
              <SelectFieldSearchable
                name="state"
                label="State"
                placeholder="Select State"
                options={indianStates.map((state) => ({
                  value: state,
                  label: state,
                }))}
              />
              <InputField
                name="address"
                label="Address"
                placeholder="Enter address"
              />
              <SelectFieldSearchable
                name="purpose"
                label="Purpose"
                placeholder="Select Purpose"
                options={moodOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
              <InputField
                name="purposeDetails"
                label="Purpose Details/Name"
                placeholder="Enter purpose details/name"
              />
              <InputField
                name="mobileNo"
                label="Mobile No."
                placeholder="Enter Mobile no."
                isRequired={false}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, ""); // only digits
                  if (val.length > 10) val = val.slice(0, 10);
                  formik.setFieldValue("mobileNo", val);
                  setMobileNo(e.target.value);
                }}
              />
              <InputField
                name="email"
                label="E-mail"
                placeholder="Enter E-mail"
                isRequired={false}
              />

              <InputField
                name="dateTime"
                label="Date & Time of visit"
                type="datetime-local"
                fontSize="sm"
              />
              <Field name="photo">
                {({ field, form, meta }) => (
                  <FormControl
                    isRequired
                    isInvalid={meta.touched && meta.error}
                  >
                    <FormLabel fontSize="sm">Photo</FormLabel>
                    <PhotoInput
                      value={field.value}
                      onChange={(file) => form.setFieldValue("photo", file)}
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* <Field name="photo">
                {({ field, form }) => (
                  <PhotoInput
                    value={field.value}
                    onChange={(file) => form.setFieldValue("photo", file)}
                  />
                )}
              </Field> */}

              {/* <Field name="photo">
                {({ form }) => (
                  <PhotoInput
                    onChange={(file) => form.setFieldValue("photo", file)}
                  />
                )}
              </Field> */}

              {/* <Field name="photo">
                {({ form, meta }) => (
                  <FormControl isInvalid={meta.touched && meta.error}>
                    <FormLabel fontSize="sm">Upload Photo</FormLabel>

                    <Input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(event) => {
                        form.setFieldValue(
                          "photo",
                          event.currentTarget.files[0],
                        );
                      }}
                    />

                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field> */}

              {/* <DatePicker
                selected={formik.values.dateTime}
                onChange={(date) => formik.setFieldValue("dateTime", date)}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
              /> */}
            </SimpleGrid>

            {/* Submit Buttons */}
            <HStack justifyContent="flex-end" mt={6}>
              <Button
                type="submit"
                variant="brand"
                size="lg"
                isLoading={createRegistration.isPending}
                loadingText="Generating Pass..."
                isDisabled={createRegistration.isPending}
                rightIcon={<IoMdSend />}
              >
                Generate Visitor Pass
              </Button>
            </HStack>
          </Stack>
        );
      }}
    </Formik>
  );
};

export default RegistrationForm;
