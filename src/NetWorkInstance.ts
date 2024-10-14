import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义请求接口
interface Request {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: any;
}

// 定义响应接口
export interface Response<T> {
  code: number
  data: T
  msg: string
}

class NetWork {
  private instance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  // 拦截器
  private interceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      // @ts-ignore
      (config: AxiosRequestConfig) => {
        // 在这里可以添加一些请求前的处理，例如添加token等

        return config;
      },
      (error) => {
        // 请求错误处理
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 在这里可以添加一些响应后的处理，例如格式化数据等
        return response;
      },
      (error) => {
        // 响应错误处理
        console.error('Response error:', error);
        return Promise.reject(error);
      }
    );
  }

  // 通用发送请求的方法
  request<T>(config: Request): Promise<Response<T>> {
    return new Promise((resolve, reject) => {
      this.instance({
        url: config.url,
        method: config.method || 'GET',
        data: config.data,
        params: config.params,
      })
        .then((response: AxiosResponse) => {
          resolve({
            code: response.status,
            data: response.data,
            msg: response.statusText
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 常用请求方法
  get<T>(url: string, params?: object): Promise<T> {
    return this.instance.request({ url, method: 'GET', params });
  }

  post<T>(url: string, params?: object): Promise<T> {
    return this.instance.request({ url, method: 'POST', params });
  }

  put<T>(url: string, params?: object): Promise<T> {
    return this.instance.request({ url, method: 'PUT', params });
  }

  delete<T>(url: string, params?: object): Promise<T> {
    return this.instance.request({ url, method: 'DELETE', params });
  }

}

export default NetWork;
