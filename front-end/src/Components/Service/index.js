// src/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://localhost:443", // Backend server URL
  withCredentials: true, // Allow sending cookies
});

// Request interceptor to add access token to the headers
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Refresh access token using the refresh token
        const { data } = await api.post(
          `/auth/refresh`,
          {},
          { withCredentials: true }
        );

        console.log("frontend index page >>>");
        console.log("refresh response >>>", data);

        localStorage.setItem("accessToken", data.accessToken); // Update access token
        api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
