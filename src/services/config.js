import axios from "axios";

const apiUrl = "planilhas-app-production.up.railway.app/";
// const apiurl = "http://localhost:3000 "

export const http = axios.create({
  baseURL: apiUrl,
});

export const baseUrl = apiUrl;
