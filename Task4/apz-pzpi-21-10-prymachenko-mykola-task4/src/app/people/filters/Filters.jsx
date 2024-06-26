'use client';

import React, {useState} from 'react';
import styles from '../styles/filters.module.scss';
import {ClassicInput} from "@shared/inputs/api";
import {ClassicSelect} from "@shared/selects/api";
import {UserTypesArray} from "@enums/auth";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
const Filters = ({}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');

    const find = async () => {

    }

    const clear = async () => {

    }

    return (
        <aside className={styles.filters}>
            <div className={styles.filters__inner}>
                <h3 className={styles.filters__title}>Filters</h3>
                <div className={styles.filters__list}>
                    <ClassicInput
                        value={name}
                        setValue={setName}
                    >
                        Name
                    </ClassicInput>
                    <ClassicInput
                        value={surname}
                        setValue={setSurname}
                    >
                        Surname
                    </ClassicInput>
                    <ClassicSelect items={UserTypesArray}
                                   label={'Role'}
                                   placeholder={'Role'}
                                   setSelectedItem={setRole}
                    />
                </div>
                <div className={styles.filters__options}>
                    <ClassicButton onClick={find}>Find</ClassicButton>
                    <ClassicButton variant={'danger'} onClick={clear}>Clear</ClassicButton>
                </div>
            </div>
        </aside>
    );
};

export default Filters;