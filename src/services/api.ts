import axios from "axios";

const API = axios.create({
  baseURL: "https://hiregenie-backend.onrender.com",
});

export default API;
