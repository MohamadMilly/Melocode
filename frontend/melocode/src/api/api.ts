import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: VITE_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post<{ accessToken: string }>(
          `${VITE_API_URL}/auth/refresh`,
          {
            refreshToken,
          },
        );
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        // If the refresh token is also expired or invalid, log the user out
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
