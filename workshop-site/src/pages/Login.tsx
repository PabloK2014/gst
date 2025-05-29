import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userData = {
            email: email,
            password: password,
        };
        console.log("Отправка данных:", userData);
        try {
            const response = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.detail || 'Не удалось войти');
                return;
            }

            const data = await response.json();
            console.log(data)

            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                console.log("Токен сохранен в localStorage:", localStorage.getItem('access_token'));
            }

            console.log("Редирект на /profile");
            navigate('/profile');
        } catch (error) {
            setErrorMessage('Произошла ошибка при подключении');
            console.error("Ошибка при запросе:", error);
        }
    };

    return (
        <div className="login-container">
            <h1>Вход в аккаунт</h1>
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div>
                    <label>Электронная почта:</label>
                    <input
                        type="email"
                        className="input-field bg-gray-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        className="input-field bg-gray-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Войти</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button className="register-button" onClick={handleRegisterClick}>Нет аккаунта? Зарегистрируйтесь</button>
        </div>
    );
};

export default Login;
