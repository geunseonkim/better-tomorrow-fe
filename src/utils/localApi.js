import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3128";

const localApi = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default localApi;
