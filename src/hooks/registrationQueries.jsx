// import { useMutation, useQuery } from "@tanstack/react-query";
// import { request } from "../components/utils/request";

// // POST: Register
// const createRegistration = (data) => {
//   return request({
//     url: "/visitor",
//     method: "post",
//     data,
//     responseType: "blob",
//   });
// };

// export const useCreateRegistration = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: createRegistration,
//     onSuccess: (blob) => onSuccess?.({ data: blob }),
//     onError,
//   });
// };

import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * POST: Create Visitor Registration
 * ----------------------------
 */
const createRegistration = (axiosClient, data) => {
  return axiosClient.post("/visitor", data, { responseType: "blob" });
};

export const useCreateRegistration = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => createRegistration(axiosClient, data),
    onSuccess: (blob) => onSuccess?.({ data: blob }),
    onError,
  });
};
