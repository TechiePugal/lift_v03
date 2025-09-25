import axios from "axios";

export const api = axios.create({
  // baseURL: "https://api.simpld.in/api/",
  baseURL: "http://103.207.4.72:3049/api/",
  // baseURL: "http://localhost:3049/api/",
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Successful response
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      // Handle 401 Unauthorized
      return Promise.reject(error);
    } else if (error.response?.status === 401) {
      // Handle 401 Unauthorized without refresh token
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
