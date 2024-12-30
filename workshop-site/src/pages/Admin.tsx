import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Сварка металлоконструкций',
      description: 'Профессиональная сварка металлоконструкций любой сложности',
      price: 1500,
      category: 'welding',
      image: '/images/welding.jpg',
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowAddForm(true)
  }

  return (
    <div className="w-full h-full bg-gray-900 p-8 relative">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Панель администратора
      </h1>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Цена
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.image}
                      alt=""
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-100">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.price} ₽
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-400 hover:text-blue-300 mr-4"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-8 right-8 p-4 bg-secondary text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
      >
        <PlusIcon className="h-6 w-6" />
      </button>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  defaultValue={editingProduct?.name}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Описание
                </label>
                <textarea
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  defaultValue={editingProduct?.description}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Цена
                </label>
                <input
                  type="number"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  defaultValue={editingProduct?.price}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Категория
                </label>
                <select
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  defaultValue={editingProduct?.category}
                  required
                >
                  <option value="welding">Сварочные работы</option>
                  <option value="laboratory">Лабораторные работы</option>
                  <option value="cooking">Поварские работы</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Изображение
                </label>
                <input
                  type="file"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-orange-600"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingProduct(null)
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {editingProduct ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
