import React from 'react';
import AuthCard from "./AuthCard";
import {AuthTypes, UserTypes} from "@enums/auth";

const DirectorAuthCard = ({setAuthType}) => {

    return (
        <AuthCard
            onSignIn={() => setAuthType({
                userType: UserTypes.DIRECTOR,
                authType: AuthTypes.SIGN_IN,
            })}
            onSignUp={() => setAuthType({
                userType: UserTypes.DIRECTOR,
                authType: AuthTypes.SIGN_UP,
            })}
            title={UserTypes.DIRECTOR}
            bgColor={'#4f1575'}
            icon={
                <svg fill="#fff" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="-351 153 256 256" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-222.5,159c20.6,0,37.3,16.7,37.3,37.3s-16.7,37.3-37.3,37.3s-37.3-16.7-37.3-37.3S-243.1,159-222.5,159z M-282.6,298.8 c0-2.8,1.8-4.7,4.7-4.7s4.7,1.8,4.7,4.7V403h102.5V298.8c0-2.8,1.8-4.7,4.7-4.7c2.8,0,4.7,1.8,4.7,4.7V403h32.6V289.4 c0-25.7-21-46.6-46.6-46.6h-9.4l-27.4,42.6l-3.3-31.9l4.5-10.8h-20.2l4.5,10.8l-3.5,32.1l-27.4-42.8h-11c-25.7,0-46.6,21-46.6,46.6 V403h32.6V298.8H-282.6z"></path> </g></svg>
            }
        />
    );
};

export default DirectorAuthCard;