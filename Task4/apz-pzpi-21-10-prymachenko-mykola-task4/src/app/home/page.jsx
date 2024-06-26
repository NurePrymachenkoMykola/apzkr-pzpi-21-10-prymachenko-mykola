import React from 'react';
import styles from './styles/home.module.scss';
import Timetable from "./timetable/Timetable";

const Page = () => {
    return (
        <section className={styles.home}>
            <Timetable/>
        </section>
    );
};

export default Page;