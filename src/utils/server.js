import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const server = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default server;
