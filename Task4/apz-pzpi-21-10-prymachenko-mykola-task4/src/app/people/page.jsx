import React from 'react';
import styles from './styles/page.module.scss';
import PeopleContent from "./PeopleContent";
import {MemberController} from "../../lib/controllers/member.controller";
import { cookies } from 'next/headers';
import {ACCESS_TOKEN} from "../../lib/constraints/tokens";

async function getPeople() {
    const access_token = cookies().get(ACCESS_TOKEN);
    const {members, count} = await MemberController.find({limit: 10, offset: 0, token: access_token.value});

    return {
        members,
        count
    }
}
const Page = async () => {

    const data = await getPeople();
    console.log(data);
    return (
        <section className={styles.people}>
            <div className={styles.people__inner}>
               <PeopleContent serverPeople={data.members}/>
            </div>
        </section>
    );
};

export default Page;