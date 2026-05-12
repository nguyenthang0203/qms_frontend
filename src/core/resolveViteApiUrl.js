const DEFAULT_API = 'http://127.0.0.1:8000/api/v1';

/**
 * Chuẩn hóa URL API cho trình duyệt.
 * 0.0.0.0 chỉ dùng khi bind server (uvicorn --host 0.0.0.0); client phải gọi localhost/127.0.0.1.
 */
export function resolveViteApiUrl() {
  const raw = (import.meta.env.VITE_API_URL || DEFAULT_API).trim();
  return raw
    .replace(/^http:\/\/0\.0\.0\.0(?=:|\/|$)/i, 'http://127.0.0.1')
    .replace(/^https:\/\/0\.0\.0\.0(?=:|\/|$)/i, 'https://127.0.0.1');
}
