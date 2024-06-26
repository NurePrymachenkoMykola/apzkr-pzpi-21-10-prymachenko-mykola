'use client';

import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
import styles from './classic-dialog.module.scss';
import MainTheme from "../../../processes/theme/MainTheme";

const ClassicDialog = ({onClick, zIndex, children}) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'scroll';
        }
    }, []);
    console.log(document);

    return (
        createPortal(
            <MainTheme zIndex={zIndex}>
                <div
                    className={styles.dialog}
                >
                    <div
                        onClick={onClick}
                        className={styles.background}
                    ></div>
                    <div className={styles.dialog__content}>
                        {children}
                    </div>
                </div>
            </MainTheme>, document.body)
    );
};

export default ClassicDialog;