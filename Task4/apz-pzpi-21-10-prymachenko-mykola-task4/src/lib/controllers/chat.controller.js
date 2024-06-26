import $api from "../protocols";

export class ChatController {
    static async getChats(token) {
        try {
            const response = await $api.get(`chat`, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.error) {
                return {
                    error: response.error
                };
            } else {
                const positions = response.data;
                return positions;
            }
        } catch (e) {
            return {
                error:
                    e?.response?.data?.error ??
                    'Internal server error. Try again!',
            }
        }
    }

}