import React, { ChangeEventHandler } from 'react';
import styles from './styles/tabinputdatetimebox.module.css'

const TabInputDateTimeBox = ({ title, onChange, showDate = true }: { showDate?: boolean, title: string, onChange?: ChangeEventHandler<HTMLInputElement> | undefined }) => {
    return (
        <>
            <div className={styles.tabinputdatetimebox}>
                <label >{title}</label>
                <input type={showDate ? "date" : "time"} onChange={onChange} className={styles.inputbox} />
            </div>
        </>
    );
};

export default React.memo(TabInputDateTimeBox);

