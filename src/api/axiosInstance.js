// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://43.203.209.38:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
