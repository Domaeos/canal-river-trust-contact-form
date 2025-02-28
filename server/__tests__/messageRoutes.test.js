const request = require('supertest');
const express = require('express');
const messageRoutes = require('../routes/messageRoutes');

const sequelize = require('../database');

const app = express();
app.use(express.json());
app.use('/messages', messageRoutes);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

describe('Message Routes', () => {
    it('should successfully send a message and return the saved message', async () => {
        const testMessage = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        };

        const response = await request(app)
            .post('/messages/send')
            .send(testMessage);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(testMessage.name);
        expect(response.body.email).toBe(testMessage.email);
        expect(response.body.subject).toBe(testMessage.subject);
        expect(response.body.message).toBe(testMessage.message);
    });

    it('should block a request with a honeypot field', async () => {
        const response = await request(app).post('/messages/send').send({
            _extra_field: 'bot',
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid request' });
    });

    it('should enforce rate limiting on excessive requests', async () => {
        const testMessage = {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        };

        for (let i = 0; i < 3; i++) {
            await request(app).post('/messages/send').send(testMessage);
        }

        const response = await request(app)
            .post('/messages/send')
            .send(testMessage);

        expect(response.status).toBe(429);
        expect(response.text).toContain(
            'Too many requests, please try again later.',
        );
    });
});
