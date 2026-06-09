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
import PasswordField from "../../components/core/formik/PasswordField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  useFetchRefreshCaptcha,
  useGetOTPSignUp,
  useGetPublicKey,
} from "../../hooks/authQueries";
import CaptchaImage from "../../components/common/CaptchaImage";
import { useEffect, useRef } from "react";
import { encryptRSA } from "../../components/utils/security";

const RegisterForm = () => {
  // Hooks
  const formikRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  // Queries
  const publicKeyQuery = useGetPublicKey();
  const captchaQuery = useFetchRefreshCaptcha();
  const otpQuery = useGetOTPSignUp(
    (response) => {
      navigate("/auth/verify-otp", {
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
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    designation: "",
    department: "",
    role: "USER",
    // UNCOMMENT:
    captcha: "",
    captchaToken: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .max(255, "Maximum 255 characters allowed")
      .required("Full name is required"),
    username: yup
      .string()
      .email("Invalid email format")
      .max(255, "Maximum 255 characters allowed")
      .nullable(),
    password: yup
      .string()
      .matches(/(?=.*[a-z])/, "At least 1 lowercase letter")
      .matches(/(?=.*[A-Z])/, "At least 1 uppercase letter")
      .matches(/(?=.*\d)/, "At least 1 number")
      .matches(/(?=.*[#^@$!%*?&])/, "At least 1 special character")
      .min(8, "Password must be between 8 to 255 characters")
      .max(255, "Password must be between 8 to 255 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .matches(/(?=.*[a-z])/, "At least 1 lowercase letter")
      .matches(/(?=.*[A-Z])/, "At least 1 uppercase letter")
      .matches(/(?=.*\d)/, "At least 1 number")
      .matches(/(?=.*[#^@$!%*?&])/, "At least 1 special character")
      .min(8, "Password must be between 8 to 255 characters")
      .max(255, "Password must be between 8 to 255 characters")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
    mobileNo: yup
      .string()
      .matches(/^\d{10}$/, "Please enter a valid mobile number")
      .required("Mobile number is required"),
    designation: yup
      .string()
      .max(255, "Maximum 255 characters allowed")
      .required("Designation is required"),
    department: yup
      .string()
      .max(255, "Maximum 255 characters allowed")
      .required("Department is required"),
    // UNCOMMENT:
    captcha: yup.string().required("Captcha is required"),
    captchaToken: yup.string().required("Captcha token is required"),
  });

  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;

    otpQuery.mutate({
      captcha: values.captcha,
      uuid: values.captchaToken,
      isSignUp: 1,
      mobileno: encryptRSA(values.mobileNo, publicKey),
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
              <Heading size="md">Create your account</Heading>
            </Stack>

            <InputField
              name="name"
              label="Full name"
              placeholder="Enter your full name"
            />

            <InputField
              name="username"
              label="Email"
              placeholder="Enter your email"
              isRequired={false}
            />

            <PasswordField
              name="password"
              label="Password"
              placeholder="Minimum 8 characters"
            />

            <PasswordField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Retype the password above"
            />

            <InputField
              name="mobileNo"
              label="Mobile number"
              placeholder="Enter your mobile number"
            />

            <InputField
              name="designation"
              label="Designation"
              placeholder="Enter your designation"
            />

            <InputField
              name="department"
              label="Department"
              placeholder="Enter your department name"
            />

            {/* UNCOMMENT:  */}
            <CaptchaImage query={captchaQuery} />

            <InputField
              name="captcha"
              label="Captcha"
              placeholder="Enter the captcha above"
            />

            <Button
              aria-label="Get OTP"
              type="submit"
              variant="brand"
              isLoading={otpQuery.isPending}
              loadingText="Sending OTP"
            >
              Get OTP
            </Button>

            <Divider />

            <Text>
              Already have an account?{" "}
              <Link as={RouterLink} to="/">
                Sign in
              </Link>{" "}
              now.
            </Text>
          </Stack>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
