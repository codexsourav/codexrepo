import React from 'react';
import styles from './styles/header.module.css'

import TripBox from '@/Component/TripBox/TripBox';
const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <TripBox />
            </div>
        </>
    );
};

export default React.memo(Header);

