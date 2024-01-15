import React from 'react';
import styles from './styles/authbox.module.css'

const AuthBox = () => {
    return (
        <>
            <div className={styles.authbox}>
                <img src="images/d-logo.png" alt="logo" width={150} />
                <p className={styles.title}>Enter your mobile number</p>
                <p className={styles.desc}>A 4-digit OTP will be sent on SMS</p>
                <div className={styles.inputbox}>
                    <img src="/images/in.svg" alt="in" />
                    <p>+91</p>
                    <input />
                </div>
                {/* <OtpBox /> */}
                <button className={styles.btn} >Next</button>
            </div>
        </>
    );
};

export default React.memo(AuthBox);


const OtpBox = () => {
    return <input name='input' className={styles.input} placeholder='Enter Your OTP' />
}
