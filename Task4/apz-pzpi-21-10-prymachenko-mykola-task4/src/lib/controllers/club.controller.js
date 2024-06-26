import $api from "../protocols";

export class ClubController {
    static async getTimetable({clubId}) {
        try {
            const response = await $api.get(`club/${clubId}/timetable`);
            if (response.error) {
                return {
                    error: response.error
                };
            } else {
                const timetable = response.data;
                return timetable;
            }
        } catch (e) {
            return {
                error:
                    e?.response?.data?.error ??
                    'Internal server error. Try again!',
            }
        }
    }

    static async addGame({date, score, homeTeam, guestTeam, isTraining, clubId}) {
        try {
            const response = await $api.post(`club/game`, {
                date,
                score,
                homeTeam,
                guestTeam,
                clubId,
                isTraining
            });
            if (response.error) {

                return {
                    error: response.error
                };
            } else {
                return {};
            }
        } catch (e) {
            console.log(e);
            return {
                error:
                    e?.response?.data?.error ??
                    'Internal server error. Try again!',
                messages: e?.response?.data?.message
            }
        }
    }

    static async removeGame(id) {
        try {
            console.log(id);
            const response = await $api.delete(`club/game/${id}`);
            if (response.error) {
                return {
                    error: response.error
                };
            } else {
                return {};
            }
        } catch (e) {
            console.log(e);
            return {
                error:
                    e?.response?.data?.error ??
                    'Internal server error. Try again!',
                messages: e?.response?.data?.message
            }
        }
    }
}