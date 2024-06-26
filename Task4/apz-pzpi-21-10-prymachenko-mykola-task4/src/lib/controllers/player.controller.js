import $api from "../protocols";

export class PlayerController {
    static async getPositions() {
        try {
            const response = await $api.get('player/positions');
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
    static async signUp({name, surname, username, password,
                            email, number, position,
                            nation, birthday, description}) {
        try {
             const response = await $api.post('player', {
                 name,
                 surname,
                 username,
                 password,
                 email,
                 number: +number,
                 position,
                 nation,
                 birthday,
                 selfDescription: description
             });
            if (response.error) {
                return {
                    error: response.error
                };
            } else {
                return {};
            }
        } catch (e) {
            return {
                error:
                    e?.response?.data?.error ??
                    'Internal server error. Try again!',
                messages: e?.response?.data?.message,
            }
        }
    }
}