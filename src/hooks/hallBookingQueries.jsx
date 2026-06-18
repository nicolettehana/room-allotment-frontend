import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * POST: Create Hall Booking
 * ----------------------------
 */
const createHallBooking = (axiosClient, data) => {
  return axiosClient.post("/booking", data);
};

export const useCreateBooking = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => createHallBooking(axiosClient, data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * GET: Fetch Booking History
 * ----------------------------
 */
const fetchHistory = (
  axiosClient,
  searchValue = "",
  pageNumber,
  pageSize,
  startDate,
  endDate,
  status,
  all,
  order
) => {
  return axiosClient.get(
    `/booking?page=${pageNumber}&size=${pageSize}&search=${searchValue}&startDate=${startDate}&endDate=${endDate}&status=${status}&all=${all}&order=${order}`,
  );
};

export const useFetchHistory = (
  searchValue,
  pageNumber,
  pageSize,
  startDate,
  endDate,
  status,
  all,
  order,
) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: [
      "history",
      searchValue,
      pageNumber,
      pageSize,
      startDate,
      endDate,
      status,
      all,
      order
    ],
    queryFn: () =>
      fetchHistory(
        axiosClient,
        searchValue,
        pageNumber,
        pageSize,
        startDate,
        endDate,
        status,
        all,
        order
      ),
  });
};

/**
 * ----------------------------
 * GET: Fetch Pending Bookings
 * ----------------------------
 */
const fetchPendingBookings = (axiosClient, pageNumber, pageSize) => {
  return axiosClient.get(
    `/booking/pending?page=${pageNumber}&size=${pageSize}`,
  );
};

export const useFetchPendingBookings = (pageNumber, pageSize) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["pending-bookings", pageNumber, pageSize],
    queryFn: () => fetchPendingBookings(axiosClient, pageNumber, pageSize),
  });
};

/**
 * ----------------------------
 * POST: Take Action
 * ----------------------------
 */
const takeAction = (axiosClient, data) => {
  return axiosClient.post("/booking/action", data);
};

export const useTakeAction = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => takeAction(axiosClient, data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * POST: Get Nazir Remark
 * ----------------------------
 */
const getRemark = (axiosClient, data) => {
  return axiosClient.post("/booking/get-remark", data);
};

export const useGetRemark = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => getRemark(axiosClient, data),
    onSuccess,
    onError,
  });
};

/**
 * ----------------------------
 * GET: Fetch Hall Allotments
 * ----------------------------
 */
const fetchHallAllotments = (axiosClient, date, officeCode) => {
  return axiosClient.get(
    `/booking/hall-allotments?date=${date}&officeCode=${officeCode}`,
  );
};

export const useFetchHallAllotments = (date, officeCode) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["hall-allotments", date, officeCode],
    queryFn: () => fetchHallAllotments(axiosClient, date, officeCode),
  });
};

/**
 * ----------------------------
 * GET: Export Bookings
 * ----------------------------
 */
const exportBookings = (axiosClient, params) => {
  return axiosClient.get("/booking/export", { params, responseType: "blob" });
};

export const useExportBookings = () => {
  const { axiosClient } = useAuthContext();

  //return useMutation((params) => exportVisitors(axiosClient, params));
  return useMutation({
    mutationFn: (params) => exportBookings(axiosClient, params),
  });
};
