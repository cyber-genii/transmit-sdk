import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { unwrapData } from './response';
import { ClientOptions } from './types/index';

export class TransmitClient {
  private httpClient: AxiosInstance;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error("API Key is required to initialize the Transmit SDK");
    }

    let defaultBaseUrl = 'https://api.transmit.com';
    if (options.environment === 'sandbox') {
      defaultBaseUrl = 'https://sandbox-api.transmit.com';
    }

    const baseURL = options.baseUrl || defaultBaseUrl;

    this.httpClient = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Transmit-Node-SDK/1.0.0',
      },
      timeout: 30000,
    });

    // Simple response interceptor to handle errors uniformly
    this.httpClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        let errorMessage = "An unknown error occurred during the API request";
        if (error.response && error.response.data) {
          const data = error.response.data as any;
          errorMessage = data.message || data.error || errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }
        throw new Error(`Transmit API Error [${error.response?.status || 'Unknown Status'}]: ${errorMessage}`);
      }
    );
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const response = await this.httpClient.get(path, { params });
    return unwrapData<T>(response.data);
  }

  async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.httpClient.post(path, data);
    return unwrapData<T>(response.data);
  }

  async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.httpClient.put(path, data);
    return unwrapData<T>(response.data);
  }

  async delete<T>(path: string): Promise<T> {
    const response = await this.httpClient.delete(path);
    return unwrapData<T>(response.data);
  }
}
