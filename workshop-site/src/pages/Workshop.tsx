import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { workshopService, Category } from '../services/workshopService'
import { Product } from '../services/productService'
import { FaShoppingCart, FaTimes } from 'react-icons/fa'
import { userService } from '../services/userService'
import { orderService } from '../services/orderService'
import clsx from 'clsx'

const Workshop = () => {
  const { category } = useParams()
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState<Category | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  })

  useEffect(() => {
    const loadData = async () => {
      if (category) {
        setLoading(true)
        const [products, categoryInfo] = await Promise.all([
          workshopService.getProductsByCategory(category),
          workshopService.getCategoryByName(category)
        ])
        setProducts(products)
        setCategoryData(categoryInfo)
        setLoading(false)
      }
    }

    loadData()
  }, [category])



  const handleOrder = async (product: Product) => {
    setSelectedProduct(product)
    try {
      const user = await userService.getCurrentUser()
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || ''
      }))
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
    setShowOrderForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    try {
      const user = await userService.getCurrentUser()

      const orderData = {
        user_id: user.id,
        product_id: selectedProduct.id,
        total_amount: selectedProduct.price,
        comment: formData.comment,
        phone: formData.phone,
        name: formData.name,
      }

      const newOrder = await orderService.createOrder(orderData)
      console.log('Order created:', newOrder)
      setShowOrderForm(false)
      alert('Заказ успешно создан!')
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Ошибка при создании заказа. Попробуйте позже.')
    }
  }

  const getCategoryTitle = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'сварка':
        return 'Сварочные работы'
      case 'laboratory':
        return 'Лабораторные работы'
      case 'cooking':
        return 'Поварские работы'
      default:
        return 'Услуги'
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
    <div className="w-full h-full bg-gray-900">
      <div className="w-full h-full">
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-primary mb-6 capitalize">
            {categoryData?.name || 'Услуги'}
          </h1>

          {categoryData && categoryData.description && (
            <div className="mb-8">
              <p className="text-gray-300 text-lg">{categoryData.description}</p>
            </div>
          )}

          <div className="w-full h-px bg-gray-700 my-8" />

          {products.length === 0 ? (
            <div className="text-center text-gray-300 py-12">
              <p>В данной категории пока нет доступных услуг</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 mb-4 h-20">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">
                        от {product.price} ₽
                      </span>
                      <button
                        onClick={() => handleOrder(product)}
                        className="p-3 bg-secondary text-white rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center"
                        title="Добавить в корзину"
                      >
                        <FaShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showOrderForm && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-white">Оформление заказа</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="Введите ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Комментарий
                    </label>
                    <textarea
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                      rows={3}
                      placeholder="Дополнительная информация"
                      value={formData.comment}
                      onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Отправить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Workshop
