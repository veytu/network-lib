import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Request, Response, CustomConfig } from './type';

class NetWork {
  private instance: AxiosInstance;

  constructor(config: CustomConfig) {
    this.instance = axios.create(config);
    this.interceptors(config);
    //允许在实例化 PFRequest 时传入自定义的拦截器
  }

  // 拦截器
  interceptors(config: CustomConfig) {
    const { interceptors } = config;
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

    if (interceptors) {
      this.instance.interceptors.request.use(interceptors.request);
      this.instance.interceptors.response.use(interceptors.response);

    }
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
          console.log("🚀 ~ NetWork ~ .then ~ response:", response)
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
  get<T>(url: string, params?: object): Promise<Response<T>> {
    return this.request({ url, method: 'GET', params });
  }

  post<T>(url: string, params?: object): Promise<Response<T>> {
    return this.request({ url, method: 'POST', params });
  }

  put<T>(url: string, params?: object): Promise<Response<T>> {
    return this.request({ url, method: 'PUT', params });
  }

  delete<T>(url: string, params?: object): Promise<Response<T>> {
    return this.request({ url, method: 'DELETE', params });
  }

}

export default NetWork;
