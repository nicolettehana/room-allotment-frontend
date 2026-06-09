import {
  Button,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "../../components/core/formik/InputField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  useFetchRefreshCaptcha,
  useGetPublicKey,
  useSendForgotPasswordOTP,
} from "../../hooks/authQueries";
import CaptchaImage from "../../components/common/CaptchaImage";
import { useEffect, useRef } from "react";
import { encryptRSA } from "../../components/utils/security";

const ForgotPasswordForm = () => {
  // Hooks
  const formikRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  // Queries
  const publicKeyQuery = useGetPublicKey();
  const captchaQuery = useFetchRefreshCaptcha();
  const fpOtpQuery = useSendForgotPasswordOTP(
    (response) => {
      navigate("/auth/forgot-password/verify-otp", {
        state: {
          formData: formikRef.current.values,
          otpToken: response.data.otpToken,
        },
      });
      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "success",
        title: "Success",
        description: response.data.message || "OTP Sent",
      });
      return response;
    },
    (error) => {
      // Refresh Captcha
      captchaQuery.refetch();
      formikRef.current.setFieldValue("captcha", "");

      toast({
        isClosable: true,
        duration: 3000,
        position: "top-right",
        status: "error",
        title: "Error",
        description: error.response.data.detail,
      });

      return error;
    }
  );

  // Formik
  const initialValues = {
    mobileno: "",
    // UNCOMMENT:
    captcha: "",
    captchaToken: "",
  };

  const validationSchema = yup.object({
    mobileno: yup
      .string()
      .matches(/^\d{10}$/, "Please enter a valid mobile number")
      .required("Mobile number is required"),
    // UNCOMMENT:
    captcha: yup.string().required("Captcha is required"),
    captchaToken: yup.string().required("Captcha token is required"),
  });

  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;

    fpOtpQuery.mutate({
      captcha: values.captcha,
      uuid: values.captchaToken,
      isSignUp: 0,
      mobileno: encryptRSA(values.mobileno, publicKey),
    });
  };

  // Side-effects
  useEffect(() => {
    if (captchaQuery.isSuccess) {
      formikRef.current.setFieldValue(
        "captchaToken",
        captchaQuery?.data?.data?.captchaToken
      );
    }
  }, [captchaQuery?.data?.data?.captchaToken]);

  return (
    <>
      {/* Form */}
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Stack as={Form} spacing={4}>
            <Stack>
              <Heading size="md">Forgot Password</Heading>
            </Stack>

            <InputField
              name="mobileno"
              label="Mobile number"
              placeholder="Ex. 9876543210"
            />

            {/* UNCOMMENT:  */}
            <CaptchaImage query={captchaQuery} />

            <InputField
              name="captcha"
              label="Captcha"
              placeholder="Enter the captcha above"
            />

            <Button
              type="submit"
              variant="brand"
              isLoading={fpOtpQuery.isPending}
              loadingText="Sending OTP"
            >
              Get OTP
            </Button>

            <Divider />

            <Text>
              Back to{" "}
              <Link as={RouterLink} to="/">
                Sign in
              </Link>{" "}
              page.
            </Text>
          </Stack>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
