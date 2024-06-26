import React from 'react';
import styles from './styles/page.module.scss';
import Form from "./Form";

const matters = [
    'For security incidents.',
    'If you have issues or complaints with service quality, billing, invoicing, or concerns about our policies.',
    'For any complaints (e.g. related to sustainability, human rights, or environmental law).',
    'For any other issues.',
]
const Page = () => {

    return (
        <section className={styles.contacts}>
            <div className={styles.contacts__title_wrapper}>
                <h1 className={styles.contacts__title}>Contact Us</h1>
            </div>
            <div>
                <h4 className={styles.contacts__matters_title}>You may need to contact us for next matters:</h4>
                <ul className={styles.contacts__matters}>
                    {matters.map((item, ind) => <li className={styles.contacts__matters_item} key={ind}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="#fff">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.75735 1.7574C0.632135 2.88261 0 4.40873 0 6.00003C2.32266e-05 7.59132 0.632135 9.11744 1.75735 10.2427C2.88256 11.3679 4.40868 12 5.99998 12C7.59127 12 9.11739 11.3679 10.2426 10.2427C11.3678 9.11744 12 7.59132 12 6.00003V0C10.4087 2.33468e-05 8.88254 0.63218 7.75732 1.7574C6.63212 2.88261 5.99998 4.40873 5.99998 6.00003V0C4.40868 2.33468e-05 2.88256 0.63218 1.75735 1.7574Z" fill="#fff"/>
                        </svg>
                        <p>{item}</p>
                    </li>)}
                </ul>
            </div>
            <div className={styles.contacts__form_title}>
                <h2>Let&apos;s talk about your problem</h2>
                <p>Drop us a line through the form below and we&apos;ll get back to you</p>
            </div>
           <Form/>
        </section>
    );
};

export default Page;