import { useState, useRef, useEffect } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    avatar: null as string | null,
  })
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState<string | null>(null) 
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const isLoggedIn = Boolean(localStorage.getItem('access_token'))

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login') 
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('access_token')
            navigate('/login')
            return
          }
          throw new Error('Не удалось загрузить данные')
        }
        
        const data = await response.json()
        setUser({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          avatar: data.avatar || null
        })
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await handleAvatarUpload(file)
      } catch (error) {
        setError('Ошибка при загрузке аватара')
      }
    }
  }

  const handleAvatarUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:8000/users/upload-profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Не удалось загрузить аватар')
      }

      const data = await response.json()
      if (data.avatar_url) {
        setUser(prev => ({ ...prev, avatar: data.avatar_url }))
        setError(null)
      } else {
        throw new Error('Не получен URL аватара')
      }
    } catch (error) {
      setError(`Ошибка загрузки аватара: ${(error as Error).message}`)
    }
  }

  const handleSave = async () => {
    try {
      setSaveStatus(null)
      const response = await fetch('http://localhost:8000/users/me', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name.trim(),
          phone: user.phone.trim(),
          email: user.email.trim()
        })
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
          return;
        }
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Не удалось сохранить изменения')
      }

      const data = await response.json()
      const userData = data.user
      const updatedUser = {
        name: userData.name || '',
        phone: userData.phone || '',
        email: userData.email || '',
        avatar: userData.avatar || null
      }
      setUser(updatedUser)
      // Обновляем токен в localStorage
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
      }
      setSaveStatus('Изменения успешно сохранены')
    } catch (error) {
      setSaveStatus(`Ошибка: ${(error as Error).message}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div className="w-full h-full bg-gray-900">
      <div className="w-full h-full">
        <div className="container mx-auto px-8 py-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-6">
              Личный кабинет
            </h1>
            
            {loading ? (
              <div className="text-white text-center">Загрузка...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div 
                    className="relative w-24 h-24 cursor-pointer group"
                    onClick={handleAvatarClick}
                  >
                    {user.avatar ? (
                      <img
                        src={`http://localhost:8000${user.avatar}?t=${Date.now()}`}
                        alt="Аватар пользователя"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="w-24 h-24 text-gray-400" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">Изменить</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      ФИО
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Телефон
                    </label>
                    <InputMask
                      mask="+7 (999) 999-99-99"
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <button 
                    onClick={handleSave} 
                    className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Сохранить изменения
                  </button>

                  {saveStatus && (
                    <div className={`text-center mt-2 ${saveStatus.includes('Ошибка') ? 'text-red-500' : 'text-green-500'}`}>
                      {saveStatus}
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors mt-4"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
