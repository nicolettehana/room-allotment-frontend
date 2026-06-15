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
import SelectFieldSearchable from "../../../components/core/formik/SelectFieldSearchable";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateOffice } from "../../../hooks/officeQueries";
import { useCreateHall } from "../../../hooks/roomQueries";

const CreateHallModal = ({ isOpen, onClose, officeQuery }) => {
  // Hooks
  const toast = useToast();

  const queryClient = useQueryClient();

  // Queires
  const createHall = useCreateHall(
    (response) => {
      queryClient.invalidateQueries({ queryKey: ["fetch-halls-office-wise"] });
      //navigate("/sad/year-range");
      onClose();
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.detail || "Hall added",
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
        description: error.response.data.detail || "Unable to add Hall.",
      });
      return error;
    },
  );

  // Formik initial values
  const initialValues = {
    hallName: "",
    officeCode: "",
  };

  // Validation schema
  const validationSchema = yup.object({
    hallName: yup.string().required("Hall Name is required"),
    officeCode: yup.number().required("Office is required"),
  });

  // Submit handler
  const onSubmit = (values) => {
    //console.log(values);
    createHall.mutate(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader fontSize="lg" fontWeight="bold">
          Add Hall
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <ModalBody as={Stack} spacing={4}>
                <SelectFieldSearchable
                  name="officeCode"
                  label="Office"
                  placeholder="Select Office"
                  options={officeQuery?.data?.data?.map((office) => ({
                    value: office.officeCode,
                    label: office.officeName,
                  }))}
                />
                <InputField
                  name="hallName"
                  label="Hall Name"
                  placeholder="Enter hall name"
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
                  //isLoading={createOffice.isPending}
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

export default CreateHallModal;
