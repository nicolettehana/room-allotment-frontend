// import { useMutation, useQuery } from "@tanstack/react-query";
// import { request } from "../components/utils/request";

// // GET: Office List
// const fetchOffices = () => {
//   return request({
//     url: "/offices",
//     method: "get",
//   });
// };

// export const useFetchOffices = () => {
//   return useQuery({
//     queryKey: ["fetch-offices"],
//     queryFn: fetchOffices,
//     retry: 0,
//   });
// };

// // POST: Create Office
// const createOffice = (data) => {
//   return request({
//     url: "/offices",
//     method: "post",
//     data,
//   });
// };

// export const useCreateOffice = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: createOffice,
//     onSuccess,
//     onError,
//   });
// };

// // POST: Update Office
// const updateOffice = (data) => {
//   return request({
//     url: "/offices",
//     method: "post",
//     data,
//   });
// };

// export const useUpdateOffice = (onSuccess, onError) => {
//   return useMutation({
//     mutationFn: updateOffice,
//     onSuccess,
//     onError,
//   });
// };

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * GET: Office List
 * ----------------------------
 */
const fetchOffices = (axiosClient) => {
  return axiosClient.get("/offices");
};

export const useFetchOffices = () => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["fetch-offices"],
    queryFn: () => fetchOffices(axiosClient),
    retry: 0,
  });
};

/**
 * ----------------------------
 * POST: Create Office
 * ----------------------------
 */
const createOffice = (axiosClient, data) => {
  return axiosClient.post("/offices", data);
};

export const useCreateOffice = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => createOffice(axiosClient, data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Update Office
 * ----------------------------
 */
const updateOffice = (axiosClient, data) => {
  return axiosClient.post("/offices", data);
};

export const useUpdateOffice = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => updateOffice(axiosClient, data),
    onSuccess,
    onError,
  });
};
