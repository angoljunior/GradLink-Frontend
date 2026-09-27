import axios from "axios";
import { clearSession } from "@/lib/session";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";
const api = axios.create({ baseURL, timeout: 60000 });
const auth = axios.create({ baseURL, timeout: 15000 });
let refreshRequest;
const publicAuth = (url = "") => /^(login|register|auth\/google|token(?:\/refresh)?)\/?$/.test(url.replace(/^\//, ""));

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token && !publicAuth(config.url)) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use((response) => response, async (error) => {
  const config = error.config;
  if (!config || error.response?.status !== 401 || config._retried || publicAuth(config.url)) throw error;
  const refresh = localStorage.getItem("refresh");
  if (!refresh) { clearSession(); throw error; }
  config._retried = true;
  try {
    // One refresh request serves concurrent failed requests.
    if (!refreshRequest) {
      refreshRequest = auth.post("token/refresh/", { refresh }).then(({ data }) => {
        if (localStorage.getItem("refresh") !== refresh) throw new Error("Session changed");
        localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        return data.access;
      }).finally(() => { refreshRequest = undefined; });
    }
    const access = await refreshRequest;
    config.headers.Authorization = `Bearer ${access}`;
    return await api(config);
  } catch (refreshError) {
    if (refreshError.response?.status === 401 && localStorage.getItem("refresh") === refresh) clearSession();
    throw refreshError;
  }
});

export default api;
