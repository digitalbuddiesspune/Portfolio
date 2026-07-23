const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_API_LOCAL
    : import.meta.env.VITE_API_PROD;

export default API_BASE_URL;
