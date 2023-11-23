import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'

const showToast = (message: string) => {
  ElMessage.error({
    message,
    grouping: true,
    duration: 3000,
    showClose: true,
    offset: 50
  })
}

interface IApiResult {
  data?: any
  status: number
}

class Request {
  private instance: AxiosInstance
  private default: AxiosRequestConfig

  constructor(config?: AxiosRequestConfig) {
    this.default = {
      baseURL: '/webapp',
      timeout: 5000,
      withCredentials: true,
      headers: {}
    }
    this.instance = axios.create({ ...this.default, ...config })

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error: AxiosError) => {
        this.axiosErrorHandler(error.response?.status)
        return error
      }
    )
  }

  public get(url: string, params?: any): Promise<IApiResult> {
    return this.instance.get(url, params)
  }

  public post(url: string, params?: any): Promise<IApiResult> {
    return this.instance.post(url, params)
  }

  public put(url: string, params?: any): Promise<IApiResult> {
    return this.instance.put(url, params)
  }

  public delete(url: string, params?: any): Promise<IApiResult> {
    return this.instance.delete(url, params)
  }

  private axiosErrorHandler(statusCode?: number) {
    switch (statusCode) {
      case 404:
        showToast('[ERROR]Resources Not Found')
        break
      case 405:
        showToast('[ERROR]Method Not Allowed')
        break
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
        showToast('[ERROR]Server Error')
        break
      default: break
    }
  }
}

const FsRequest = new Request()

export { FsRequest }
export * from './api-map'
