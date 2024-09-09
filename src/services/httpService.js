import axios from "axios";
import { auth } from "../firebase/config";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}`,
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
  if (!auth?.currentUser) return config;

  const token = await auth?.currentUser.getIdToken(); // Await the promise resolution
  return {
    ...config,
    headers: {
      ...config.headers, // Spread existing headers 
      Authorization: `Bearer ${token}` // Append the token
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, config = {}) =>
    instance.get(url, { ...config }).then(responseBody), // Corrected usage

  post: (url, body, headers) => instance.post(url, body, { headers }).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, { headers }).then(responseBody), // Adjusted for consistency

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, config = {}) =>
    instance.delete(url, { ...config }).then(responseBody), // Corrected usage
};

export default requests;