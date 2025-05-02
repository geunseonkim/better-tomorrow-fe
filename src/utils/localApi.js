import axios from "axios";

const localApi = axios.create({
  baseURL: "http://localhost:3128",
  headers: {
    "Content-Type": "application/json",
  },
});

export default localApi;
