const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    handler: (req, res, next) => {
        const err = new Error('Too many requests, please try again later.');
        err.status = 429;
        next(err);
    },
});

module.exports = limiter;
