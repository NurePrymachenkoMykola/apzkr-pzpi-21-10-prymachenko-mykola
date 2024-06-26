'use client';

import React, {useState} from 'react';
import styles from '../styles/edit-profile-dialog.module.scss';
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ClassicButton} from "@shared/buttons/api";

const EditProfileDialog = ({name, surname, username, bio, cancel, apply}) => {
    const [editUser, setEditUser] = useState({
        name,
        surname,
        username,
        bio
    })
    return (
        <div className={styles.dialog}>
            <h1 className={styles.dialog__title}>Editing</h1>
            <div className={styles.dialog__block}>
                <ClassicInput
                    value={editUser.name}
                    setValue={(name) => setEditUser({...editUser, name})}
                >
                    Name
                </ClassicInput>
                <ClassicInput
                    value={editUser.surname}
                    setValue={(surname) => setEditUser({...editUser, surname})}
                >
                    Surname
                </ClassicInput>
                <ClassicInput
                    value={editUser.username}
                    setValue={(username) => setEditUser({...editUser, username})}
                >
                    Username
                </ClassicInput>
                <div className={styles.dialog__block_description}>
                    <h3>Bio</h3>
                    <ClassicTextArea
                        value={editUser.bio}
                        setValue={(bio) => setEditUser({...editUser, bio})}
                    >
                        Bio
                    </ClassicTextArea>
                </div>
            </div>
            <div className={styles.dialog__options}>
                <ClassicButton variant={'danger'} onClick={cancel}>Cancel</ClassicButton>
                <ClassicButton onClick={apply}>Apply</ClassicButton>
            </div>
        </div>
    );
};

export default EditProfileDialog;