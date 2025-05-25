import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { categoryContents } from '../types/categoryContent'
import clsx from 'clsx'

const Home = () => {
  const categories = Object.keys(categoryContents)
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const intervals: Record<string, NodeJS.Timeout> = {}

    categories.forEach(category => {
      intervals[category] = setInterval(() => {
        if (categoryContents[category]) {
          const images = categoryContents[category].images
          setCurrentImageIndices(prev => ({
            ...prev,
            [category]: ((prev[category] || 0) + 1) % images.length
          }))
        }
      }, 3000)
    })

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval))
    }
  }, [])

  const handlePrevImage = (category: string) => {
    if (categoryContents[category]) {
      const images = categoryContents[category].images
      setCurrentImageIndices(prev => ({
        ...prev,
        [category]: ((prev[category] || 0) - 1 + images.length) % images.length
      }))
    }
  }

  const handleNextImage = (category: string) => {
    if (categoryContents[category]) {
      const images = categoryContents[category].images
      setCurrentImageIndices(prev => ({
        ...prev,
        [category]: ((prev[category] || 0) + 1) % images.length
      }))
    }
  }

  const getCategoryTitle = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'сварка':
        return 'Сварочные работы'
      case 'поварское дело':
        return 'Поварское дело'
      case 'каменные работы':
        return 'Каменные работы'
      case 'столярные работы':
        return 'Столярные работы'
      case 'сантехнические работы':
        return 'Сантехнические работы'
      default:
        return 'Услуги'
    }
  }
  

  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="container mx-auto px-8 py-12">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-primary mb-6">
            Добро пожаловать в ГСТ
          </h1>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            О нашем техникуме
          </h2>
          <p className="text-gray-300 mb-4 text-lg">
            Гуковсикй строительный техникум (ГСТ) - это современное образовательное учреждение,
            где студенты получают качественное профессиональное образование в области строительства
            и смежных специальностей.
          </p>
          <p className="text-gray-300 text-lg">
            Наши мастерские оснащены современным оборудованием и предоставляют широкий спектр
            услуг как для обучения студентов, так и для выполнения заказов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Наши преимущества
            </h3>
            <ul className="space-y-4 text-lg text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                Современное оборудование
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                Опытные мастера
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                Доступные цены
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                Гарантия качества
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Как сделать заказ
            </h3>
            <ol className="space-y-4 text-lg text-gray-300">
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">1</span>
                Выберите категорию услуг
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">2</span>
                Ознакомьтесь с предложениями
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">3</span>
                Оставьте заявку
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center mr-3">4</span>
                Дождитесь подтверждения
              </li>
            </ol>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          Наши услуги
        </h2>

        <div className="space-y-24">
          {categories.map(category => (
            <div key={category} className="bg-gray-800 rounded-xl p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2 relative h-96 overflow-hidden rounded-xl shadow-xl">
                  {categoryContents[category].images.map((img, idx) => (
                    <img
                      key={img}
                      src={img}
                      alt={`${getCategoryTitle(category)} - Фото ${idx + 1}`}
                      className={clsx(
                        'absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out cursor-pointer',
                        {
                          'opacity-100 z-10': idx === (currentImageIndices[category] || 0),
                          'opacity-0 z-0': idx !== (currentImageIndices[category] || 0)
                        }
                      )}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                  <button
                    onClick={() => handlePrevImage(category)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full text-white z-20 transition-all hover:scale-110"
                  >
                    <FaChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => handleNextImage(category)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full text-white z-20 transition-all hover:scale-110"
                  >
                    <FaChevronRight size={24} />
                  </button>
                </div>

                <div className="lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-6">
                      {getCategoryTitle(category)}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      {categoryContents[category].description}
                    </p>
                  </div>
                  <Link
                    to={
                      category.toLowerCase() === 'сварка' ? '/welding-workshop' :
                      category.toLowerCase() === 'каменные работы' ? '/masonry-workshop' :
                      category.toLowerCase() === 'столярные работы' ? '/carpentry-workshop' :
                      category.toLowerCase() === 'сантехнические работы' ? '/plumbing-workshop' :
                      category.toLowerCase() === 'поварское дело' ? '/culinary-workshop' :
                      `/workshop/${category}`
                    }
                    className="inline-block bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors self-start"
                  >
                    Посмотреть примеры
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] mx-4">
              <img
                src={selectedImage}
                alt="Увеличенное изображение"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-white transition-all hover:scale-110"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
