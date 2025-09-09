import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
// const apiurl = "http://localhost:3000"

export const http = axios.create({
  baseURL: apiUrl,
});

export const baseUrl = apiUrl;
