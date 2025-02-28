import apiClient from './apiClient';

export const sendMessage = async (state) => {
    try {
        await apiClient.post('/messages/send', { ...state });
        return { success: true, message: 'Message sent successfully' };
    } catch (error) {
        const message =
            error.status === 429
                ? 'You are doing this too often, please try again later'
                : 'Something went wrong, try again later';

        return {
            success: false,
            message,
        };
    }
};
