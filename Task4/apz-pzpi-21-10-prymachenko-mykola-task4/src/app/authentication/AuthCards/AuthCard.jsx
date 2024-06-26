import React from 'react';
import AuthButton from "./buttons/AuthButton";
import styles from '../styles/auth-card.module.scss';
import {AuthTypes} from "@enums/auth";

const AuthCard = ({
                      icon,
                      title,
                      onSignIn,
                      onSignUp,
                      bgColor,
                  }) => {
    return (
        <div
            className={styles.authCard}
            style={{
                background: bgColor
            }}
        >
            <div className={styles.authCard__inner}>
                <div className={styles.authCard__icon}>
                    {icon}
                </div>
                <h3 className={styles.authCard__title}>
                    {title}
                </h3>
                <div className={styles.authCard__buttons}>
                    <AuthButton onClick={onSignIn}
                                authType={AuthTypes.SIGN_IN}
                    >Sign in</AuthButton>
                    <AuthButton onClick={onSignUp}
                                authType={AuthTypes.SIGN_UP}
                    >Sign up</AuthButton>
                </div>
            </div>
        </div>
    );
};

export default AuthCard;