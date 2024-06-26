'use client'
import React, {useCallback, useState} from 'react';
import styles from './letter.module.scss';
import {DangerButton} from "@shared/buttons/api";
import LetterDialog from "../letter-dialog/LetterDialog";
import {LetterController} from "../../../lib/controllers/letter.controller";
import {Link, Avatar, Box, Flex, Heading, HoverCard, Text} from "@radix-ui/themes";

const Letter = ({id, sender, title, receiver,
                    isRead, remove,
                    date, content, type}) => {
    const [letterDialog, setLetterDialog] = useState(false);
    const [letterStatus, setLetterStatus] = useState(isRead);

    const [statusHoverCard, setStatusHoverCard] = useState(false);

    const close = useCallback(() => {
        setLetterDialog(false);
    }, []);

    const deleteLetter = useCallback((e) => {
        e.stopPropagation();
        LetterController.delete(id).then(res => {
            if (!res.error) {
                remove(id);
            }
        })
    }, []);

    const markAsRead = useCallback((e) => {
        e.stopPropagation();
        setLetterStatus(true);
        LetterController.toggleStatus(id, true).then(res => {
            console.log(res);
            if (res.error) {
                setLetterStatus(false);
            }
        });
    }, []);

    const markAsUnread = useCallback((e) => {
        e.stopPropagation();
        setLetterStatus(false);
        LetterController.toggleStatus(id, false).then(res => {
            console.log(res);
            if (res.error) {
                setLetterStatus(true);
            }
        });
    }, []);
    return (
        <>
            <div className={styles.letter} onClick={() => setLetterDialog(true)}>
                <div className={styles.letter__top}>
                    <p className={styles.letter__sender}>{sender.name} {sender.surname}</p>
                    <p>{'17:30 22.05.04'}</p>
                </div>
                <div className={styles.letter__bottom}>
                    <h4 className={styles.letter__title}>{title}</h4>
                    <div className={styles.letter__features}>
                        {letterStatus
                            ? <HoverCard.Root>
                                <HoverCard.Trigger onClick={markAsUnread}>
                                    <Link className={styles.letter__status}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM18.5762 7.51986C18.8413 7.83807 18.7983 8.31099 18.4801 8.57617L16.2837 10.4066C15.3973 11.1452 14.6789 11.7439 14.0448 12.1517C13.3843 12.5765 12.7411 12.8449 12 12.8449C11.2589 12.8449 10.6157 12.5765 9.95518 12.1517C9.32112 11.7439 8.60271 11.1452 7.71636 10.4066L5.51986 8.57617C5.20165 8.31099 5.15866 7.83807 5.42383 7.51986C5.68901 7.20165 6.16193 7.15866 6.48014 7.42383L8.63903 9.22291C9.57199 10.0004 10.2197 10.5384 10.7666 10.8901C11.2959 11.2306 11.6549 11.3449 12 11.3449C12.3451 11.3449 12.7041 11.2306 13.2334 10.8901C13.7803 10.5384 14.428 10.0004 15.361 9.22291L17.5199 7.42383C17.8381 7.15866 18.311 7.20165 18.5762 7.51986Z" fill="#ffffff"></path> </g></svg>
                                    </Link>
                                </HoverCard.Trigger>
                                <HoverCard.Content style={{zIndex: 1}}>
                                    <Text as="div" size="2" style={{ maxWidth: 325 }}>
                                        Mark as unread
                                    </Text>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            : <HoverCard.Root>
                                <HoverCard.Trigger onClick={markAsRead}>
                                    <Link className={styles.letter__status}>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 22.0002H14C17.7712 22.0002 19.6569 22.0002 20.8284 20.8286C22 19.6571 22 17.7714 22 14.0002C22 10.229 22 8.34335 20.8284 7.17178C20.4658 6.80918 20.0343 6.5588 19.4996 6.38591C19.5 6.55544 19.5 6.72881 19.5 6.90517L19.5 9.06327C19.5 9.09263 19.5003 9.12461 19.5006 9.15893C19.5035 9.49938 19.5085 10.07 19.264 10.592C19.0195 11.1141 18.578 11.4756 18.3145 11.6913C18.2882 11.7128 18.263 11.7334 18.2407 11.752L16.7342 13.0075C15.8734 13.7248 15.1241 14.3493 14.4505 14.7825C13.7245 15.2495 12.9391 15.5949 12 15.5949C11.0609 15.5949 10.2756 15.2495 9.54949 14.7825C8.87589 14.3493 8.12661 13.7248 7.26587 13.0075L5.75937 11.752C5.73681 11.7333 5.71207 11.713 5.68551 11.6913C5.42207 11.4756 4.98056 11.1141 4.73604 10.592C4.49152 10.07 4.49648 9.49938 4.49944 9.15893C4.49973 9.12462 4.50001 9.09262 4.50001 9.06327L4.50001 6.90516C4.49999 6.72858 4.49998 6.55528 4.5004 6.38556C3.96577 6.55846 3.53442 6.80893 3.17157 7.17178C2 8.34335 2 10.229 2 14.0002C2 17.7714 2 19.6571 3.17157 20.8286C4.34314 22.0002 6.22877 22.0002 10 22.0002Z" fill="#ffffff"></path> <path fillRule="evenodd" clipRule="evenodd" d="M6.71972 10.5997L8.15898 11.7991C9.99562 13.3296 10.9139 14.0949 12.0001 14.0949C13.0862 14.0949 14.0046 13.3296 15.8412 11.7991L17.2805 10.5997C17.6343 10.3048 17.8113 10.1574 17.9057 9.95578C18.0001 9.75421 18.0001 9.52389 18.0001 9.06325V7C18.0001 6.67937 18.0001 6.38054 17.9982 6.10169C17.9865 4.3306 17.9005 3.36486 17.2679 2.73223C16.5356 2 15.3571 2 13.0001 2H11.0001C8.64306 2 7.46455 2 6.73232 2.73223C6.09969 3.36486 6.01179 4.3306 6.00009 6.10169C5.99824 6.38054 6.00009 6.67937 6.00009 7V9.06325C6.00009 9.52389 6.00009 9.75421 6.0945 9.95578C6.18891 10.1574 6.36584 10.3048 6.71972 10.5997ZM9.25 6C9.25 5.58579 9.58579 5.25 10 5.25H14C14.4142 5.25 14.75 5.58579 14.75 6C14.75 6.41421 14.4142 6.75 14 6.75H10C9.58579 6.75 9.25 6.41421 9.25 6ZM10.25 9C10.25 8.58579 10.5858 8.25 11 8.25H13C13.4142 8.25 13.75 8.58579 13.75 9C13.75 9.41421 13.4142 9.75 13 9.75H11C10.5858 9.75 10.25 9.41421 10.25 9Z" fill="#ffffff"></path> </g></svg>
                                    </Link>
                                </HoverCard.Trigger>
                                <HoverCard.Content style={{zIndex: 1}}>
                                    <Text as="div" size="2" style={{ maxWidth: 325 }}>
                                        Mark as read
                                    </Text>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        }
                        <DangerButton px={15} py={5} onClick={deleteLetter}>Delete</DangerButton>
                    </div>
                </div>
            </div>

            {letterDialog && <LetterDialog
                content={content}
                close={close}
                sender={sender}
                receiver={receiver}
                id={id}
                remove={remove}
            />}
        </>
    );
};

export default Letter;