const DATABASE = {
    STORAGE: './db/messages.db',
};

const CORS_OPTIONS = {
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
};

module.exports = {
    DATABASE,
    CORS_OPTIONS,
};
