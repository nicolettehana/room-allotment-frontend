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
) => {
  return axiosClient.get(
    `/booking?page=${pageNumber}&size=${pageSize}&search=${searchValue}&startDate=${startDate}&endDate=${endDate}`,
  );
};

export const useFetchHistory = (
  searchValue,
  pageNumber,
  pageSize,
  startDate,
  endDate,
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
    ],
    queryFn: () =>
      fetchHistory(
        axiosClient,
        searchValue,
        pageNumber,
        pageSize,
        startDate,
        endDate,
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
