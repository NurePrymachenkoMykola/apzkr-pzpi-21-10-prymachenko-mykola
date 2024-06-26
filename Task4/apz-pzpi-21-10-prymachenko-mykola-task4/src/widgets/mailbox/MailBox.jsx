import React, {useCallback, useState} from 'react';
import styles from './mailbox.module.scss';
import Letter from "./letter/Letter";

const MailBox = ({letters, remove}) => {
    return (
        <div className={styles.mailbox}>
            <h1 className={styles.mailbox__title}>mailbox</h1>
            <div className={styles.mailbox__letters} style={{
                justifyContent: letters?.length ? 'flex-start' : 'center'
            }}>
                {letters?.length
                ? letters.map(letter => <Letter
                        key={letter.id}
                        date={letter.date}
                        isRead={letter.isRead}
                        id={letter.id}
                        type={letter.type}
                        title={letter.title}
                        content={letter.content}
                        sender={letter.sender}
                        receiver={letter.receiver}
                        remove={remove}
                    />)
                : <h3 style={{fontSize: 32, color: 'red'}}>No letters</h3>
                }
                {/*
                 <Letter
                    date={new Date()}
                    type={'invitation'}
                    title={'Invitation to club'}
                    content={{
                        greeting: `Hello, Danil Shelikhov`,
                        body: `I am director of Liverpool. I officially invite you to out team. You are an excellent professional so we would be happy to see you with us.`,
                        conclusion: `Best regards, Nickolay Prymachenko`,
                    }}
                    sender={{
                        name: 'Nickolay',
                        surname: 'Prymachenko'
                    }}
                />
                */}
            </div>
        </div>
    );
};

export default MailBox;