import { useState } from 'react'
import axios from 'axios'

const ProfilePictureUpload = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('profilePicture', file)

    try {
      await axios.post('/api/users/upload-profile-picture', formData)
      console.log('Фото загружено успешно')
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить фото профиля</button>
    </div>
  )
}

export default ProfilePictureUpload
