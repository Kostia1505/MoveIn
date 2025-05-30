const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Use a direct connection configuration with current user
const sequelize = new Sequelize('movein_db', process.env.USER || 'maksympushkash', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: console.log // Turn on logging to see SQL queries
});

// Test connection on startup
sequelize.authenticate()
  .then(() => console.log('Database connection established successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
