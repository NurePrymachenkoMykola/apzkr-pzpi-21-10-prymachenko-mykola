import React from 'react';
import styles from '../styles/timetable.module.scss';
import Month from "./Month";
import MonthsNav from "./MonthsNav";
import {ClubController} from "@controllers/club.controller";
let Months = [
    {title: 'August', month: 7},
    {title: 'September', month: 8},
    {title: 'October', month: 9},
    {title: 'November', month: 10},
    {title: 'December', month: 11},
    {title: 'January', month: 0},
    {title: 'February', month: 1},
    {title: 'March', month: 2},
    {title: 'April', month: 3},
    {title: 'May', month: 4},
]
async function getData() {
    const timetable = await ClubController.getTimetable({clubId: '650c6c7649cba9b624f22334'});
    const currentYear = new Date().getFullYear();
    Months = Months.map((month, ind) => {
        const games = timetable.games
            .filter(game => {
                const gameDate = new Date(game.date);
                return gameDate.getMonth() === month.month;
            })
            .map(game => {
                const gameDate = new Date(game.date);
                return {...game, date: gameDate, day: gameDate.getDate()};
            });

        if (ind < 5) {
            return {
                component: <Month key={month.title}
                                  title={month.title}
                                  month={month.month}
                                  year={currentYear}
                                  games={games}
                />,
                title: month.title,
                month: month.month
            }
        } else {
            return {
                component: <Month key={month.title}
                                  title={month.title}
                                  month={month.month}
                                  year={currentYear + 1}
                                  games={games}
                />,
                title: month.title,
                month: month.month
            }
        }
    });
    return {
        season: timetable.season,
        currentMonth: new Date().getMonth()
    };
}
const Timetable = async () => {
    const data = await getData();
    return (
        <div className={styles.timetable}>
            <h2 className={styles.timetable__title}>Timetable</h2>
            <h3 className={styles.timetable__season}>{data.season}</h3>
            <MonthsNav months={Months} currentMonth={data.currentMonth}>
            </MonthsNav>
        </div>
    );
};

export default Timetable;