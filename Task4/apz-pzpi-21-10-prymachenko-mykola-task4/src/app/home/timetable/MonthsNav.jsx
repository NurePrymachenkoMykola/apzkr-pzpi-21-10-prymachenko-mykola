'use client';

import React, {useState} from 'react';
import styles from '../styles/months-nav.module.scss';

const MonthsNav = ({ months, currentMonth}) => {
    const [activeMonth, setActiveMonth] = useState(months.find((month) => month.month === currentMonth));
    function setMonth(month) {
        if (month > 11) {
            month = 0;
        } else if (month < 0) {
            month = 11
        } else if (month < 7 && month > 4 && month > activeMonth.month) {
            month = 7
        } else if (month < 7 && month > 4 && month < activeMonth.month) {
            month = 4;
        }
        const newMonth = months.find((item) => item.month === month);
        setActiveMonth(newMonth);
    }
    return (
        <>
            <div className={styles.months__nav}>
                <button className={styles.months__nav__btn}
                        onClick={() => setMonth(activeMonth.month - 1)}
                >
                    <svg fill="#fff" height="50" width="50" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="-51.2 -51.2 614.40 614.40" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M505.728,347.563L413.845,256l91.883-91.563c6.101-6.08,7.957-15.275,4.651-23.253 C507.094,133.205,499.286,128,490.667,128H128c-5.675,0-11.115,2.24-15.104,6.272L6.229,241.323 C2.219,245.334,0,250.752,0,256.427c0,5.632,2.261,11.072,6.272,15.061l106.667,106.283C116.928,381.782,122.347,384,128,384 h362.667c8.619,0,16.427-5.205,19.712-13.184C513.686,362.837,511.83,353.643,505.728,347.563z"></path> </g> </g> </g></svg>
                </button>
                <h4 className={styles.month__title}>{activeMonth.title}</h4>
                <button className={styles.months__nav__btn}
                        onClick={() => setMonth(activeMonth.month + 1)}
                >
                    <svg fill="#fff" height="50" width="50" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="-51.2 -51.2 614.40 614.40" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M505.728,347.563L413.845,256l91.883-91.563c6.101-6.08,7.957-15.275,4.651-23.253 C507.094,133.205,499.286,128,490.667,128H128c-5.675,0-11.115,2.24-15.104,6.272L6.229,241.323 C2.219,245.334,0,250.752,0,256.427c0,5.632,2.261,11.072,6.272,15.061l106.667,106.283C116.928,381.782,122.347,384,128,384 h362.667c8.619,0,16.427-5.205,19.712-13.184C513.686,362.837,511.83,353.643,505.728,347.563z"></path> </g> </g> </g></svg>
                </button>
            </div>
            {activeMonth.component}
        </>
    );
};

export default MonthsNav;