const request = require('supertest');
const express = require('express');
const honeypotFilter = require('../middleware/honeypotFilter');

const app = express();
app.use(express.json());
app.post('/test', honeypotFilter, (req, res) => {
    res.status(200).json({ message: 'Success' });
});

describe('Honeypot Filter Middleware', () => {
    it('should allow requests without the honeypot field', async () => {
        const response = await request(app)
            .post('/test')
            .send({ validField: 'test' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Success' });
    });

    it('should block requests containing the honeypot field', async () => {
        const response = await request(app)
            .post('/test')
            .send({ _extra_field: 'bot' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid request' });
    });
});
