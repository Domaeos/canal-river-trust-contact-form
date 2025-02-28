const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { CORS_OPTIONS } = require('./config');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();
const buildPath = path.join(__dirname, '..', 'build');

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildPath));

app.use('/messages', messageRoutes);

app.use((err, req, res, next) => {
    const { status, message } = err;
    res.status(status ?? 500).json({
        message: message ?? 'Something went wrong, please try again later',
    });
});

app.listen(3030, () => {
    console.log('Server start at: http://localhost:3030/');
});
