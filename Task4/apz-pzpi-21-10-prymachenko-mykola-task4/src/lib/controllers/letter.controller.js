import $api from "../protocols";

export class LetterController {
    static async find(receiverUsername) {
        try {
            const response = await $api.get(`letter/${receiverUsername}`, {
                withCredentials: true
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

    static async delete(id) {
        try {
            const response = await $api.delete(`letter/${id}`, {
                withCredentials: true
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

    static async toggleStatus(letterId, status) {
        try {
            const response = await $api.patch(`letter/status/${letterId}`, {
                status
            }, {
                withCredentials: true
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