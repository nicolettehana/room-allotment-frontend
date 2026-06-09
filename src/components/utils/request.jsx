import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const createRequestClient = (auth) => {
  const client = axios.create({
    baseURL: BASE_URL,
  });

  // Attach access token from memory
  client.interceptors.request.use((config) => {
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  });

  // Handle 401 refresh
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "JWT token has expired"
      ) {
        try {
          const refreshToken = sessionStorage.getItem("refresh_token");

          const response = await axios.get(BASE_URL + "/auth/refresh-token", {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              "API-Key": API_KEY,
            },
          });

          // Update tokens properly
          auth.setAccessToken(response.data.access_token);
          sessionStorage.setItem("refresh_token", response.data.refresh_token);

          // Retry original request
          error.config.headers.Authorization = `Bearer ${response.data.access_token}`;

          return client(error.config);
        } catch (err) {
          auth.logout();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};
