import axios from 'axios';
import { useAdminStore } from './store/useAdminStore';
import process from 'process';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use((config) => {
  const token = useAdminStore.getState().token; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
