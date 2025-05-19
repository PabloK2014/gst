import axios from 'axios'
import { Order } from '../types/order'

const API_URL = 'http://localhost:8000/api/v1'

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },

  async createOrder(orderData: {
    user_id: number
    product_id: number
    total_amount: number
    comment?: string
    phone: string
    name: string
  }): Promise<Order> {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  async getOrderById(id: number): Promise<Order> {
    try {
      const response = await axios.get(`${API_URL}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching order:', error)
      throw error
    }
  },
}
