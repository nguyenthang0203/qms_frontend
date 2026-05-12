import axios from 'axios';

import { resolveViteApiUrl } from './resolveViteApiUrl';

const apiClient = axios.create({
  baseURL: resolveViteApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động đính kèm Token nếu có (dùng cho bảo mật sau này)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi tập trung
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Đã có lỗi xảy ra';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default apiClient;
