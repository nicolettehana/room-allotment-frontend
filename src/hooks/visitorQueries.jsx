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
