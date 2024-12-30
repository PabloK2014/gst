import { Link } from 'react-router-dom'
import { WrenchScrewdriverIcon, BeakerIcon, CakeIcon } from '@heroicons/react/24/outline'

const categories = [
  { name: 'Сварочные работы', icon: WrenchScrewdriverIcon, path: 'welding' },
  { name: 'Лабораторные', icon: BeakerIcon, path: 'laboratory' },
  { name: 'Поварские', icon: CakeIcon, path: 'cooking' },
]

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 p-4">
      <nav>
        <h2 className="text-lg font-semibold mb-4 text-white">
          Мастерские
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.path}>
              <Link
                to={`/workshop/${category.path}`}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 text-white"
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
