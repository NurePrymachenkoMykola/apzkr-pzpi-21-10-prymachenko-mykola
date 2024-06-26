import React from 'react';
import styles from './logo.module.scss';
import Link from "next/link";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link href={'/home'}>
                <span className={styles.logo_text}><span>S</span>UL</span>
            </Link>
        </div>
    );
};

export default Logo;