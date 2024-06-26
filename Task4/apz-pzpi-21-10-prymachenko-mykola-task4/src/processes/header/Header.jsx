import React from 'react';
import styles from './header.module.scss';
import Logo from "@shared/logos/main/Logo";
import Link from "next/link";
import Menu from "./menu/Menu";
import MailboxHeader from "./mailbox/MailboxHeader";
import {useSelector} from "react-redux";
import {selectUsername} from "../../lib/store/selectors/user.selectors";

const Header = () => {
    const username = useSelector(selectUsername);
    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Logo/>
            </div>
            <nav className={styles.header__navbar}>
                <li className={styles.header__navbar_item}><Link href={'/home'}>Home</Link></li>
                <li className={styles.header__navbar_item}><Link href={'/people'}>People</Link></li>
                <li className={styles.header__navbar_item}><Link href={''}>Club</Link></li>
                <li className={styles.header__navbar_item}><Link href={'/contacts'}>Contact us</Link></li>
            </nav>
            <div className={styles.header__features}>
                <Link href={'/chat'} className={styles.header__features_letters}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.70911 17.0192L4.44911 13.5392C4.92911 12.5692 4.92911 11.4392 4.44911 10.4692L2.70911 6.97924C1.21911 3.99924 4.42911 0.849241 7.37911 2.40924L8.91911 3.22924C9.13911 3.33924 9.30911 3.51924 9.39911 3.73924L15.0891 16.3892C15.3191 16.9092 15.1091 17.5192 14.6091 17.7792L7.36911 21.5892C4.42911 23.1492 1.21911 19.9992 2.70911 17.0192Z" fill="#d9dbde"></path> <path d="M16.3093 15.6004L12.5793 7.32045C12.1593 6.39045 13.1593 5.45045 14.0593 5.93045L19.8293 8.97045C22.2793 10.2604 22.2793 13.7604 19.8293 15.0504L17.7893 16.1204C17.2393 16.4004 16.5693 16.1704 16.3093 15.6004Z" fill="#d9dbde"></path> </g></svg>
                </Link>
                <MailboxHeader username={username}/>
            </div>
            <div className={styles.header__profile_wrapper}>
                <Menu username={username}/>
            </div>
        </header>
    );
};

export default Header;