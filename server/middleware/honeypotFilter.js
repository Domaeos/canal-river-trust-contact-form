const honeypotFilter = (req, res, next) => {
    if (req.body._extra_field) {
        return res.status(400).json({ error: 'Invalid request' });
    }
    next();
};

module.exports = honeypotFilter;
