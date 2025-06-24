import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaTools, FaUtensils, FaCube, FaTree, FaBars, FaHome } from 'react-icons/fa';
import { Category, categoryService } from '../services/categoryService';

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        if (Array.isArray(data)) {
          setCategories(data);
          setError(null);
        } else {
          setError('Ошибка: данные категорий имеют неверный формат');
          setCategories([]);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
        setError('Ошибка загрузки категорий');
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const header = document.querySelector('header.bg-gray-800');
    if (!header) {
      console.warn('Шапка сайта не найдена. Проверьте селектор header.bg-gray-800');
      setIsHeaderVisible(false); // Показываем кнопку, если шапка не найдена
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
        console.log('Header visibility:', entry.isIntersecting); // Для отладки
      },
      { threshold: 0.01, rootMargin: '0px' } // Уменьшенный порог и нулевой отступ
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const workshopCategories = [
    { name: 'Сварочные работы', icon: FaTools, route: 'welding-workshop' },
    { name: 'Поварское дело', icon: FaUtensils, route: 'culinary-workshop' },
    { name: 'Каменные работы', icon: FaCube, route: 'masonry-workshop' },
    { name: 'Столярные работы', icon: FaTree, route: 'carpentry-workshop' }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-gray-800 p-4 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <nav className="flex-1">
        <div className="sticky top-4">
          <button 
            onClick={toggleSidebar}
            className="flex items-center space-x-2 p-2 mb-4 text-white rounded-lg hover:bg-gray-700 focus:outline-none w-full"
          >
            <FaBars className="w-5 h-5 flex-shrink-0" />
            <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Свернуть</span>
          </button>

          {!isHeaderVisible && (
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 mb-4 text-white rounded-lg hover:bg-gray-700 focus:outline-none w-full"
            >
              <FaHome className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-2'}`} />
              <span className={`${isCollapsed ? 'hidden' : 'block'}`}>На главную</span>
            </Link>
          )}

          <h2 className={`text-lg font-semibold mb-4 text-white ${isCollapsed ? 'hidden' : 'block'}`}>Мастерские</h2>
          <ul className="space-y-2 mb-6">
            {workshopCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <li key={`workshop-${index}`}>
                  <Link
                    to={`/${category.route}`}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 text-white"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <h2 className={`text-lg font-semibold mb-4 text-white ${isCollapsed ? 'hidden' : 'block'}`}>Продукция</h2>
          {error && !isCollapsed && (
            <div className="text-red-400 text-sm mb-2">{error}</div>
          )}
          <ul className="space-y-2 mb-6">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/workshop/${category.name.toLowerCase()}`}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 text-white"
                >
                  <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="sticky bottom-4 mt-auto">
        <Link
          to="/admission"
          className="flex items-center space-x-2 p-2 mb-4 text-white rounded-lg hover:bg-gray-700 focus:outline-none w-full"
        >
          <FaGraduationCap className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Для поступления</span>
        </Link>
        <Link
          to="/dop"
          className="flex items-center space-x-2 p-2 mb-4 text-white rounded-lg hover:bg-gray-700 focus:outline-none w-full"
        >
          <FaBook className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} />
          <span className={`${isCollapsed ? 'hidden' : 'block'}`}>Доп. образование</span>
        </Link>
      </div>
    </aside>
  );
}