import axios from 'axios';
import { Order } from '../types/order';

const API_BASE_URL =  'http://185.178.47.86:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('Токен авторизации отсутствует');
  }
  return config;
});

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
      throw error;
    }
  },

  async createOrder(orderData: {
    user_id: number;
    product_id: number;
    total_amount: number;
    comment?: string;
    phone: string;
    name: string;
  }): Promise<Order> {
    try {
      console.log('Отправка заказа:', orderData);
      const response = await api.post('/orders', orderData);
      console.log('Заказ создан:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Ошибка создания заказа:', error.response?.data || error.message);
      throw error;
    }
  },

  async getOrderById(id: number): Promise<Order> {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка загрузки заказа:', error);
      throw error;
    }
  },
};