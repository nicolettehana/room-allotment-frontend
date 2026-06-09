import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../components/core/formik/InputField";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateOffice } from "../../../hooks/officeQueries";
import { useFetchOffices } from "../../../hooks/officeQueries";
import SelectField from "../../../components/core/formik/SelectField";
import { useUpdateUser } from "../../../hooks/userQueries";

const UpdateUserModal = ({ isOpen, onClose, row }) => {
  if (row?.email) {
    row.email = row.email.replace(/\[at\]/g, "@").replace(/\[dot\]/g, ".");
  }
  // Hooks
  const toast = useToast();

  const queryClient = useQueryClient();

  // Queires
  const officesQuery = useFetchOffices();
  const updateUser = useUpdateUser(
    (response) => {
      queryClient.invalidateQueries({ queryKey: ["fetch-all-users"] });
      //navigate("/sad/year-range");
      onClose();
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.detail || "Updated",
      });

      return response;
    },
    (error) => {
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description: error.response.data.detail || "Unable to update.",
      });
      return error;
    },
  );

  // Formik initial values
  const initialValues = {
    name: row?.name,
    username: row?.username,
    mobileNo: row?.mobileNo,
    designation: row?.designation,
    department: row?.department,
    role: row?.role,
    email: row?.email,
    officeCode: row?.officeCode,
    roleName:
      row?.role === "SAD"
        ? "Security Personnel"
        : row?.role === "ASAD"
          ? "Admin"
          : "Superadmin",
  };

  // Validation schema
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    mobileNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
    designation: yup.string().required("Designation is required"),
    department: yup.string().required("Department is required"),
    role: yup.string().required("Role is required"),
    email: yup.string().email("Enter a valid email address"),
    officeCode: yup
      .number()
      .nullable()
      .when("role", {
        is: "SAD",
        then: (schema) => schema.required("Please select office"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  // Submit handler
  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;
    const formData = { ...values };

    if (formData.mobileNo && /^[0-9]{10}$/.test(formData.mobileNo)) {
      formData.mobileNo = encryptRSA(formData.mobileNo, publicKey);
    } else {
      formData.mobileNo = null;
    }

    updateUser.mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold">
          Update User
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <ModalBody as={Stack} spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <InputField
                    name="roleName"
                    label="Role"
                    placeholder="Enter role"
                    isReadOnly
                    isDisabled
                  />
                  {/* <InputField
                    name="officeCode"
                    label="Office"
                    placeholder="Select office"
                    isReadOnly
                    isDisabled
                  /> */}
                  {row?.role === "SAD" && (
                    <SelectField
                      name="officeCode"
                      label="Office"
                      placeholder="Select office"
                      isDisabled={true}
                    >
                      {officesQuery?.data?.data?.map((row) => (
                        <option key={row?.officeCode} value={row?.officeCode}>
                          {row?.officeName}
                        </option>
                      ))}
                    </SelectField>
                  )}
                  <InputField
                    name="name"
                    label="Name"
                    placeholder="Enter name"
                  />
                  <InputField
                    name="username"
                    label="Username"
                    placeholder="Enter username"
                    isReadOnly
                    isDisabled
                  />
                  <InputField
                    name="designation"
                    label="Designation"
                    placeholder="Enter designation"
                  />
                  <InputField
                    name="department"
                    label="Department"
                    placeholder="Enter department"
                  />
                  <InputField
                    name="mobileNo"
                    label="Mobile No."
                    placeholder="Enter mobile no."
                    isRequired={false}
                  />
                  <InputField
                    name="email"
                    label="E-mail"
                    placeholder="Enter e-mail"
                    isRequired={false}
                  />
                </SimpleGrid>
              </ModalBody>

              <ModalFooter as={HStack}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  w="full"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="brand"
                  w="full"
                  isLoading={updateUser.isPending}
                >
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
