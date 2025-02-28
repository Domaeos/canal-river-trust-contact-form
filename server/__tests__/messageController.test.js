// server/__tests__/messageController.test.js
const { sendMessage } = require('../controllers/messageController');
const Message = require('../models/Message');

jest.mock('../models/Message', () => ({
    create: jest.fn(),
}));

describe('Message Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                subject: 'Test Subject',
                message: 'Test message content',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();

        jest.clearAllMocks();
    });

    test('should create a new message with valid input', async () => {
        const mockMessage = {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'Test message content',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        Message.create.mockResolvedValue(mockMessage);

        await sendMessage(req, res, next);

        expect(Message.create).toHaveBeenCalledWith({
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'Test message content',
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockMessage);
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 when name is missing', async () => {
        req.body.name = '';

        await sendMessage(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'All fields are required.',
        });
        expect(Message.create).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 when email is missing', async () => {
        req.body.email = '';

        await sendMessage(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'All fields are required.',
        });
        expect(Message.create).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 when subject is missing', async () => {
        req.body.subject = '';

        await sendMessage(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'All fields are required.',
        });
        expect(Message.create).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 when message is missing', async () => {
        req.body.message = '';

        await sendMessage(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'All fields are required.',
        });
        expect(Message.create).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should call next with error when database operation fails', async () => {
        const dbError = new Error('Database connection failed');
        Message.create.mockRejectedValue(dbError);

        await sendMessage(req, res, next);

        expect(next).toHaveBeenCalledWith(dbError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
