import React from 'react';
import styles from './styles/oneway.module.css'

const OneWay = () => {
    return (
        <>
            <div className={styles.oneway}>
                OneWay Page Content
            </div>
        </>
    );
};

export default  React.memo(OneWay);

