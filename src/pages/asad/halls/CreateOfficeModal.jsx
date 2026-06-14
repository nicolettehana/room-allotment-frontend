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
import { useCreateOffice } from "../../../hooks/officeQueries";

const CreateOfficeModal = ({ isOpen, onClose }) => {
  // Hooks
  const toast = useToast();

  const queryClient = useQueryClient();

  // Queires
  const createOffice = useCreateOffice(
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
        description: response.data.detail || "Office added",
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
        description: error.response.data.detail || "Unable to add Office.",
      });
      return error;
    }
  );

  // Formik initial values
  const initialValues = {
    officeName: "",
    
  };

  // Validation schema
  const validationSchema = yup.object({
    officeName: yup.string().required("Office Name is required"),
  });

  // Submit handler
  const onSubmit = (values) => {
    
    createOffice.mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold">
          Add Office
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <ModalBody as={Stack} spacing={4}>
                <InputField
                  name="officeName"
                  label="Office"
                  placeholder="Enter office"
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
                  isLoading={createOffice.isPending}
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

export default CreateOfficeModal;
