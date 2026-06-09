// import { useMutation, useQuery } from "@tanstack/react-query";
// import { request } from "../components/utils/request";
// import Cookies from "js-cookie";

// const API_KEY = import.meta.env.VITE_API_KEY;
// // const XSRF_TOKEN = Cookies.get("XSRF-TOKEN");

// // GET: XSRF Token
// const getXsrfToken = () => {
//   return request({
//     url: "/csrf-token",
//     method: "get",
//     headers: {
//       "API-Key": API_KEY,
//     },
//   });
// };

// export const useGetXsrfToken = () => {
//   return useQuery({
//     queryKey: ["get-xsrf-token"],
//     queryFn: getXsrfToken,
//   });
// };

// // GET: Public Key
// const getPublicKey = () => {
//   return request({
//     url: "/auth/get-public-key",
//     method: "get",
//     headers: {
//       "API-Key": API_KEY,
//     },
//   });
// };

// export const useGetPublicKey = () => {
//   return useQuery({
//     queryKey: ["get-public-key"],
//     queryFn: getPublicKey,
//     refetchOnMount: false,
//     refetchInterval: false,
//     refetchIntervalInBackground: false,
//     refetchOnReconnect: false,
//     refetchOnWindowFocus: false,
//   });
// };

// // GET: Refresh Captcha
// const fetchRefreshCaptcha = () => {
//   return request({
//     url: "/auth/refresh-captcha",
//     method: "get",
//     headers: {
//       "API-Key": API_KEY,
//     },
//   });
// };

// export const useFetchRefreshCaptcha = () => {
//   return useQuery({
//     queryKey: ["fetch-refresh-captcha"],
//     queryFn: fetchRefreshCaptcha,
//     refetchOnMount: false,
//     refetchInterval: false,
//     refetchIntervalInBackground: false,
//     refetchOnReconnect: false,
//     refetchOnWindowFocus: false,
//   });
// };

// // POST: Register User
// const registerUser = (data) => {
//   return request({
//     url: "/auth/register",
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//       // "X-XSRF-TOKEN": XSRF_TOKEN,
//     },
//     data,
//   });
// };

// export const useRegisterUser = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: registerUser,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Get OTP Sign Up
// const getOTPSignUp = (data) => {
//   return request({
//     url: "/auth/send-otp-signup",
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//       // "X-XSRF-TOKEN": XSRF_TOKEN,
//     },
//     data,
//   });
// };

// export const useGetOTPSignUp = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: getOTPSignUp,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Verify OTP Sign Up
// const verifyOTPSignUp = (data) => {
//   return request({
//     url: "/auth/verify-otp-signup",
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//       // "X-XSRF-TOKEN": XSRF_TOKEN,
//     },
//     data,
//   });
// };

// export const useVerifyOTPSignUp = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: verifyOTPSignUp,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Logout User
// const logoutUser = () => {
//   return request({
//     url: "/auth/logout",
//     method: "get",
//     headers: {
//       "API-Key": API_KEY,
//     },
//   });
// };

// export const useLogoutUser = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: logoutUser,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Authenticate User
// const authenticateuser = (data) => {
//   return request({
//     url: "/auth/authenticate", // ** Uncomment Later
//     // url: "/auth/authenticate-1", // ** Comment Later
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//       // "X-XSRF-TOKEN": XSRF_TOKEN,
//     },
//     data,
//   });
// };

// export const useAuthenticateUser = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: authenticateuser,
//     onSuccess,
//     onError,
//   });
// };

// // ** COMMENT THIS LATER **
// // POST: Authenticate User
// const verifyOtpLogin = (data) => {
//   return request({
//     url: "/auth/verify-otp-login",
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//       // "X-XSRF-TOKEN": XSRF_TOKEN,
//     },
//     data,
//   });
// };

// export const useVerifyOtpLogin = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: verifyOtpLogin,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Forgot Password
// const sendForgotPasswordOTP = (data) => {
//   return request({
//     url: "/auth/send-otp-fp",
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//       // "X-XSRF-TOKEN": XSRF_TOKEN,
//     },
//     data,
//   });
// };

// export const useSendForgotPasswordOTP = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: sendForgotPasswordOTP,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Reset Password
// const resetPassword = (data) => {
//   return request({
//     url: "/auth/reset-forgot-password",
//     method: "post",
//     headers: {
//       "API-Key": API_KEY,
//     },
//     data,
//   });
// };

// export const useResetPassword = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: resetPassword,
//     onSuccess,
//     onError,
//   });
// };

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * ----------------------------
 * GET: XSRF Token
 * ----------------------------
 */
export const useGetXsrfToken = () => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["get-xsrf-token"],
    queryFn: () =>
      axiosClient.get("/csrf-token", {
        headers: { "API-Key": API_KEY },
      }),
  });
};

/**
 * ----------------------------
 * GET: Public Key
 * ----------------------------
 */
export const useGetPublicKey = () => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["get-public-key"],
    queryFn: () =>
      axiosClient.get("/auth/get-public-key", {
        headers: { "API-Key": API_KEY },
      }),
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * ----------------------------
 * GET: Refresh Captcha
 * ----------------------------
 */
export const useFetchRefreshCaptcha = () => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["fetch-refresh-captcha"],
    queryFn: () =>
      axiosClient.get("/auth/refresh-captcha", {
        headers: { "API-Key": API_KEY },
      }),
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

/**
 * ----------------------------
 * POST: Register User
 * ----------------------------
 */
export const useRegisterUser = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/register", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Send OTP Sign Up
 * ----------------------------
 */
export const useGetOTPSignUp = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/send-otp-signup", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Send OTP Sign In
 * ----------------------------
 */
export const useGetOTPSignIn = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/get-otp", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Verify OTP Sign In
 * ----------------------------
 */
export const useVerifyOTPSignIn = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/verify-otp", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Verify OTP Sign Up
 * ----------------------------
 */
export const useVerifyOTPSignUp = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/verify-otp-signup", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Logout User
 * ----------------------------
 */
export const useLogoutUser = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: () =>
      axiosClient.get("/auth/logout", {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Authenticate User
 * ----------------------------
 */
export const useAuthenticateUser = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/authenticate", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Verify OTP Login
 * ----------------------------
 */
export const useVerifyOtpLogin = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/verify-otp-login", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Send Forgot Password OTP
 * ----------------------------
 */
export const useSendForgotPasswordOTP = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/send-otp-fp", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Reset Password
 * ----------------------------
 */
export const useResetPassword = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/auth/reset-forgot-password", data, {
        headers: { "API-Key": API_KEY },
      }),
    onSuccess,
    onError,
  });
};
