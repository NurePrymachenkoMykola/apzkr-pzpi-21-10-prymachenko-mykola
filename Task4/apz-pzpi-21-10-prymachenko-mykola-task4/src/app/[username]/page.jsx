import React from 'react';
import styles from './styles/profile.module.scss';
import EditProfile from "./edit/EditProfile";
import {MemberController} from "../../lib/controllers/member.controller";
import {cookies} from "next/headers";
import {ACCESS_TOKEN} from "../../lib/constraints/tokens";
import {convertToString} from "../../lib/formatting/date";
import ContactUser from "./contact/ContactUser";
async function getData(username) {
    const access_token = cookies().get(ACCESS_TOKEN);
    const member = MemberController.findOne(username, access_token.value);

    return member;
}
const Page = async ({params: {username}}) => {
    const user = await getData(username);
    console.log(user);

    return (
        <section className={styles.profile}>
            <div className={styles.profile__inner}>
                <div className={styles.profile__left_block}>
                    <div className={styles.profile__avatar}>
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="user-circle-2" transform="translate(-2 -2)">
                                    <path id="secondary" fill="#2ca9bc" d="M12,3A9,9,0,0,0,5.55,18.27a7,7,0,0,1,4.28-3.92h0a4,4,0,1,1,4.34,0h0a7,7,0,0,1,4.28,3.92A9,9,0,0,0,12,3Z"></path>
                                    <path id="primary" d="M16,11a4,4,0,1,1-4-4A4,4,0,0,1,16,11Zm-1.83,3.35a3.95,3.95,0,0,1-4.34,0,7,7,0,0,0-4.28,3.92,9,9,0,0,0,12.81.09l.09-.09a7,7,0,0,0-4.28-3.92ZM21,12h0a9,9,0,0,0-9-9h0a9,9,0,0,0-9,9H3a9,9,0,0,0,9,9h0a9,9,0,0,0,9-9Z" fill="none" stroke={'#797c7b'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <p className={styles.profile__username}>{user.username}</p>
                        <p className={styles.profile__email}>{user.email}</p>
                    </div>
                    <div className={styles.profile__options}>
                        <EditProfile
                            name={user.name}
                            surname={user.surname}
                            username={user.username}
                            bio={user.selfDescription}
                        />
                        <ContactUser
                            name={user.name}
                            surname={user.surname}
                            username={user.username}
                            email={user.email}
                            role={user.role}
                        />
                    </div>
                </div>
                <div className={styles.profile__right_block}>
                    <div className={styles.profile__info_blocks_wrapper}>
                        <div className={styles.profile__info_block}>
                            <p className={styles.profile__info_item}><span>Name:</span> {user.name}</p>
                            <p className={styles.profile__info_item}><span>Surname:</span> {user.surname}</p>
                        </div>
                        <div className={styles.profile__info_block}>
                            <p className={styles.profile__info_item}><span>Nation:</span> {user.nation}</p>
                            <p className={styles.profile__info_item}><span>Birthday:</span> {convertToString(user.birthday)}</p>
                        </div>
                    </div>
                    <p className={styles.profile__info_item}><span>Club:</span> {user?.club ?? <span className={styles.profile__info_noClub}>has no club</span>}</p>
                    <p className={styles.profile__info_description_title}>Bio</p>
                    <p className={styles.profile__info_description}>{user.selfDescription}</p>
                </div>
            </div>
        </section>
    );
};

export default Page;