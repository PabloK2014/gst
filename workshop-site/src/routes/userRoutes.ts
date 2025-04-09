import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// Регистрация пользователя
router.post('/register', (req, res) => {
    const { phoneNumber, firstName, lastName, email, password, role } = req.body;
    // Здесь будет логика для сохранения пользователя в базе данных
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
});

// Сброс пароля
router.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    // Здесь будет логика для сброса пароля
    res.status(200).json({ message: 'Пароль сброшен' });
});

export default router;
