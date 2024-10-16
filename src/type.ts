import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 定义请求接口
export interface Request {
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

export interface CustomConfig extends AxiosRequestConfig {
    interceptors?: AxiosInterceptor;
}


export interface AxiosInterceptor {
    request?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig;
    response?: (response: AxiosResponse) => AxiosResponse;
}
