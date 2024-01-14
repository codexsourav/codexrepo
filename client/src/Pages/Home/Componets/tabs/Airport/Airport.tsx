import React from 'react';
import styles from './styles/airport.module.css'

const Airport = () => {
    return (
        <>
            <div className={styles.airport}>
                Airport Page Content
            </div>
        </>
    );
};

export default  React.memo(Airport);

