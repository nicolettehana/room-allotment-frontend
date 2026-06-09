// import { useMutation, useQuery } from "@tanstack/react-query";
// import { request } from "../components/utils/request";

// // GET: Fetch Visitors
// const fetchVisitors = (
//   searchValue = "",
//   pageNumber,
//   pageSize,
//   startDate,
//   endDate,
//   officeCode
// ) => {
//   return request({
//     url: `/visitor?page=${pageNumber}&size=${pageSize}&search=${searchValue}&startDate=${startDate}&endDate=${endDate}&officeCode=${officeCode}`,
//     method: "get",
//   });
// };

// export const useFetchVisitors = (
//   searchValue,
//   pageNumber,
//   pageSize,
//   startDate,
//   endDate,
//   officeCode
// ) => {
//   return useQuery({
//     queryKey: [
//       "visitors",
//       searchValue,
//       pageNumber,
//       pageSize,
//       startDate,
//       endDate,
//       officeCode
//     ],
//     queryFn: () =>
//       fetchVisitors(searchValue, pageNumber, pageSize, startDate, endDate, officeCode),
//   });
// };

// // GET: Fetch visitor photo
// const fetchVisitorPhoto = async (visitorCode) => {
//   if (!visitorCode) {
//     return null;
//   }

//   const response = await request({
//     url: `/visitor/${visitorCode}/photo`,
//     method: "get",
//     responseType: "blob",
//   });

//   return response;
// };

// export const useFetchVisitorPhoto = (visitorCode, enabled = true) => {
//   return useQuery({
//     queryKey: ["visitorPhoto", visitorCode],
//     queryFn: () => fetchVisitorPhoto(visitorCode),
//     enabled: !!visitorCode && enabled,
//     staleTime: Infinity,
//     cacheTime: Infinity,
//   });
// };

// // GET: Fetch visitor pass
// const fetchVisitorPass = async (visitorCode) => {
//   if (!visitorCode) {
//     return null;
//   }

//   const response = await request({
//     url: `/visitor/${visitorCode}/pass`,
//     method: "get",
//     responseType: "blob",
//   });

//   return response;
// };

// export const useFetchVisitorPass = (visitorCode, enabled = true) => {
//   return useQuery({
//     queryKey: ["visitorPass", visitorCode],
//     queryFn: () => fetchVisitorPass(visitorCode),
//     enabled: !!visitorCode && enabled,
//     staleTime: Infinity,
//     cacheTime: Infinity,
//   });
// };

// // GET: Export Visitors
// const exportVisitors = ({ format, startDate, endDate, withPhoto, officeCode }) => {
//   return request({
//     url: `/visitor/export`,
//     method: "get",
//     params: { format, startDate, endDate, withPhoto, officeCode },
//     responseType: "blob",
//   });
// };

// export const useExportVisitors = () => {
//   return useMutation({
//     mutationFn: exportVisitors,
//   });
// };

// // GET: Fetch visitor information
// const fetchVisitorInformation = async (mobileNo) => {
//   if (!mobileNo) {
//     return null;
//   }

//   const response = await request({
//     url: `/visitor/get-info?mobileNo=${mobileNo}`,
//     method: "get",
//   });

//   return response;
// };

// export const useFetchVisitorInformation = (mobileNo, enabled = true) => {
//   return useQuery({
//     queryKey: ["visitorInformation", mobileNo],
//     queryFn: () => fetchVisitorInformation(mobileNo),
//     enabled: !!mobileNo && enabled && mobileNo.length === 10,
//   });
// };

// // GET: Get Stats
// const fetchStats = (
//   month,
//   year,
//   purpose,
//   officeCode
// ) => {
//   return request({
//     url: `/visitor/stats?month=${month}&year=${year}&purpose=${purpose}&officeCode=${officeCode}`,
//     method: "get",
//   });
// };

// export const useFetchStats = (
//   month,
//   year,
//   purpose,
//   officeCode
// ) => {
//   return useQuery({
//     queryKey: [
//       "visitors",
//       month,
//   year,
//   purpose,
//   officeCode
//     ],
//     queryFn: () =>
//       fetchStats(month, year, purpose, officeCode),
//   });
// };

// // GET: Get Purpose Stats
// const fetchPurposeStats = (
//   month,
//   year,
//   officeCode
// ) => {
//   return request({
//     url: `/visitor/purpose-stats?month=${month}&year=${year}&officeCode=${officeCode}`,
//     method: "get",
//   });
// };

// export const useFetchPurposeStats = (
//   month,
//   year,
//   officeCode
// ) => {
//   return useQuery({
//     queryKey: [
//       "visitors",
//       month,
//   year,
//   officeCode
//     ],
//     queryFn: () =>
//       fetchPurposeStats(month, year, officeCode),
//   });
// };

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * GET: Fetch Visitors
 * ----------------------------
 */
const fetchVisitors = (
  axiosClient,
  searchValue = "",
  pageNumber,
  pageSize,
  startDate,
  endDate,
  officeCode,
) => {
  return axiosClient.get(
    `/visitor?page=${pageNumber}&size=${pageSize}&search=${searchValue}&startDate=${startDate}&endDate=${endDate}&officeCode=${officeCode}`,
  );
};

export const useFetchVisitors = (
  searchValue,
  pageNumber,
  pageSize,
  startDate,
  endDate,
  officeCode,
) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: [
      "visitors",
      searchValue,
      pageNumber,
      pageSize,
      startDate,
      endDate,
      officeCode,
    ],
    queryFn: () =>
      fetchVisitors(
        axiosClient,
        searchValue,
        pageNumber,
        pageSize,
        startDate,
        endDate,
        officeCode,
      ),
  });
};

/**
 * ----------------------------
 * GET: Visitor Photo
 * ----------------------------
 */
const fetchVisitorPhoto = (axiosClient, visitorCode) => {
  if (!visitorCode) return null;
  return axiosClient.get(`/visitor/${visitorCode}/photo`, {
    responseType: "blob",
  });
};

export const useFetchVisitorPhoto = (visitorCode, enabled = true) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["visitorPhoto", visitorCode],
    queryFn: () => fetchVisitorPhoto(axiosClient, visitorCode),
    enabled: !!visitorCode && enabled,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

/**
 * ----------------------------
 * GET: Visitor Pass
 * ----------------------------
 */
const fetchVisitorPass = (axiosClient, visitorCode) => {
  if (!visitorCode) return null;
  return axiosClient.get(`/visitor/${visitorCode}/pass`, {
    responseType: "blob",
  });
};

export const useFetchVisitorPass = (visitorCode, enabled = true) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["visitorPass", visitorCode],
    queryFn: () => fetchVisitorPass(axiosClient, visitorCode),
    enabled: !!visitorCode && enabled,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

/**
 * ----------------------------
 * GET: Export Visitors
 * ----------------------------
 */
const exportVisitors = (axiosClient, params) => {
  return axiosClient.get("/visitor/export", { params, responseType: "blob" });
};

export const useExportVisitors = () => {
  const { axiosClient } = useAuthContext();

  //return useMutation((params) => exportVisitors(axiosClient, params));
  return useMutation({
    mutationFn: (params) => exportVisitors(axiosClient, params),
  });
};

/**
 * ----------------------------
 * GET: Visitor Information
 * ----------------------------
 */
const fetchVisitorInformation = (axiosClient, mobileNo) => {
  if (!mobileNo) return null;
  return axiosClient.get(`/visitor/get-info?mobileNo=${mobileNo}`);
};

export const useFetchVisitorInformation = (mobileNo, enabled = true) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["visitorInformation", mobileNo],
    queryFn: () => fetchVisitorInformation(axiosClient, mobileNo),
    enabled: !!mobileNo && enabled && mobileNo.length === 10,
  });
};

/**
 * ----------------------------
 * GET: Visitor Stats
 * ----------------------------
 */
const fetchStats = (axiosClient, month, year, purpose, officeCode) => {
  return axiosClient.get(
    `/visitor/stats?month=${month}&year=${year}&purpose=${purpose}&officeCode=${officeCode}`,
  );
};

export const useFetchStats = (month, year, purpose, officeCode) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["visitorsStats", month, year, purpose, officeCode],
    queryFn: () => fetchStats(axiosClient, month, year, purpose, officeCode),
  });
};

/**
 * ----------------------------
 * GET: Purpose Stats
 * ----------------------------
 */
const fetchPurposeStats = (axiosClient, month, year, officeCode) => {
  return axiosClient.get(
    `/visitor/purpose-stats?month=${month}&year=${year}&officeCode=${officeCode}`,
  );
};

export const useFetchPurposeStats = (month, year, officeCode) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["visitorsPurposeStats", month, year, officeCode],
    queryFn: () => fetchPurposeStats(axiosClient, month, year, officeCode),
  });
};
