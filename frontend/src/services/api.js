import axios from "axios";

const API = axios.create({
  baseURL: "https://ems-backend-l992.onrender.com.api"
});

export default API;