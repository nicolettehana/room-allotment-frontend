// import { useQuery } from "@tanstack/react-query";
// import { request } from "../components/utils/request";

// // GET: Menu Links
// const fetchMenuLinks = () => {
//   return request({
//     url: "/menu",
//     method: "get",
//   });
// };

// export const useFetchMenuLinks = () => {
//   return useQuery({
//     queryKey: ["fetch-menu-links"],
//     queryFn: fetchMenuLinks,
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../components/auth/authContext";

/**
 * ----------------------------
 * GET: Menu Links
 * ----------------------------
 */
const fetchMenuLinks = (axiosClient) => {
  return axiosClient.get("/menu");
};

export const useFetchMenuLinks = () => {
  const { axiosClient } = useAuthContext();

  return useQuery({
    queryKey: ["fetch-menu-links"],
    queryFn: () => fetchMenuLinks(axiosClient),
  });
};
