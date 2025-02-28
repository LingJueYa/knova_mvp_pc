import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API请求错误:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
);