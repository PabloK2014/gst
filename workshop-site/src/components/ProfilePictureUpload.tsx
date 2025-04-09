import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            await axios.post('/api/users/upload-profile-picture', formData);
            // Обработка успешной загрузки
        } catch (error) {
            // Обработка ошибки
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Загрузить фото профиля</button>
        </div>
    );
};

export default ProfilePictureUpload;
