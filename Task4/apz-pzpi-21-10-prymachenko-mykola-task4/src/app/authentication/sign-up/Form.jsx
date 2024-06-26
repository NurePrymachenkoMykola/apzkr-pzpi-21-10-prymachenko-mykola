'use client';
import React, {createContext, useCallback, useState} from 'react';
import styles from '../styles/sign-up-form.module.scss';
import {UserTypes} from "@enums/auth";
import {ClassicInput, ClassicTextArea} from "@shared/inputs/api";
import {ClassicSelect} from "@shared/selects/api";
import {ClassicCalendar} from "@shared/calendars/api";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import {PlayerController} from "@controllers/player.controller";
import {TrainerController} from "@controllers/trainer.controller";
import {MedicController} from "@controllers/medic.controller";
import {DirectorController} from "@controllers/director.controller";
import {useRouter} from "next/navigation";
import {ValidationError} from "@shared/errors/api";
import extractErrors from "../../../lib/errors/extractErrors";
import {ClassicDialog} from "@shared/dialogs/api";

const MemberControllers = {
    [UserTypes.PLAYER.toLowerCase()]: PlayerController,
    [UserTypes.TRAINER.toLowerCase()]: TrainerController,
    [UserTypes.MEDIC.toLowerCase()]: MedicController,
    [UserTypes.DIRECTOR.toLowerCase()]: DirectorController,
}
const Form = ({
                  nations,
                  userRole,
                  positions
              }) => {

    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        email: '',
        birthday: '',
        nation: '',
        description: '',
        position: '',
        number: '',
        experience: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        username: false,
        password: false,
        email: false,
        number: false,
        date: false,
        position: false,
        nation: false,
        experience: false,
        user: false,
    })

    const setUserMemo = useCallback((value, field) => {
        setUser(user => {
            user[field.toLowerCase()] = value;
            return {...user};
        });
    }, []);
    const setNation = useCallback((value) => {
        setUserMemo(value, 'nation');
    }, []);
    const setBirthday = useCallback((value) => {
        setUserMemo(value, 'birthday');
    }, []);
    const setPosition = useCallback((value) => {
        setUserMemo(value, 'position');
    }, []);
    const setDescription = useCallback((value) => {
        setUserMemo(value, 'description');
    }, []);

    const getOptionalFields = (role) => {
        let fields;
        switch (role) {
            case UserTypes.PLAYER.toLowerCase():
                fields = <>
                    <div className={styles.form__block}>
                        <ClassicInput
                            minValue={1}
                            maxValue={99}
                            type={'number'}
                            value={user.number}
                            setValue={setUserMemo}
                        >
                            Number
                        </ClassicInput>
                        {errors.number && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
                    </div>

                    <div className={styles.form__block}>
                        <ClassicSelect
                            placeholder={'Pick a position'}
                            label={'Positions'}
                            items={positions}
                            setSelectedItem={setPosition}
                        />
                        {errors.position && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
                    </div>
                </>
                break;
            case UserTypes.MEDIC.toLowerCase():
                fields = <>
                    <div className={styles.form__block}>
                        <ClassicInput
                            minValue={1}
                            maxValue={99}
                            type={'number'}
                            value={user.experience}
                            setValue={setUserMemo}
                        >
                            Work experience
                        </ClassicInput>
                        {errors.experience && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
                    </div>

                </>
                break;
            case UserTypes.TRAINER.toLowerCase():
                fields = <>
                    <div className={styles.form__block}>
                        <ClassicInput
                            minValue={1}
                            maxValue={99}
                            type={'number'}
                            value={user.experience}
                            setValue={setUserMemo}
                        >
                            Work experience
                        </ClassicInput>
                        {errors.experience && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
                    </div>

                </>
                break;
            case UserTypes.DIRECTOR.toLowerCase():
                fields = <>
                </>
                break;
            default:
                console.log('error');
                break;
        }

        return fields;
    }

    const optionalFields = getOptionalFields(userRole);
    const apply = async (e) => {
        e.preventDefault();

        const res = await MemberControllers[userRole].signUp(user);
        if (!res.error) {
            router.push('/home');
        } else {
            const errors = extractErrors(res.messages);
            setErrors(errors);

            console.log(res, errors);
        }
    }
    return (
        <form className={styles.form}>
            <div className={styles.form__block}>
                <ClassicInput
                    value={user.name}
                    setValue={setUserMemo}
                >Name</ClassicInput>
                {errors.name && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
            </div>
            <div className={styles.form__block}>
                <ClassicInput
                    value={user.surname}
                    setValue={setUserMemo}
                >Surname</ClassicInput>
                {errors.surname && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
            </div>
            <div className={styles.form__block}>
                <ClassicInput
                    value={user.username}
                    setValue={setUserMemo}
                >Username</ClassicInput>
                {errors.username
                    ? <ValidationError className={styles.form__block_error}>
                        invalid value
                    </ValidationError>
                    : errors.user && errors.user?.includes('username')
                        ? <ValidationError className={styles.form__block_error}>
                            {errors.user}
                        </ValidationError>
                        : null
                }
            </div>
            <div className={styles.form__block}>
                <ClassicInput
                    value={user.password}
                    setValue={setUserMemo}
                >Password</ClassicInput>
                {errors.password && <ValidationError className={styles.form__block_error}>Password is not strong</ValidationError>}
            </div>
            <div className={styles.form__block}>
                <ClassicInput
                    value={user.email}
                    setValue={setUserMemo}
                >Email</ClassicInput>
                {errors.email
                    ? <ValidationError className={styles.form__block_error}>
                        invalid value
                    </ValidationError>
                    : errors.user && errors.user?.includes('email')
                        ? <ValidationError className={styles.form__block_error}>
                            {errors.email}
                        </ValidationError>
                        : null
                }
            </div>
            {optionalFields}
            <div className={styles.form__block}>
                <ClassicSelect
                    placeholder={'Nation'}
                    label={'Nations'}
                    setSelectedItem={setNation}
                    items={nations}
                />
                {errors.nation && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
            </div>
            <div className={styles.form__block}>
                <ClassicCalendar setDate={setBirthday}
                                 date={user.birthday}>Birthday</ClassicCalendar>
                {errors.date && <ValidationError className={styles.form__block_error}>invalid value</ValidationError>}
            </div>
            <ClassicTextArea
                value={user.description}
                setValue={setDescription}
            >Description</ClassicTextArea>

            <ClassicButton onClick={apply}>Apply</ClassicButton>

        </form>
    );
};

export default Form;