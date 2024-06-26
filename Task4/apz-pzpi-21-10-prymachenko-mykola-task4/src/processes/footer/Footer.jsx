import React, {useEffect, useRef} from 'react';
import Logo from "@shared/logos/main/Logo";
import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__leftBlock}>
                <Logo/>
                <nav className={styles.footer__nav}>
                    <li className={styles.footer__nav_item}>Privacy</li>
                    <li className={styles.footer__nav_item}>Policy</li>
                </nav>
            </div>
            <div className={styles.footer__rightBlock}>
                <p className={styles.footer__caption}>
                    © 2023 <span className={styles.footer__caption_title}>Soul</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;