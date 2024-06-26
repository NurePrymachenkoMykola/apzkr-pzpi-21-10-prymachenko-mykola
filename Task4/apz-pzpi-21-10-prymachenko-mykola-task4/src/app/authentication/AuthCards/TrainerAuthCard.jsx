import React from 'react';
import AuthCard from "./AuthCard";
import {AuthTypes, UserTypes} from "@enums/auth";

const TrainerAuthCard = ({setAuthType}) => {
    return (
        <AuthCard
            onSignIn={() => setAuthType({
                userType: UserTypes.TRAINER,
                authType: AuthTypes.SIGN_IN,
            })}
            onSignUp={() => setAuthType({
                userType: UserTypes.TRAINER,
                authType: AuthTypes.SIGN_UP,
            })}
            title={UserTypes.TRAINER}
            bgColor={'#1a6066'}
            icon={
                <svg fill="#fff" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.753 312.753"
                     enableBackground="new 0 0 312.753 312.753"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="m292.991,19.777h-122.969c-4.409,0-7.984,3.575-7.984,7.984v55.07l14.4-21.346c0.48-0.711 1.006-1.381 1.568-2.013v-23.727h107.001v149.957h-107.001v-51.141c-1.34,1.4-2.876,2.657-4.598,3.727l-4.002,2.484-5.799,8.597c-0.481,0.712-1.007,1.382-1.569,2.015v42.302c0,4.409 3.575,7.984 7.984,7.984h122.969c4.409,0 7.984-3.575 7.984-7.984v-165.925c5.68434e-14-4.41-3.575-7.984-7.984-7.984z"></path> <path d="m71.575,65.771c10.51,0 19.464-6.664 22.867-15.997h-45.735c3.404,9.333 12.357,15.997 22.868,15.997z"></path> <g> <path d="m197.702,66.287c-3.682-3.245-9.262-2.433-11.922,1.506-6.024,8.93-20.056,29.729-26.248,38.909-1.621,0.206-3.225,0.744-4.704,1.662l-23.779,14.764c-0.039-7.744-0.07-13.876-0.11-21.952-0.077-15.39-12.733-27.984-28.123-27.984h-1.754c-2.696,5.704-19.14,40.484-21.652,45.798v-32.616l4.746-8.444c1.191-2.12-0.341-4.738-2.772-4.738h-19.57c-2.416,0-3.95,2.589-2.789,4.708l4.417,8.063v33.027c-14.713-31.124-6.589-14.615-21.33-45.798h-2.116c-15.245,0-27.709,12.738-27.785,27.982l-.433,86.258c-0.032,6.484 5.198,11.767 11.682,11.8 0.02,0 0.039,0 0.06,0 6.457,0 11.707-5.218 11.74-11.682l.433-86.258c0.007-1.365 1.185-2.449 2.577-2.306 1.209,0.125 2.082,1.233 2.082,2.448l.006,197.229c0,8.007 6.679,14.454 14.77,14.073 7.578-0.357 13.408-6.885 13.408-14.471v-109.006c0-1.482 0.987-2.848 2.438-3.147 1.94-0.4 3.645,1.07 3.645,2.939v109.214c0,7.586 5.83,14.114 13.408,14.471 8.091,0.381 14.771-6.066 14.771-14.073-0.283-188.876-0.258-164.177-0.256-197.217 0-1.282 0.92-2.454 2.196-2.586 1.468-0.152 2.71,0.992 2.718,2.431 0.041,8.155 0.168,33.484 0.214,42.677 0.017,3.307 1.291,6.537 3.718,8.783 3.986,3.69 9.792,4.144 14.218,1.395l16.23-10.077c0.398,0.422 0.843,0.81 1.344,1.148 3.656,2.466 8.618,1.501 11.084-2.154l7.79-11.547 5.161-3.204c4.287-2.661 6.249-7.634 5.303-12.306 10.719-15.89 15.664-23.219 26.34-39.046 2.268-3.362 1.887-7.991-1.156-10.673z"></path> </g> <path d="m47.241,38.973h47.978c4.409,0 7.984-3.575 7.984-7.984 0-2.781-1.424-5.227-3.58-6.657-0.538-4.443-2.103-8.568-4.456-12.129-4.129-6.249-10.672-10.757-18.302-12.203v13.629c0,3.112-2.523,5.636-5.636,5.636-3.112,0-5.636-2.523-5.636-5.636v-13.491c-7.333,1.581-13.606,6.005-17.61,12.065-2.276,3.445-3.816,7.417-4.401,11.695-2.567,1.328-4.325,4.002-4.325,7.091 7.10543e-15,4.409 3.574,7.984 7.984,7.984z"></path> </g> </g></svg>            }
        />
    );
};

export default TrainerAuthCard;