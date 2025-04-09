import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Category, categoryService } from '../services/categoryService'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <aside className="w-64 bg-gray-800 p-4">
      <nav>
        <h2 className="text-lg font-semibold mb-4 text-white">
          Мастерские
        </h2>
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
