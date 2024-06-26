import $api from "../protocols";

export class TransferController {
    static async accept({directorUsername, memberUsername, role, id}) {
        try {
            const response = await $api.post(`transfer/accept`, {
                directorUsername,
                memberUsername,
                role,
                letterId: id,
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

    static async reject({directorUsername, memberUsername, role, id}) {
        try {
            const response = await $api.post(`transfer/reject`, {
                directorUsername,
                memberUsername,
                role,
                letterId: id,
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

    static async invite({sender, receiver}) {
        try {
            const response = await $api.post(`transfer/invitation`, {
                sender,
                receiver
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