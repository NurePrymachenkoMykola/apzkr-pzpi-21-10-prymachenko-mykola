'use client';

import React from 'react';
import styles from './auth-button.module.scss';
import {AuthTypes} from "../../../../lib/enums/auth";
const AuthButton = ({children, onClick, authType}) => {
    return (
        authType === AuthTypes.SIGN_IN
        ? <button className={`${styles.authButton} ${styles.authButton_signIn}`}
                  onClick={onClick}
            >Sign in</button>
        : <button className={`${styles.authButton} ${styles.authButton_signUp}`}
                  onClick={onClick}
            >Sign up</button>
    );
};

export default AuthButton;