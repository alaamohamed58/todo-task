import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

instance.interceptors.response.use(
  (config) => {
    const token = Cookies.get("app-token");

    config.headers.Authorization =  token;
     
    return config;

  },
  (error) => {
    if (error.response) {
      const { status, message } = error.response;
      if (status === 500) {
        alert(message);
      }
      if (status === 401 || status === 403) {
        //  alert('logout');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
