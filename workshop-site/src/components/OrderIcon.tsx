import { useState, useEffect } from 'react'
import {ShoppingBagIcon } from '@heroicons/react/24/outline'
import { userService } from '../services/userService'

interface Order {
  id: number
  status: string
  total_amount: number
  created_at: string
}

export default function OrderIcon() {
  const [ordersCount, setOrdersCount] = useState<number>(0)

  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const currentUser = await userService.getCurrentUser()
        const response = await fetch(`http://localhost:8000/api/v1/orders/user/${currentUser.id}`)
        const orders: Order[] = await response.json()
        setOrdersCount(orders.length)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrdersCount(0)
      }
    }

    fetchOrdersCount()
  }, [])

  return (
    <div className="relative">
      <ShoppingBagIcon className="h-6 w-6" />
      {ordersCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {ordersCount}
        </span>
      )}
    </div>
  )
}
