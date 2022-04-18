import axios from "axios";

const apiClient = () => {
  // const { API_URL } = process.env;

  const axiosInstance = axios.create({
    // baseURL: API_URL,
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    mode: "no-cors",
  });

  return axiosInstance;
};

export default apiClient;
