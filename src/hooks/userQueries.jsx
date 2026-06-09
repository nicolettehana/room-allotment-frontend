// import { useMutation, useQuery } from "@tanstack/react-query";
// import { request } from "../components/utils/request";

// // GET: Users Profile
// const fetchUsersProfile = () => {
//   return request({
//     url: "/users/profile",
//     method: "get",
//   });
// };

// export const useFetchUsersProfile = () => {
//   return useQuery({
//     queryKey: ["fetch-users-profile"],
//     queryFn: fetchUsersProfile,
//     retry: 0,
//   });
// };

// // POST: Update Mobile Number
// const updateMobileNo = (data) => {
//   return request({
//     url: `/users/send-otp-update-mobile`,
//     method: "post",
//     data,
//   });
// };

// export const useUpdateMobileNo = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: updateMobileNo,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Verify Change Mobile OTP
// const verifyChangeMobileOTP = (data) => {
//   return request({
//     url: `/users/verify-otp-update-mobile`,
//     method: "post",
//     data,
//   });
// };

// export const useVerifyChangeMobileOTP = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: verifyChangeMobileOTP,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Create User
// const createUser = (data) => {
//   return request({
//     url: "/users/register",
//     method: "post",
//     data,
//   });
// };

// export const useCreateUser = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: createUser,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Update User
// const updateUser = (data) => {
//   return request({
//     url: "/users/update",
//     method: "post",
//     data,
//   });
// };

// export const useUpdateUser = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: updateUser,
//     onSuccess,
//     onError,
//   });
// };

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * FETCH USERS PROFILE
 * ----------------------------
 */
export const useFetchUsersProfile = ({ enabled = true } = {}) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["fetch-users-profile"],
    queryFn: async () => {
      const response = await axiosClient.get("/users/profile");
      return response.data;
    },
    enabled: !!axiosClient && enabled, // ✅ only when provider exists
  });
};

/**
 * ----------------------------
 * SEND OTP TO UPDATE MOBILE
 * ----------------------------
 */
export const useUpdateMobileNo = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/users/send-otp-update-mobile", data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * VERIFY OTP FOR MOBILE CHANGE
 * ----------------------------
 */
export const useVerifyChangeMobileOTP = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) =>
      axiosClient.post("/users/verify-otp-update-mobile", data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * CREATE USER
 * ----------------------------
 */
export const useCreateUser = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => axiosClient.post("/users/register", data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * UPDATE USER
 * ----------------------------
 */
export const useUpdateUser = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => axiosClient.post("/users/update", data),
    onSuccess,
    onError,
  });
};
