import React, { useState } from 'react';
import styles from './styles/header.module.css'

import TripBox from '@/Component/TripBox/TripBox';
const Header = () => {
    const [index, setIndex] = useState<number>(0);
    const images = ['/images/bgimages/1.jpg', '/images/bgimages/2.jpg', '/images/bgimages/3.webp', '/images/bgimages/4.jpg']
    return (
        <>
            <div className={styles.header}>
                <img src={images[index]} />
                <TripBox setIndex={setIndex} />
            </div>
        </>
    );
};

export default React.memo(Header);

