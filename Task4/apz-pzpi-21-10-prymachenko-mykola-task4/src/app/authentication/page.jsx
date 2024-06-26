'use client';

import React, {useEffect, useState} from 'react';
import PlayerAuthCard from "./AuthCards/PlayerAuthCard";
import TrainerAuthCard from "./AuthCards/TrainerAuthCard";
import DirectorAuthCard from "./AuthCards/DirectorAuthCard";
import MedicAuthCard from "./AuthCards/MedicAuthCard";
import styles from './styles/authentication.module.scss';
import AuthForm from "./sign-in/AuthForm";
import {ClassicDialog} from "@shared/dialogs/api";
import {useRouter} from "next/navigation";
import {AuthTypes, UserTypes} from "@enums/auth";

const Page = () => {
    const [type, setType] = useState({
        userType: UserTypes.NONE,
        authType: AuthTypes.NONE,
    });
    const router = useRouter();
    useEffect(() => {
        if (type.authType === AuthTypes.SIGN_UP) {
            router.push(`authentication/sign-up/${type.userType.toLowerCase()}`);
        }
    }, [type]);
    return (
        <section className={styles.authentication}>
            <h1 className={styles.authentication__title}>Authentication</h1>
            <div className={styles.authentication__cards}>
                <PlayerAuthCard setAuthType={setType}/>
                <TrainerAuthCard setAuthType={setType}/>
                <DirectorAuthCard setAuthType={setType}/>
                <MedicAuthCard setAuthType={setType}/>
            </div>
            {type.authType === AuthTypes.SIGN_IN &&
                <>
                    <ClassicDialog onClick={() => setType({
                        userType: UserTypes.NONE,
                        authType: AuthTypes.NONE,
                    })}>
                        <AuthForm authType={type}
                                  resetAuthType={() => setType({
                                      userType: UserTypes.NONE,
                                      authType: AuthTypes.NONE,
                                  })}
                        />
                    </ClassicDialog>
            </>}
        </section>
    );
};

export default Page;