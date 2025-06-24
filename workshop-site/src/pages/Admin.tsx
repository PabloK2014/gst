import { useState, useEffect, useRef } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { CategoryManager } from '../components/Categories/CategoryManager'
import { UserManager } from '../components/Users/UserManager'
import AdminOrders from './AdminOrders'
import { categoryService, Category } from '../services/categoryService'
import { productService, Product, ProductCreate } from '../services/productService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'users' | 'orders'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [expandedPriceText, setExpandedPriceText] = useState<{ [key: number]: boolean }>({})
  const [imageSrc, setImageSrc] = useState<string | null>(null) // Исходное изображение для обрезки
  const [showCropper, setShowCropper] = useState(false) // Показать модальное окно обрезки
  const cropperRef = useRef<ReactCropperElement>(null) // Ссылка на Cropper

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.category-dropdown-container')) {
        setShowCategoryDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories()
      setCategories(data)
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error)
    }
  }

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
          setSelectedFile(croppedFile);
          setShowCropper(false);
          setImageSrc(null);
        }
      }, 'image/jpeg', 1);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    setSelectedFile(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const productData: Omit<ProductCreate, 'image'> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      category_id: Number(formData.get('category')),
      custom_price_text: (formData.get('custom_price_text') as string) || null,
    };

    if (editingProduct) {
      await productService.updateProduct(editingProduct.id, productData, selectedFile || undefined);
      toast.success('Товар успешно обновлен');
    } else {
      await productService.createProduct(productData, selectedFile || undefined);
      toast.success('Товар успешно создан');
    }

    await loadProducts();
    setShowAddForm(false);
    setSelectedFile(null);
    setEditingProduct(null);
    form.reset();
  } catch (error) {
    console.error('Ошибка при сохранении товара:', error);
    toast.error('Ошибка при сохранении товара');
  }
  }

  const handleDeleteClick = (product: Product) => {
    setDeleteConfirmProduct(product)
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmProduct) {
      try {
        await productService.deleteProduct(deleteConfirmProduct.id)
        setProducts(products.filter(product => product.id !== deleteConfirmProduct.id))
        toast.success(`Товар ${deleteConfirmProduct.name} был удален`)
        setDeleteConfirmProduct(null)
      } catch (error) {
        console.error('Ошибка при удалении товара:', error)
        toast.error('Ошибка при удалении товара')
      }
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowAddForm(true)
  }

  const togglePriceText = (productId: number) => {
    setExpandedPriceText(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }

  const renderPrice = (product: Product) => {
    if (product.custom_price_text) {
      const isExpanded = expandedPriceText[product.id] || false
      const isLongText = product.custom_price_text.length > 100
      return (
        <div className="flex flex-col">
          <span
            className={`text-sm text-gray-300 ${isExpanded || !isLongText ? '' : 'line-clamp-2'}`}
            title={product.custom_price_text}
          >
            {product.custom_price_text}
          </span>
          {isLongText && (
            <button
              onClick={() => togglePriceText(product.id)}
              className="text-xs text-blue-400 hover:text-blue-300 mt-1 focus:outline-none"
            >
              {isExpanded ? 'Свернуть' : 'Показать больше'}
            </button>
          )}
        </div>
      )
    }
    return <span>{product.price} ₽</span>
  }

  const filteredProducts = selectedCategory === null
    ? products
    : selectedCategory === -1
    ? products.filter(product => !product.category_id)
    : products.filter(product => product.category_id === selectedCategory)

  return (
    <div className="w-full min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Панель администратора
        </h1>

        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Товары
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'categories'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              Категории
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Пользователи
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Заказы
            </button>
          </div>
        </div>

        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'products' ? (
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700 table-fixed">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-2/5">
                    Название
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/5 relative category-dropdown-container">
                    <div className="flex items-center">
                      <span>Категория</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }}
                        className="ml-1 text-gray-300 hover:text-white focus:outline-none bg-transparent"
                      >
                        <svg
                          className={`h-4 w-4 transform transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {selectedCategory !== null && (
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="ml-2 text-xs text-blue-400 hover:text-blue-300"
                        >
                          (Сбросить)
                        </button>
                      )}
                    </div>
                    {showCategoryDropdown && (
                      <div className="absolute z-10 top-full left-0 mt-1 w-48 rounded-lg shadow-lg overflow-hidden bg-gray-700">
                        <div
                          className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-gray-300"
                          onClick={() => {
                            setSelectedCategory(-1)
                            setShowCategoryDropdown(false)
                          }}
                        >
                          Без категории
                        </div>
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-gray-300"
                            onClick={() => {
                              setSelectedCategory(category.id || null)
                              setShowCategoryDropdown(false)
                            }}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/5">
                    Цена
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/5">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={`http://185.178.47.86:8000${product.image}?t=${Date.now()}`}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-100">
                        {categories.find(cat => cat.id === product.category_id)?.name || 'Без категории'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {renderPrice(product)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-400 hover:text-blue-300 mr-4"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => setShowAddForm(true)}
              className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-6 w-6" />
            </button>

            {showAddForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Название
                      </label>
                      <input
                        type="text"
                        name="name"
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
                        name="description"
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
                        name="price"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        defaultValue={editingProduct?.price}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Текст цены (опционально)
                      </label>
                      <textarea
                        name="custom_price_text"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        rows={3}
                        defaultValue={editingProduct?.custom_price_text || ''}
                        placeholder="Например: Цены зависят от размера и материала"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Категория
                      </label>
                      <select
                        name="category"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        defaultValue={editingProduct?.category_id}
                        required
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Изображение
                      </label>
                      <input
                        type="file"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {selectedFile && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-300">Выбрано изображение: {selectedFile.name}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false)
                          setEditingProduct(null)
                          setSelectedFile(null)
                          setImageSrc(null)
                        }}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                      >
                        Отмена
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {editingProduct ? 'Сохранить' : 'Добавить'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showCropper && imageSrc && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
                  <h2 className="text-xl font-bold mb-4 text-white">Обрезка изображения</h2>
                  <div className="mb-4">
                    <Cropper
                      ref={cropperRef}
                      src={imageSrc}
                      style={{ height: 400, width: '100%' }}
                      aspectRatio={1} // Квадратное соотношение сторон (можно изменить, например, 16/9)
                      guides={true}
                      zoomable={true}
                      scalable={true}
                      cropBoxResizable={true}
                      dragMode="move"
                      initialAspectRatio={1}
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={handleCropCancel}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleCrop}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Обрезать и сохранить
                    </button>
                  </div>
                </div>
              </div>
            )}

            {deleteConfirmProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Подтверждение удаления
                  </h2>
                  <div className="flex items-center mb-4">
                    <img
                      src={`http://185.178.47.86:8000${deleteConfirmProduct.image}?t=${Date.now()}`}
                      alt={deleteConfirmProduct.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <p className="text-white">
                      Вы действительно хотите удалить товар {deleteConfirmProduct.name}?
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setDeleteConfirmProduct(null)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Нет
                    </button>
                    <button
                      onClick={handleDeleteConfirm}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Да
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'categories' ? (
          <CategoryManager />
        ) : activeTab === 'users' ? (
          <UserManager />
        ) : null}
      </div>
    </div>
  )
}

export default Admin