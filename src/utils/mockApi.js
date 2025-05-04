import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const mockApi = axios.create({
  // baseURL: "http://localhost:3000", //로컬 테스트용
  baseURL: "https://my-json-server.typicode.com/Better-Tmr/better-tomorrow-fe",
});

export default mockApi;
