import { useState, useEffect } from 'react'
import OrderDetails from '../components/OrderDetails'

interface Order {
  id: number
  user: {
    name: string
    phone: string
  }
  product: {
    name: string
    description: string
    image: string
    price: number
  }
  status: string
  total_amount: number
  created_at: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchField, setSearchField] = useState<'id' | 'phone' | 'name'>('id')

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('access_token')
      let url = 'http://localhost:8000/api/v1/orders/all'
      if (searchQuery) {
        url += `?${searchField}=${encodeURIComponent(searchQuery)}`
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(`http://localhost:8000/api/v1/orders/${orderId}/status?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Server response:', data)
        const errorMessage = Array.isArray(data.detail)
          ? data.detail.join(', ')
          : data.detail || 'Ошибка при обновлении статуса заказа'
        throw new Error(errorMessage)
      }

      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus }
        }
        return order
      }))
    } catch (error) {
      console.error('Error updating order status:', error)
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Произошла неизвестная ошибка при обновлении статуса')
      }
    }
  }

  const handleSearch = () => {
    fetchOrders()
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchField('id')
    fetchOrders()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'
      case 'in_progress':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Управление заказами</h1>

      <div className="mb-6 flex gap-4">
        <select
          className="p-2 rounded bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value as 'id' | 'phone' | 'name')}
        >
          <option value="id">Номер заказа</option>
          <option value="phone">Телефон</option>
          <option value="name">ФИО</option>
        </select>
        <input
          type="text"
          placeholder="Поиск..."
          className="p-2 rounded bg-gray-700 border-gray-600 text-white flex-1 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
        >
          Поиск
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          onClick={clearSearch}
        >
          Очистить
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Клиент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Товар/Услуга
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Дата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Сумма
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-600 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(209,213,219)]">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[rgb(209,213,219)]">
                    {order.user.name}
                  </div>
                  <div className="text-sm text-[rgb(209,213,219)]">
                    {order.user.phone}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {order.product.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-300 truncate max-w-xs">
                    {order.product.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(order.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[rgb(209,213,219)]">
                  {order.total_amount} ₽
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    className="p-1 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">В обработке</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Выполнен</option>
                  </select>
                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="ml-2 text-primary hover:text-primary-dark"
                  >
                    Детали
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrderId && (
        <OrderDetails
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  )
}