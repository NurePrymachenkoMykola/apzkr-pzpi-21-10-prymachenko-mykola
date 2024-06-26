import $api from "../protocols";

export class DirectorController {
    static async signUp({name, surname, username, password,
                            email, description,
                            nation, birthday}) {
        try {
            const response = await $api.post('director', {
                name,
                surname,
                username,
                password,
                email,
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
            }
        }
    }
}