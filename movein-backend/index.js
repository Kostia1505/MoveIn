const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const listings = require('./src/routes/listings');
const reviewRoutes = require('./src/routes/reviewRoutes');
const messageRoutes = require('./src/routes/messageRoutes');

// Імпортуємо моделі з асоціаціями
const { User, Listing, Review, Favorite, Message } = require('./src/models/associations');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Основний маршрут для перевірки
app.get('/', (req, res) => {
  console.log('GET / endpoint hit');
  res.send('Welcome to the MoveIn API');
});

// Простий тестовий маршрут
app.get('/test', (req, res) => {
  console.log('GET /test endpoint hit');
  res.send('Test route is working!');
});

// Маршрути для аутентифікації
app.use('/api/auth', authRoutes);
// Маршрути для оголошень
app.use('/api/listings', listings);
// Маршрут кабінету
app.use(userRoutes);
app.use('/api/reviews', reviewRoutes);
// Маршрути для чату
app.use('/api/messages', messageRoutes);

// Use normal sync to prevent data loss on restart
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));
  })
  .catch(error => console.error('Помилка синхронізації:', error));