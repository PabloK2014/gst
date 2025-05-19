import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css'; // Импорт стилей

const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/users/register', {
                email,
                password,
            });
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            alert("Ошибка при регистрации");
        }
    };

    return (
        <div className="registration-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit} className="registration-form">
                <div>
                    <label>Электронная почта:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field bg-gray-100"
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field bg-gray-100"
                        required
                    />
                </div>
                <div>
                    <label>Подтвердите пароль:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input-field bg-gray-100"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Зарегистрироваться</button>
            </form>
            <button className="login-button" onClick={handleLoginClick}>Уже есть аккаунт? Войдите</button>
        </div>
    );
};

export default Registration;
