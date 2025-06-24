import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css'; 

const Registration = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConsentChecked, setIsConsentChecked] = useState(false); 

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsConsentChecked(e.target.checked); 
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isConsentChecked) {
            alert("Необходимо дать согласие на обработку персональных данных");
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            const response = await axios.post('http://185.178.47.86:8000/users/register', {
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
                <div className="consent-checkbox">
                    <input
                        type="checkbox"
                        id="consent"
                        checked={isConsentChecked}
                        onChange={handleConsentChange}
                    />
                    <label htmlFor="consent">
                        Даю согласие на обработку персональных данных и соглашаюсь с{' '}
                        <a href="/privacy-policy" target="_blank" className="privacy-link">
                            политикой конфиденциальности
                        </a>
                    </label>
                </div>
            </form>
            <button className="login-button" onClick={handleLoginClick}>Уже есть аккаунт? Войдите</button>
        </div>
    );
};

export default Registration;