import axios from "axios";

const apiInstance = {
  api: null,
};

export const createAxios = () => {
  const api = axios.create({
    baseURL: "https://services.about-me.site/",
    // baseURL: "http://localhost:8081/",
  });

  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);

      // window.location.replace("/login");
      return error;
    }
  );

  apiInstance.api = api;

  return apiInstance;
};
