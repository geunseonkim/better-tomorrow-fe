import axios from "axios";

const mockApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default mockApi;
