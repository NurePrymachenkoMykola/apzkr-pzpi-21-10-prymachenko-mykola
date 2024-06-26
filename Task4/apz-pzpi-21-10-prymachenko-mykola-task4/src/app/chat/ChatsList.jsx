'use client';
import React, {useCallback, useEffect, useState} from 'react';
import ChatGroup from "./ChatGroup";
import styles from './styles/chats-list.module.scss';
import {ClassicInput} from "@shared/inputs/api";
import {useDispatch, useSelector} from "react-redux";
import {selectChat} from "../../lib/store/selectors/chat.selectors";
import {setChat} from "../../lib/store/slices/chat.slice";
import {socket} from "../../lib/protocols/socket";
const ChatsList = ({chats}) => {
    const chat = useSelector(selectChat);
    const dispatch = useDispatch();
    const setChatMemo = useCallback((id) => {
        const newChat = chats.find(chat => chat.id === id);
        if (newChat) {
            dispatch(setChat(newChat));
        } else {
            dispatch(setChat({}));
        }
    }, [chats]);

    useEffect(() => {
        if (socket.connected) {
            socket.emit('join', {
                chats: chats.map(chat => chat.id)
            })
        }
    }, []);

    useEffect(() => {
        function onConnect() {
            socket.emit('join', {
                chats: chats.map(chat => chat.id)
            })
        }
        socket.on('connect', onConnect);
        return () => {
            socket.off('connect', onConnect);
        }
    }, []);

    return (
        <div className={styles.list}>
            <ClassicInput placeholder={'Search'}></ClassicInput>
            <div className={styles.list__inner}>
                {chats.map(chatItem =>
                    <ChatGroup key={chatItem.id} {...chatItem}
                               active={chatItem.id === chat.id}
                               setActive={setChatMemo}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatsList;