const request = require('supertest');
const express = require('express');
const rateLimit = require('../middleware/contactRateLimiter');

const app = express();
app.use(express.json());
app.use(rateLimit);
app.post('/test', (req, res) => {
    res.status(200).json({ message: 'Success' });
});

describe('Rate Limiter Middleware', () => {
    it('should allow requests under the limit', async () => {
        for (let i = 0; i < 3; i++) {
            const response = await request(app)
                .post('/test')
                .send({ validField: 'test' });
            expect(response.status).toBe(200);
        }
    });

    it('should block requests exceeding the limit', async () => {
        for (let i = 0; i < 3; i++) {
            await request(app).post('/test').send({ validField: 'test' });
        }
        const response = await request(app)
            .post('/test')
            .send({ validField: 'test' });
        expect(response.status).toBe(429);
        expect(response.text).toContain(
            'Too many requests, please try again later.',
        );
    });
});
