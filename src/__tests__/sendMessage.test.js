import apiClient from '../api/apiClient';
import { sendMessage } from '../api/sendMessage';

jest.mock('../api/apiClient');

describe('sendMessage', () => {
    it('should return success when API call is successful', async () => {
        apiClient.post.mockResolvedValueOnce({ status: 201 });

        const response = await sendMessage({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        });

        expect(apiClient.post).toHaveBeenCalledWith('/messages/send', {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        });

        expect(response).toEqual({
            success: true,
            message: 'Message sent successfully',
        });
    });

    it('should return rate limit error message when API responds with 429', async () => {
        apiClient.post.mockRejectedValueOnce({ status: 429 });

        const response = await sendMessage({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        });

        expect(response).toEqual({
            success: false,
            message: 'You are doing this too often, please try again later',
        });
    });

    it('should return generic error message for other API failures', async () => {
        apiClient.post.mockRejectedValueOnce({ status: 500 });

        const response = await sendMessage({
            name: 'Jane Doe',
            email: 'jane@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
        });

        expect(response).toEqual({
            success: false,
            message: 'Something went wrong, try again later',
        });
    });
});
