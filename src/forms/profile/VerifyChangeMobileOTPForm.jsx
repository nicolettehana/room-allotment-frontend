import { useRef } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useVerifyChangeMobileOTP } from "../../hooks/userQueries";
import InputField from "../../components/core/formik/InputField";
import { useGetPublicKey } from "../../hooks/authQueries";
import { encryptRSA } from "../../components/utils/security";
import { useNavigate } from "react-router-dom";

const VerifyChangeMobileOTPForm = ({ isOpen, onClose, otpToken, mobileno }) => {
  // Hooks
  const toast = useToast();
  const formikRef = useRef();
  const navigate = useNavigate();

  // Queries
  const publicKeyQuery = useGetPublicKey();
  const verifyOTPQuery = useVerifyChangeMobileOTP(
    (response) => {
      navigate("/");
      onClose();
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.detail || "Mobile number updated",
      });
      return response;
    },
    (error) => {
      formikRef.current.resetForm();
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
    otp: "",
    otpToken,
    mobileNo: mobileno,
  };

  const validationSchema = yup.object({
    otp: yup
      .number()
      .typeError("OTP must be a number")
      .required("Mobile number is required"),
  });

  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;
    const formData = { ...values };

    formData.mobileNo = encryptRSA(values.mobileNo, publicKey);
    verifyOTPQuery.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Stack>
              <Heading size="md" fontWeight="bold">
                Verify OTP
              </Heading>
              <Text color="body" fontSize="md">
                After verifying you will be logged out
              </Text>
            </Stack>
          </ModalHeader>
          <Formik
            innerRef={formikRef}
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
                      name="otp"
                      label="Enter the otp"
                      placeholder="Enter the otp sent to your mobile no."
                    />
                  </ModalBody>

                  <ModalFooter as={HStack}>
                    <Button variant="outline" onClick={onClose} w="full">
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="brand"
                      isLoading={verifyOTPQuery.isPending}
                      loadingText="Verifying"
                      w="full"
                    >
                      Verify
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

export default VerifyChangeMobileOTPForm;
