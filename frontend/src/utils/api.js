const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const api = {
  get: (path) => fetch(`${API_BASE}${path}`).then(handleResponse),

  post: (path, data) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  postForm: (path, formData) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      body: formData,
    }).then(handleResponse),
};
