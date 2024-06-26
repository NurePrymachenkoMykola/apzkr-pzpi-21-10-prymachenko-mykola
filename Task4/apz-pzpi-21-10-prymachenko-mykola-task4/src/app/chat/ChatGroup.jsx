import React from 'react';
import Image from "next/image";
import {DefaultAvatar} from "@shared/logos/api";
import styles from './styles/chat-group.module.scss';


const ChatGroup = ({title, id, avatar, active, setActive}) => {
    return (
        <div className={`${styles.chat} ${active ? styles.active : ''}`}
             onClick={() => setActive(id)}
        >
            <div className={styles.chat__avatar}>
                {avatar
                    ? <Image src={avatar} alt={''}/>
                    : <DefaultAvatar/>
                }
            </div>
            <div>
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default ChatGroup;