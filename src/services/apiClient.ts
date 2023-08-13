import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api/v1/",
});

class apiClient<T> {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  postData = (data: T | any, suffix = "") => {
    return axiosInstance.post(this.endPoint + suffix, data, { withCredentials: true });
  };

  updateData = (data: T, headers: any | undefined) => {
    return axiosInstance.put(this.endPoint, data, {
      headers,
      withCredentials: true
    });
  };

  deleteData = (suffix = "") => {
    return axiosInstance.delete(this.endPoint + suffix, {
      withCredentials: true
    });
  }

  getData = (suffix = "", params?: any) => {
    return axiosInstance.get<T>(this.endPoint + suffix, { withCredentials: true, params });
  };
}

export default apiClient;
