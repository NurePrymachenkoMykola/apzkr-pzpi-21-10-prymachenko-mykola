import React from 'react';
import styles from './validation-error.module.scss';

const ValidationError = ({children, className}) => {
    return (
        <p className={`${styles.error} ${className}`}>{children}</p>
    );
};

export default ValidationError;