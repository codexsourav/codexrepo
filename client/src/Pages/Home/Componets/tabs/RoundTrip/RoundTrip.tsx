import React from 'react';
import styles from './styles/roundtrip.module.css'

const RoundTrip = () => {
    return (
        <>
            <div className={styles.roundtrip}>
                RoundTrip Page Content
            </div>
        </>
    );
};

export default  React.memo(RoundTrip);

