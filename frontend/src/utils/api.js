const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('hackitise_token');
  const headers = {};
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    if (response.status === 401) {
      localStorage.removeItem('hackitise_token');
      // Optional: window.location.href = '/admin/login';
    }
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const api = {
  get: (path) => 
    fetch(`${API_BASE}${path}`, {
      headers: getHeaders()
    }).then(handleResponse),

  post: (path, data) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  postForm: (path, formData) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    }).then(handleResponse),

  put: (path, data) =>
    fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (path) =>
    fetch(`${API_BASE}${path}`, { 
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),
};

