import React from 'react';
import ChatsList from "./ChatsList";
import {cookies} from "next/headers";
import {ACCESS_TOKEN} from "../../lib/constraints/tokens";
import {ChatController} from "../../lib/controllers/chat.controller";
import Chat from "./Chat";
import styles from './styles/page.module.scss';

async function getChats() {
    const access_token = cookies().get(ACCESS_TOKEN).value;
    const chats = await ChatController.getChats(access_token);

    return chats;
}
const Page = async () => {
    const chats = await getChats();
    return (
        <section className={styles.page}>
            <ChatsList chats={chats}/>
            <Chat/>
        </section>
    );
};

export default Page;