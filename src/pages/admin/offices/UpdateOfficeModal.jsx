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
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../../../components/core/formik/InputField";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateOffice } from "../../../hooks/officeQueries";

const UpdateOfficeModal = ({ isOpen, onClose, officeCode, officeName}) => {
  // Hooks
  const toast = useToast();

  const queryClient = useQueryClient();

  // Queires
  const updateOffice = useUpdateOffice(
    (response) => {
      queryClient.invalidateQueries({ queryKey: ["fetch-offices"] });
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
    }
  );

  // Formik initial values
  const initialValues = {
    officeName: officeName,
    officeCode: officeCode,
  };

  // Validation schema
  const validationSchema = yup.object({
    officeName: yup.string().required("Office Name is required"),
    officeCode: yup
      .string()
      .required("Office Code is required"),
  });

  // Submit handler
  const onSubmit = (values) => {
    
    updateOffice.mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold">
          Update Office
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <ModalBody as={Stack} spacing={4}>
                {/* <InputField
                  name="officeCode"
                  label="Office Code"
                  placeholder="Enter one character"
                  maxLength={1}
                  isReadOnly
                /> */}
                <InputField
                  name="officeName"
                  label="Office Name"
                  placeholder="Enter office name"
                />

                
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
                  isLoading={updateOffice.isPending}
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

export default UpdateOfficeModal;
