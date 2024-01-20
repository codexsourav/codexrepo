import React, { useState } from 'react';
import styles from './styles/authbox.module.css'
import makeApi from '@/Lib/makeApi';
import { errorToast, successToast } from '@/Lib/showToast';
import { useLocation } from 'react-router-dom';

const AuthBox = () => {
    const query = useLocation();
    const [mobile, setMobile] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isOtpSend, setIsOtpSend] = useState<boolean>(false);

    const loginUser = async () => {
        try {
            setLoading(true)
            const request = await makeApi({ path: "/api/auth", method: "POST", data: { mobile } });
            setLoading(false);
            if (request.data.status == "OK") {
                setIsOtpSend(true)
                successToast(request.data.message);

            } else {
                errorToast(request.data.message || "Unknown Server Error");
            }
        } catch (error) {
            console.log(error);
            errorToast("Unknown Error!")
            setLoading(false)
        }
    };

    const verifyOTP = async () => {
        try {
            setLoading(true)
            const request = await makeApi({ path: "/api/auth/" + mobile, method: "POST", data: { otp } });
            setLoading(false);
            if (request.data.status == "OK") {
                localStorage.setItem(import.meta.env.VITE_AUTHKEY, request.data.token)
                if (query.search) {
                    window.location.replace("/booking" + query.search);
                } else {
                    window.location.replace("/")
                }
                successToast(request.data.message);
            } else {
                errorToast(request.data.message || "Unknown Server Error");
            }
        } catch (error) {
            console.log(error);
            errorToast("Unknown Error!")
            setLoading(false)
        }
    };
    return (
        <>
            <div className={styles.authbox}>
                <img src="images/d-logo.png" alt="logo" width={150} />
                <p className={styles.title}>Enter your mobile number</p>
                <p className={styles.desc}>A 4-digit OTP will be sent on SMS</p>

                {isOtpSend ? <OtpBox value={otp} onChenge={setOtp} /> : <div className={styles.inputbox}>
                    <img src="/images/in.svg" alt="in" />
                    <p>+91</p>
                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>}
                <button className={styles.btn} onClick={isOtpSend ? verifyOTP : loginUser} disabled={loading}>{loading ? isOtpSend ? "Checking..." : "Sending..." : "Next"}</button>
            </div>
        </>
    );
};

export default React.memo(AuthBox);


const OtpBox = ({ onChenge, value }: { value: string, onChenge: ((e: string) => void) }) => {
    return <input name='input' className={styles.input} placeholder='Enter Your OTP' value={value} onChange={(e) => onChenge(e.target.value)} />
}
