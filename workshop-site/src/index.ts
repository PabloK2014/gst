import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
