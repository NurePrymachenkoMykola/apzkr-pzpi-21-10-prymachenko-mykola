import React from 'react';
import styles from '../styles/weekdays.module.scss';

const Weekdays = () => {
    return (
        <ul className={styles.weekday__list}>
            <li className={styles.weekday}>Mon</li>
            <li className={styles.weekday}>Tues</li>
            <li className={styles.weekday}>Wed</li>
            <li className={styles.weekday}>Thurs</li>
            <li className={styles.weekday}>Fri</li>
            <li className={styles.weekday}>Sat</li>
            <li className={styles.weekday}>Sun</li>
        </ul>
    );
};

export default Weekdays;