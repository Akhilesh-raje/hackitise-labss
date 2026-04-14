import { useState, useEffect } from 'react';
import { api } from '../utils/api';

/**
 * Custom hook to fetch data from the API with a hardcoded fallback.
 * 
 * @param {string} endpoint - API path (e.g., '/blog')
 * @param {Array} fallbackData - Hardcoded data to use if API fails
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
export const useApiData = (endpoint, fallbackData = []) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        if (!cancelled && response.success && response.data?.length > 0) {
          setData(response.data);
        }
      } catch (err) {
        // Silently fall back to hardcoded data — no error shown to user
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
};
