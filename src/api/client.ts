const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const getHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('neovidia_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res: Response) => {
  if (res.status === 401) {
    localStorage.removeItem('neovidia_token');
    throw new Error('Unauthorized');
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const apiClient = {
  get: (path: string) =>
    fetch(`${BASE_URL}${path}`, { headers: getHeaders() }).then(handleResponse),
  post: (path: string, body?: unknown) =>
    fetch(`${BASE_URL}${path}`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  put: (path: string, body?: unknown) =>
    fetch(`${BASE_URL}${path}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  delete: (path: string) =>
    fetch(`${BASE_URL}${path}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
};

export default apiClient;
