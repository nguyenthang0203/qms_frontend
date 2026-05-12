import axios from 'axios';

import { resolveViteApiUrl } from '../../core/resolveViteApiUrl';

/**
 * Upload multipart (không dùng apiClient mặc định vì Content-Type: application/json).
 */
export async function uploadFileToStorage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const base = resolveViteApiUrl();
  const { data } = await axios.post(`${base}/upload/file`, formData, { headers });
  return data;
}
