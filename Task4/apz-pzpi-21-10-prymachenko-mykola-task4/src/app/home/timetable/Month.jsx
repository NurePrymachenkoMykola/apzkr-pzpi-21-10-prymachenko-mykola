import React from 'react';
import Weekdays from "./Weekdays";
import Day from "./Day";
import * as uuid from 'uuid';
import styles from '../styles/month.module.scss';
async function getData(year, month) {
    const date = new Date(year, month + 1, 0);
    const days = date.getDate();
    date.setDate(1);

    let startWeekday = date.getDay();
    if (startWeekday === 0) {
        startWeekday = 6;
    } else {
        startWeekday--;
    }

    return {
        amountDays: days,
        startWeekday,
    };
}
const Month = async ({title, year, month, games}) => {
    const {amountDays, startWeekday} = await getData(year, month);

    const renderDays = () => {
        let renderedDaysAmount = startWeekday + amountDays <= 35 ? 35 : 42;
        let days = amountDays;
        const daysComponents = [...new Array(renderedDaysAmount)].map((day, ind) => {
            return <Day key={uuid.v4()}
                        month={month}
                        day={ind - startWeekday + 1}
                        isCurrentMonth={ind >= startWeekday && days-- >= 0}
                        event={games.find(game => game.day - 1 === ind - startWeekday)}/>
        })
        return daysComponents;
    }
    return (
        <div className={styles.month}>
            <Weekdays/>
            <ul className={styles.day__list}>
                {renderDays()}
            </ul>
        </div>
    );
};

export default Month;