import axios from "axios";

const API = axios.create({
  baseURL: "https://habito-1c5c.onrender.com/api",
});


API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);


API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - logging out");

      
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;