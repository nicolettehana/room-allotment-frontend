import { Form, Formik } from "formik";
import * as yup from "yup";
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
import { useGetPublicKey } from "../../hooks/authQueries";
import { encryptRSA } from "../../components/utils/security";
import { useUpdateMobileNo } from "../../hooks/userQueries";
import InputField from "../../components/core/formik/InputField";

const ChangeMobileForm = ({
  isOpen,
  onClose,
  verifyOtpOnOpen,
  setOtpToken,
  setMobileno,
}) => {
  // Hooks
  const toast = useToast();

  // Queries
  const publicKeyQuery = useGetPublicKey();
  const mobileUpdateQuery = useUpdateMobileNo(
    (response) => {
      setOtpToken(response.data.otpToken);
      onClose();
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.message || "OTP sent successfully",
      });
      verifyOtpOnOpen();
      return response;
    },
    (error) => {
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description:
          error.response.data.detail ||
          "Oops! Something went wrong. Couldn't update mobile number.",
      });
      return error;
    }
  );

  // Formik
  const initialValues = {
    mobileno: "",
  };

  const validationSchema = yup.object({
    mobileno: yup
      .string()
      .matches(/^\d{10}$/, "Please enter a valid mobile number")
      .required("Mobile number is required"),
  });

  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;
    const formData = { ...values };

    formData.mobileno = encryptRSA(values.mobileno, publicKey);
    mobileUpdateQuery.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontSize="lg" fontWeight="bold">
            Change Mobile Number
          </ModalHeader>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Stack as={Form} spacing={4}>
                  <ModalBody>
                    <InputField
                      name="mobileno"
                      label="Mobile Number"
                      placeholder="Ex. 9876543210"
                      onChange={(e) => {
                        const mobileno = e.target.value;
                        formik.setFieldValue("mobileno", mobileno);
                        setMobileno(mobileno);
                      }}
                    />
                  </ModalBody>

                  <ModalFooter as={HStack}>
                    <Button variant="outline" onClick={onClose} w="full">
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="brand"
                      isLoading={mobileUpdateQuery.isPending}
                      loadingText="Sending OTP"
                      w="full"
                    >
                      Get OTP
                    </Button>
                  </ModalFooter>
                </Stack>
              );
            }}
          </Formik>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ChangeMobileForm;
