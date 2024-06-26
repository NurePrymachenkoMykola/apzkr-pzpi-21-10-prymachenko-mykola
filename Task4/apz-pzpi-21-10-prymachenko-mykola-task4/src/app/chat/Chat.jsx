'use client';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles/chat.module.scss';
import Image from "next/image";
import {DefaultAvatar} from "@shared/logos/api";
import {useSelector} from "react-redux";
import {selectChat} from "../../lib/store/selectors/chat.selectors";
import Message from "./Message";
import {ClassicInput} from "@shared/inputs/api";
import {ClassicButton} from "@shared/buttons/api";
import {selectUsername} from "../../lib/store/selectors/user.selectors";
import {socket} from "../../lib/protocols/socket";

const Chat = () => {
    const chat = useSelector(selectChat);
    const username = useSelector(selectUsername);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const onMessage = useCallback((message) => {
        setMessages(prev => [...prev, message]);
    }, []);

    useEffect(() => {
        setMessages(chat.messages);
        console.log(chat);
    }, [chat.messages])

    useEffect(() => {

        socket.on('rec-message', onMessage);
        return () => {
            socket.off('rec-message', onMessage);
        }
    }, [onMessage]);
    const sendMessage = async () => {
        socket.timeout(5000).emit('message', {
            chat: chat.id,
            from: username,
            text: message
        })
    }
    return (
        <div className={styles.chat}>
            <div className={styles.chat__header}>
                <div className={styles.chat__avatar}>
                    {chat.avatar
                        ? <Image src={chat.avatar} alt={''}/>
                        : <DefaultAvatar/>
                    }
                </div>
                <div>
                    <h3>{chat.title}</h3>
                </div>
            </div>
            <div className={styles.chat__messages}>
                {chat.messages.map(message => <Message key={message.id} {...message}/>)}
            </div>
            <div className={styles.chat__texting}>
                <ClassicInput placeholder={'Message...'}
                              value={message}
                              setValue={setMessage}
                              inputStyle={{
                                  borderRadius: '0px',
                              }}
                ></ClassicInput>
                <div>
                    <ClassicButton py={7}
                                   style={{
                                       borderRadius: '0px',
                                   }}
                                   onClick={sendMessage}
                    >
                        <svg width={40} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.70911 17.0192L4.44911 13.5392C4.92911 12.5692 4.92911 11.4392 4.44911 10.4692L2.70911 6.97924C1.21911 3.99924 4.42911 0.849241 7.37911 2.40924L8.91911 3.22924C9.13911 3.33924 9.30911 3.51924 9.39911 3.73924L15.0891 16.3892C15.3191 16.9092 15.1091 17.5192 14.6091 17.7792L7.36911 21.5892C4.42911 23.1492 1.21911 19.9992 2.70911 17.0192Z" fill="#d9dbde"></path> <path d="M16.3093 15.6004L12.5793 7.32045C12.1593 6.39045 13.1593 5.45045 14.0593 5.93045L19.8293 8.97045C22.2793 10.2604 22.2793 13.7604 19.8293 15.0504L17.7893 16.1204C17.2393 16.4004 16.5693 16.1704 16.3093 15.6004Z" fill="#d9dbde"></path> </g></svg>
                    </ClassicButton>
                </div>
            </div>
        </div>
    );
};

export default Chat;