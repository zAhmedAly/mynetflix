import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => config);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      // console.log("axiosInstance Response = ", response);
      return response.data;
    }
    // console.log("axiosInstance No Data = ", response);
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = error.response?.status || 500;

    // console.log("axiosInstance Error = ", status, { ...error });

    // throw error;

    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        return Promise.reject(error);
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject("Server Error... Please retry later");
      }
    }
  }
);

export default axiosInstance;
