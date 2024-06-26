import React from 'react';
import Person from "./Person";
import styles from '../styles/people-list.module.scss';

const PeopleList = ({people}) => {
    return (
        <div className={styles.peopleList}>
            <div className={styles.peopleList__inner}>
                <h1 className={styles.peopleList__title}>People</h1>
                <ul className={styles.peopleList__items}>
                    {people
                        ? people.map(member => <Person
                            key={member.username}
                            name={member.name}
                            surname={member.surname}
                            username={member.username}
                            selfDescription={member.selfDescription}
                            role={member.role}
                            birthday={member.birthday}
                        />)
                        : <h2>No members</h2>
                    }
                </ul>
            </div>
        </div>
    );
};

export default PeopleList;