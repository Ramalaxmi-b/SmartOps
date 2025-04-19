const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return res.json();
};

// src/services/api.js
export const fetchMetrics = async () => {
  const res = await fetch('http://localhost:5000/api/metrics');
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json();
};


export const createMetric = (metricData) =>
  fetch(`${API_BASE_URL}/metrics`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(metricData),
  }).then(handleResponse);

export const detectAnomaly = (metricData) =>
  fetch(`${API_BASE_URL}/anomaly/detect`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(metricData),
  }).then(handleResponse);

export const fetchSyntheticData = () =>
  fetch(`${API_BASE_URL}/anomaly/synthetic-data`, { headers: getAuthHeaders() })
    .then(handleResponse);

export const loginUser = (creds) =>
  fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  }).then(handleResponse);

export const registerUser = (userData) =>
  fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse);

