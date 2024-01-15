import React from 'react';
import styles from './styles/auth.module.css'
import AuthBox from '@/Component/AuthBox/AuthBox';

const Auth = () => {
    return (
        <>
            <div className={styles.auth}>
                <AuthBox />
            </div>
        </>
    );
};

export default React.memo(Auth);

