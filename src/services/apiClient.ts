import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_MODE === "dev" ? import.meta.env.VITE_BACKEND_ENDPOINT_DEV : import.meta.env.VITE_BACKEND_ENDPOINT_PROD,
});


class apiClient<T> {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  postData = (data: T | any, suffix = "") => {
    return axiosInstance.post<any>(this.endPoint + suffix, data, { withCredentials: true });
  };

  postFormData = (data: T | any, headers: any | undefined) => {
    return axiosInstance.post<any>(this.endPoint, data, { headers, withCredentials: true });
  };

  updateData = (data: T, headers: any | undefined) => {
    return axiosInstance.put(this.endPoint, data, {
      headers,
      withCredentials: true,
    });
  };

  deleteData = (suffix = "") => {
    return axiosInstance.delete(this.endPoint + suffix, {
      withCredentials: true,
    });
  };

  getData = (suffix = "", params?: any) => {
    return axiosInstance.get<T>(this.endPoint + suffix, { withCredentials: true, params });
  };
}

export default apiClient;
