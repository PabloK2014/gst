import { Link } from 'react-router-dom'
import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            ГСТ
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/profile"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
