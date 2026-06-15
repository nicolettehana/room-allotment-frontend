import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * GET: Hall List
 * ----------------------------
 */
const fetchHalls = (axiosClient, officeCode) => {
  return axiosClient.get(`/room/hall?officeCode=${officeCode}`);
};

export const useFetchHalls = (officeCode) => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["fetch-halls", officeCode],
    queryFn: () => fetchHalls(axiosClient, officeCode),
    //enabled: !!officeCode,
    retry: 0,
  });
};

/**
 * ----------------------------
 * GET: Hall List Office Wise
 * ----------------------------
 */
const fetchHallsOfficeWise = (axiosClient) => {
  return axiosClient.get(`/room/office-hall`);
};

export const useFetchHallsOfficeWise = () => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["fetch-halls-office-wise"],
    queryFn: () => fetchHallsOfficeWise(axiosClient),
    enabled: !!axiosClient,
    retry: 0,
  });
};

/**
 * ----------------------------
 * POST: Create Hall
 * ----------------------------
 */
const createHall = (axiosClient, data) => {
  return axiosClient.post("/room/hall", data);
};

export const useCreateHall = (onSuccess, onError) => {
  const { axiosClient } = useAuthContext();

  return useMutation({
    mutationFn: (data) => createHall(axiosClient, data),
    onSuccess,
    onError,
  });
};
