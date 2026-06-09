import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as yup from "yup";

import InputField from "../../components/core/formik/InputField";
import CaptchaImage from "../../components/common/CaptchaImage";

import { useNavigate } from "react-router-dom";
import {
  useFetchRefreshCaptcha,
  useGetOTPSignIn,
  useVerifyOTPSignIn,
  useGetPublicKey,
} from "../../hooks/authQueries";

import { useAuthContext } from "../../components/auth/authContext";
import { encryptRSA } from "../../components/utils/security";

const VisitorSignInForm = () => {
  const formikRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [otpSent, setOtpSent] = useState(false);

  // Queries
  const captchaQuery = useFetchRefreshCaptcha();
  const encryptKeyQuery = useGetPublicKey();

  // Send OTP API
  const sendOtpQuery = useGetOTPSignIn(
    () => {
      setOtpSent(true);

      toast({
        title: "OTP sent successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    },
    (error) => {
      toast({
        title: "Failed to send OTP",
        description: error?.response?.data?.detail || "Something went wrong",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    },
  );

  // Verify OTP/Login API
  const verifyOtpQuery = useVerifyOTPSignIn(
    (response) => {
      const { access_token, refresh_token, role } = response.data;

      login(access_token, refresh_token, { role });

      toast({
        title: "Login successful",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      switch (role) {
        case "ASAD":
          navigate("/asad/dashboard", { replace: true });
          break;

        case "ADMIN":
          navigate("/admin/logs", { replace: true });
          break;

        case "SAD":
          navigate("/sad/register", { replace: true });
          break;

        default:
          navigate("/", { replace: true });
      }
    },
    (error) => {
      toast({
        title: "Login failed",
        description: error?.response?.data?.detail || "Invalid OTP",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    },
  );

  const initialValues = {
    mobileno: "",
    captcha: "",
    uuid: "",
    otp: "",
  };

  const validationSchema = yup.object({
    mobileno: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Enter valid mobile number")
      .required("Mobile number is required"),

    captcha: yup.string().required("Captcha is required"),

    uuid: yup.string().required("Captcha token is required"),

    otp: otpSent
      ? yup
          .string()
          .length(6, "OTP must be 6 digits")
          .required("OTP is required")
      : yup.string(),
  });

  // Send OTP
  const handleSendOtp = (values) => {
    sendOtpQuery.mutate({
      mobileno: encryptRSA(
        values.mobileno,
        encryptKeyQuery?.data?.data?.publicKey,
      ),
      captcha: values.captcha,
      uuid: values.uuid,
    });
  };

  // Verify OTP + Login
  const onSubmit = (values) => {
    console.log(values.otp);
    verifyOtpQuery.mutate({
      mobileno: encryptRSA(
        values.mobileno,
        encryptKeyQuery?.data?.data?.publicKey,
      ),
      otp: values.otp,
    });
  };

  useEffect(() => {
    if (captchaQuery.isSuccess && captchaQuery.data?.data?.captchaToken) {
      formikRef.current?.setFieldValue(
        "uuid",
        captchaQuery.data.data.captchaToken,
      );
    }
  }, [captchaQuery.isSuccess, captchaQuery.data?.data?.captchaToken]);

  useEffect(() => {
    captchaQuery.refetch();
  }, []);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Stack as={Form} spacing={5}>
          <Heading size="md">Visitor Login</Heading>

          {/* mobileno Number */}
          <InputField
            name="mobileno"
            label="Mobile Number"
            placeholder="Enter mobile number"
            autoComplete="off"
          />

          {/* Captcha */}
          <CaptchaImage query={captchaQuery} />

          <InputField
            name="captcha"
            label="Captcha"
            placeholder="Enter captcha"
          />

          {/* Get OTP Button */}
          {!otpSent && (
            <Button
              type="button"
              colorScheme="brand"
              variant="brand"
              onClick={() => handleSendOtp(formik.values)}
              isLoading={sendOtpQuery.isPending}
              isDisabled={
                !formik.values.mobileno ||
                !formik.values.captcha ||
                !formik.values.uuid
              }
            >
              Get OTP
            </Button>
          )}

          {/* OTP Field */}
          {otpSent && (
            <>
              <InputField name="otp" label="OTP" placeholder="Enter OTP" />

              <Button
                type="submit"
                colorScheme="brand"
                variant="brand"
                isLoading={verifyOtpQuery.isPending}
                loadingText="Signing in..."
                width="full"
              >
                Login
              </Button>
            </>
          )}

          <Divider />
        </Stack>
      )}
    </Formik>
  );
};

export default VisitorSignInForm;
