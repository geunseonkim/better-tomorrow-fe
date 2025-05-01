import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
// const CHANNEL_ID = "UCX6OQ3DkcsbYNE6H8uQQuVA";

const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  headers: {
    Accept: "application/json",
  },
});

export default api;
