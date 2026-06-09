// import { useMutation } from "@tanstack/react-query";
// import { request } from "../components/utils/request";
// import Cookies from "js-cookie";

// // const XSRF_TOKEN = Cookies.get("XSRF-TOKEN");

// // POST: Update Profile
// const updateProfile = (data) => {
//   return request({
//     url: "/users/update",
//     method: "post",
//     // headers: {
//     //   "X-XSRF-TOKEN": XSRF_TOKEN,
//     // },
//     data,
//   });
// };

// export const useUpdateProfile = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: updateProfile,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Change Password
// const changePassword = (data) => {
//   return request({
//     url: "/users/change-password",
//     method: "post",
//     // headers: {
//     //   "X-XSRF-TOKEN": XSRF_TOKEN,
//     // },
//     data,
//   });
// };

// export const useChangePassword = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: changePassword,
//     onSuccess,
//     onError,
//   });
// };

import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * POST: Update Profile
 * ----------------------------
 */
const updateProfile = (axiosClient, data) => {
  return axiosClient.post("/users/update", data);
};

export const useUpdateProfile = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => updateProfile(axiosClient, data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Change Password
 * ----------------------------
 */
const changePassword = (axiosClient, data) => {
  return axiosClient.post("/users/change-password", data);
};

export const useChangePassword = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => changePassword(axiosClient, data),
    onSuccess,
    onError,
  });
};
