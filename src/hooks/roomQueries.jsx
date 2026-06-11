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
    enabled: !!officeCode,
    retry: 0,
  });
};
