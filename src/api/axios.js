import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${currentUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
