import $api from "../protocols";

export class TrainerController {
    static async signUp({name, surname, username, password,
                            email, experience, description,
                            nation, birthday}) {
        try {
            const response = await $api.post('trainer', {
                name,
                surname,
                username,
                password,
                email,
                experience: +experience,
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