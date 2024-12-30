import { useParams } from 'react-router-dom'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const weldingProducts = [
  {
    id: 1,
    name: 'Ручная дуговая сварка',
    description: 'Профессиональная ручная дуговая сварка для различных металлоконструкций',
    price: 1500,
    image: '/manual welding/ruchnaya_svarka_v_processe.jpg'
  },
  {
    id: 2,
    name: 'Полуавтоматическая сварка',
    description: 'Качественная полуавтоматическая сварка с использованием современного оборудования',
    price: 2000,
    image: '/semi-automatic welding/from-semiautomatic-to-automatic-tips-for-selecting-a-welding-gun-1606762253.jpg'
  },
  {
    id: 3,
    name: 'Автоматическая сварка',
    description: 'Автоматическая сварка для сложных промышленных конструкций',
    price: 2500,
    image: '/automatic welding/images.jfif'
  }
]

const Workshop = () => {
  const { category } = useParams()
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const products = category === 'welding' ? weldingProducts : []

  const handleOrder = (product: Product) => {
    setSelectedProduct(product)
    setShowOrderForm(true)
  }

  return (
    <div className="w-full h-full bg-gray-900">
      <div className="w-full h-full">
        <div className="container mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-primary mb-6 capitalize">
            {category === 'welding' && 'Сварочные работы'}
            {category === 'laboratory' && 'Лабораторные работы'}
            {category === 'cooking' && 'Поварские работы'}
          </h1>

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
                      className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showOrderForm && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-white">Оформление заказа</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Комментарий
                    </label>
                    <textarea
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Отправить заявку
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
