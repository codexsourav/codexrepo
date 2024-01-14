import React from 'react';
import styles from './styles/local.module.css'

const Local = () => {
    return (
        <>
            <div className={styles.local}>
                Local Page Content
            </div>
        </>
    );
};

export default  React.memo(Local);

