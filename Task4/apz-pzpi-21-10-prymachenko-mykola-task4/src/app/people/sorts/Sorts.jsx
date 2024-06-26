import React, {useState} from 'react';
import styles from '../styles/sorts.module.scss';
import {ClassicSelect} from "@shared/selects/api";

const SortItems = [
    'Name',
    'Surname',
    'Role'
];

const Sorts = () => {
    const [sortedItem, setSortedItem] = useState('');
    const [sortOrder, setSortOrder] = useState('descending');

    const setAscending = () => {
        setSortOrder('ascending');
    }

    const setDescending = () => {
        setSortOrder('descending');
    }
    return (
        <aside className={styles.sorts}>
            <div className={styles.sorts__inner}>
                <h3 className={styles.sorts__title}>Sorts</h3>
                <div className={styles.sorts__list}>
                    <ClassicSelect items={SortItems}
                                   label={'Sort by'}
                                   placeholder={'Sort by'}
                                   setSelectedItem={setSortedItem}
                    />
                    <div className={styles.sorts__order}>
                        <button className={`${styles.sorts__order_btn} ${sortOrder === 'ascending' ? styles.sorts__order_btn_active : ''}`}
                                onClick={setAscending}
                        >
                            <svg viewBox="0 0 24 24" fill="#fff" width={40} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>

                        <button className={`${styles.sorts__order_btn} ${sortOrder === 'descending' ? styles.sorts__order_btn_active : ''}`}
                                onClick={setDescending}
                        >
                            <svg viewBox="0 0 24 24" fill="#fff" width={40} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 17L3 14M6 17L9 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sorts;