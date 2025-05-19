import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Category, categoryService } from '../services/categoryService'

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories()
        if (Array.isArray(data)) {
          setCategories(data)
          setError(null)
        } else {
          setError('Ошибка: данные категорий имеют неверный формат')
          setCategories([])
        }
      } catch (error) {
        console.error('Error loading categories:', error)
        setError('Ошибка загрузки категорий')
        setCategories([])
      }
    }

    loadCategories()
  }, [])

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <nav>
        <h2 className="text-lg font-semibold mb-4 text-white">Мастерские</h2>
        {error && (
          <div className="text-red-400 text-sm mb-2">
            {error}
          </div>
        )}
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/workshop/${category.name.toLowerCase()}`}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 text-white"
              >
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
