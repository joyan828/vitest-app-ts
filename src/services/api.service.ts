import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import AssetService from "./asset.service";

export class ApiService {
  axiosClient: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosClient = axios.create({ baseURL });
    this.axiosClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response === undefined) {
          console.error("Service in Maintenance");
          return;
        }
        const code = parseInt(error.response && error.response.status);
        switch (code) {
          case 401:
            console.warn('authentication failed')
            break;
          case 404:
            console.warn('not found');
            break;
          default:
            throw error;
        }
      }
    )
  }

  query(resource: string, params: object) {
    return this.axiosClient.get(`${resource}`, { params });
  }

  get(resource: string, slug = "", params?: AxiosRequestConfig) {
    return this.axiosClient.get(
      slug ? `${resource}/${slug}` : `${resource}`,
      params
    );
  }

  post(resource: string, params?: any, config?: AxiosRequestConfig) {
    return this.axiosClient.post(`${resource}`, params, config);
  }

  update(resource: string, slug: any, params: object) {
    return this.axiosClient.put(`${resource}/${slug}`, params);
  }

  put(resource: string, params: object) {
    return this.axiosClient.put(`${resource}`, params);
  }

  patch(resource: string, params: object) {
    return this.axiosClient.patch(`${resource}`, params);
  }

  delete(resource: string) {
    return this.axiosClient.delete(resource);
  }
}

const $assetApi = new AssetService(
  new ApiService('http://localhost:3000')
);

export {
  $assetApi
};


