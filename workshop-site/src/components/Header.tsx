import { Link } from 'react-router-dom'
import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { userService } from '../services/userService'
import OrderIcon from './OrderIcon'
const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (token) {
          const user = await userService.getCurrentUser()
          setIsAdmin(user.role === 'admin')
        }
      } catch (error) {
        setIsAdmin(false)
      }
    }

    checkAdminStatus()
  }, [])
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            ГСТ
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/orders"
              className="text-gray-300 hover:text-white flex items-center relative"
            >
              <OrderIcon />
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white flex items-center"
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </Link>
            )}
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
