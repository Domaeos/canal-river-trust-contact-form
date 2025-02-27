import apiClient from "./apiClient";

export const sendMessage = async (state) => {
    try {
        const response = await apiClient.post("/messages/send", { ...state });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong. Try again later',
        };
    }
};