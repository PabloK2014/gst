import { useState, useEffect } from 'react'
import { Order } from '../types/order'

interface OrderDetailsProps {
  orderId: number
  onClose: () => void
  onDelete?: () => void
}

export default function OrderDetails({ orderId, onClose, onDelete }: OrderDetailsProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await fetch(`https://backend-api-production-4c70.up.railway.app/api/v1/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      return
    }

    try {
      setDeleting(true)
      const token = localStorage.getItem('access_token')
      const response = await fetch(`https://backend-api-production-4c70.up.railway.app/api/v1/orders/${orderId}/delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      onDelete?.();
      onClose();
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Ошибка при удалении заказа')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Заказ #{order.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={order.product.image}
              alt={order.product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              {order.product.name}
            </h3>
            <p className="text-gray-300">Комментарий: {order.comment || '—'}</p>
          </div>

          <div className="flex justify-between items-center text-white">
            <span>Статус:</span>
            <span className={`px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="flex justify-between items-center text-white">
            <span>Дата заказа:</span>
            <span>{new Date(order.created_at).toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-white">
            <span>Сумма заказа:</span>
            <span className="text-xl font-bold text-primary">
              {order.total_amount} ₽
            </span>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? 'Удаление...' : 'Удалить заказ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 text-white'
    case 'in_progress':
      return 'bg-blue-500 text-white'
    case 'completed':
      return 'bg-green-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'В обработке'
    case 'in_progress':
      return 'В работе'
    case 'completed':
      return 'Выполнен'
    default:
      return status
  }
}