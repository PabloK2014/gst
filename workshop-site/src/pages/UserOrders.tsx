import { useState, useEffect } from 'react'
import OrderDetails from '../components/OrderDetails'
import { userService } from '../services/userService'


interface Order {
  id: number
  product: {
    name: string
    description: string
    image: string
    price: number
  }
  status: string
  total_amount: number
  created_at: string
  comment: string
}

export default function UserOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const handleOrderDelete = () => {
    setOrders(orders.filter(order => order.id !== selectedOrderId))
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const currentUser = await userService.getCurrentUser();
        const token = localStorage.getItem('access_token');
        const response = await fetch(`https://backend-api-production-4c70.up.railway.app/api/v1/orders/user/${currentUser.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      <h1 className="text-3xl font-bold text-primary mb-6">Мои заказы</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-300 py-12">
          <p>У вас пока нет заказов</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => setSelectedOrderId(order.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Заказ #{order.id}
                    </h3>
                    <p className="text-gray-300">{order.product.name}</p>
                    <p className="text-gray-300">{order.comment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {order.total_amount} ₽
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </div>
                  <div
                    className={`mt-2 px-3 py-1 rounded-full text-white text-sm inline-block ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrderId && (
        <OrderDetails
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          onDelete={handleOrderDelete}
        />
      )}
    </div>
  )
}