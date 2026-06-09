import { useEffect, useRef } from "react";
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
import PasswordField from "../../components/core/formik/PasswordField";
import { useNavigate } from "react-router-dom";
import {
  useAuthenticateUser,
  useFetchRefreshCaptcha,
  useGetPublicKey,
} from "../../hooks/authQueries";
import { encryptRSA } from "../../components/utils/security";
import CaptchaImage from "../../components/common/CaptchaImage";
import { useAuthContext } from "../../components/auth/authContext";

const SignInForm = () => {
  const formikRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  // Queries
  const publicKeyQuery = useGetPublicKey();
  const captchaQuery = useFetchRefreshCaptcha();
  const authenticateQuery = useAuthenticateUser(
    async (response) => {
      const { access_token, refresh_token, role } = response.data;

      // Store tokens + minimal user info
      login(access_token, refresh_token, { role });

      toast({
        title: "Login successful",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      // Role-based navigation
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
      captchaQuery.refetch();
      formikRef.current?.setFieldValue("captcha", "");

      toast({
        title: "Login failed",
        description: error?.response?.data?.detail || "Something went wrong",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    },
  );

  // Formik setup
  const initialValues = {
    username: "",
    password: "",
    captcha: "",
    captchaToken: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password must be at most 255 characters")
      .matches(/(?=.*[a-z])/, "At least 1 lowercase letter")
      .matches(/(?=.*[A-Z])/, "At least 1 uppercase letter")
      .matches(/(?=.*\d)/, "At least 1 number")
      .matches(/(?=.*[#^@$!%*?&])/, "At least 1 special character")
      .required("Password is required"),
    //captcha: yup.string(),
    captcha: yup.string().required("Captcha is required"),
    captchaToken: yup.string().required("Captcha token is required"),
  });

  const onSubmit = (values) => {
    const publicKey = publicKeyQuery?.data?.data?.publicKey;
    if (!publicKey) return;

    const formData = {
      username: encryptRSA(values.username, publicKey),
      password: encryptRSA(values.password, publicKey),
      captcha: values.captcha,
      captchaToken: values.captchaToken,
    };

    authenticateQuery.mutate(formData);
  };

  useEffect(() => {
    if (captchaQuery.isSuccess && captchaQuery.data?.data?.captchaToken) {
      formikRef.current?.setFieldValue(
        "captchaToken",
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
          <Heading size="md">Login</Heading>

          <InputField
            name="username"
            label="Username"
            placeholder="Enter your username"
            autoComplete="off"
          />

          <Box position="relative">
            <PasswordField
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
          </Box>

          <CaptchaImage query={captchaQuery} />

          <InputField
            name="captcha"
            label="Captcha"
            placeholder="Enter the text from the image"
            //isRequired={false}
          />

          <Button
            type="submit"
            colorScheme="brand"
            isLoading={authenticateQuery.isPending}
            loadingText="Signing in..."
            variant="brand"
            isDisabled={
              !formik.values.captchaToken || authenticateQuery.isPending
            }
            width="full"
          >
            Sign In
          </Button>

          <Divider />

          {/* Uncomment if you want registration link */}
          {/* <Text textAlign="center">
            Don't have an account?{" "}
            <Link as={RouterLink} to="/auth/register" color="brand.600">
              Register
            </Link>
          </Text> */}
        </Stack>
      )}
    </Formik>
  );
};

export default SignInForm;
