import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const is401 = error.response?.status === 401;
    const isAuthRoute = error.config?.url?.includes('connexion') 
                     || error.config?.url?.includes('google');

    if (is401 && !isAuthRoute) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default api;