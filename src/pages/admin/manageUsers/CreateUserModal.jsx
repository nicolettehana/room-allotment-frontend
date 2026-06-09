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
import { useCreateOffice } from "../../../hooks/officeQueries";
import { useCreateUser } from "../../../hooks/userQueries";
import SelectField from "../../../components/core/formik/SelectField";
import { useFetchOffices } from "../../../hooks/officeQueries";
import { useGetPublicKey } from "../../../hooks/authQueries";
import { encryptRSA } from "../../../components/utils/security";
import PasswordField from "../../../components/core/formik/PasswordField";

const CreateUserModal = ({ isOpen, onClose }) => {
  // Hooks
  const toast = useToast();

  const queryClient = useQueryClient();

  // Queires
  const publicKeyQuery = useGetPublicKey();
  const officesQuery = useFetchOffices();
  const createUser = useCreateUser(
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
        description: response.data.detail || "User added",
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
        description: error.response.data.detail || "Unable to add  User.",
      });
      return error;
    },
  );

  // Formik initial values
  const initialValues = {
    name: "",
    username: "",
    mobileNo: "",
    designation: "",
    department: "",
    role: "",
    email: "",
    password: "",
    officeCode: null,
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
    password: yup
      .string()
      .matches(/(?=.*[a-z])/, "At least 1 lowercase letter")
      .matches(/(?=.*[A-Z])/, "At least 1 uppercase letter")
      .matches(/(?=.*\d)/, "At least 1 number")
      .matches(/(?=.*[#^@$!%*?&])/, "At least 1 special character")
      .min(8, "Password must be between 8 to 15 characters")
      .max(15, "Password must be between 8 to 15 characters")
      .required("Password is required"),
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
    formData.password = encryptRSA(formData.password, publicKey);

    createUser.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold">
          Create User
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              <ModalBody as={Stack} spacing={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <SelectField
                    name="role"
                    label="Role"
                    placeholder="Select role"
                  >
                    <option value="SAD">Security Personnel</option>
                    <option value="ASAD">Admin</option>
                    <option value="PA">Personal Assistant</option>
                  </SelectField>
                  {values.role === "SAD" && (
                    <SelectField
                      name="officeCode"
                      label="Office"
                      placeholder="Select office"
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
                  />
                  <PasswordField
                    name="password"
                    label="Password"
                    placeholder="Enter password"
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
                  isLoading={createUser.isPending}
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

export default CreateUserModal;
