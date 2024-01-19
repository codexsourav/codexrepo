import React from 'react';
import styles from './styles/header.module.css'

import TripBox from '@/Component/TripBox/TripBox';
const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <img src="https://cdn.pixabay.com/photo/2021/11/04/06/15/woman-6767494_960_720.jpg" alt="images" />
                <TripBox />
            </div>
        </>
    );
};

export default React.memo(Header);

