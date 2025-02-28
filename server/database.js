const { Sequelize } = require('sequelize');
const path = require('path');
const { DATABASE } = require('./config');

const dbPath = path.resolve(__dirname, DATABASE.STORAGE);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false,
});

sequelize
    .authenticate()
    .then(() => console.log('Connected to database.'))
    .catch((err) => console.error('DB connection error:', err));

module.exports = sequelize;
