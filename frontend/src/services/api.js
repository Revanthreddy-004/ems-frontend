import axios from "axios";

const API = axios.create({
  baseURL: "https://ems-backend-ukf6.onrender.com"
});

export default API;