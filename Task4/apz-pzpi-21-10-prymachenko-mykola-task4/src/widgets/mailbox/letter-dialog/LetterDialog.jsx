import React, {useCallback} from 'react';
import styles from './letter-dialog.module.scss';
import {ClassicDialog} from "@shared/dialogs/api";
import {ClassicButton, DangerButton} from "@shared/buttons/api";
import {TransferController} from "../../../lib/controllers/transfer.controller";

const LetterDialog = ({content, letterId, close, id,
                          remove,
                          receiver, sender}) => {

    const accept = useCallback(async () => {
        const res = await TransferController.accept({
            role: receiver.role,
            memberUsername: receiver.username,
            directorUsername: sender.username,
            id,
        });
        if (!res.error) {
            remove(id);
            close();
        }
    }, [receiver, sender, close]);

    const reject = useCallback(async () => {
        const res = await TransferController.reject({
            role: receiver.role,
            memberUsername: receiver.username,
            directorUsername: sender.username,
            id,
        });
        if (!res.error) {
            remove(id);
            close();
        }
    }, [receiver, sender, close]);

    return (
        <ClassicDialog zIndex={22} onClick={close}>
            <div className={styles.dialog}>
                <h1 className={styles.letter__title}>Letter</h1>
                <div className={styles.dialog__content}>
                    <p>{content.greeting}</p>
                    <p>{content.body}</p>
                    <p>{content.conclusion}</p>
                </div>
                <div className={styles.dialog__features}>
                    <div>
                        <ClassicButton onClick={close}>Close</ClassicButton>
                    </div>
                    <div className={styles.dialog__choices}>
                        <ClassicButton onClick={accept}>Accept</ClassicButton>
                        <DangerButton onClick={reject}>Reject</DangerButton>
                    </div>
                </div>
            </div>
        </ClassicDialog>
    );
};

export default LetterDialog;