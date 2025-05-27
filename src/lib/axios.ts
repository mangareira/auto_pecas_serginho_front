import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('Status:', error.response.status);

      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          alert('Sua sessão pode ter expirado ou você não está autenticado. Tente recarregar a página ou fazer login novamente.');
        }
      } else if (error.response.status === 403) {
        alert('Você não tem permissão para acessar este recurso.');
      }
    } else if (error.request) {
      console.error('API No Response:', error.request);
      alert('Não foi possível conectar ao servidor. Verifique sua internet.');
    } else {
      console.error('Axios Config Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;