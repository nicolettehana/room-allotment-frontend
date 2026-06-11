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
