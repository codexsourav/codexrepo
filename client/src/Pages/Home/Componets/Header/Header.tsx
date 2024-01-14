import React, { useState } from 'react';
import styles from './styles/header.module.css'
const Header = () => {
    const [tabinex, setTabinex] = useState<number>(0);
    return (
        <>
            <div className={styles.header}>
                <img src="https://cdn.pixabay.com/photo/2021/11/04/06/15/woman-6767494_960_720.jpg" alt="images" />
                <div className={`${styles.sideBox} container`}>
                    <div className={styles.tabs}>
                        <div onClick={() => setTabinex(0)} className={`${styles.tab} ${tabinex == 0 ? styles.active : null}`}>One Way</div>
                        <div onClick={() => setTabinex(1)} className={`${styles.tab} ${tabinex == 1 ? styles.active : null}`}>Round Trip</div>
                        <div onClick={() => setTabinex(2)} className={`${styles.tab} ${tabinex == 2 ? styles.active : null}`}>Local</div>
                        <div onClick={() => setTabinex(3)} className={`${styles.tab} ${tabinex == 3 ? styles.active : null}`}>Airport</div>
                    </div>
                    <button className={styles.search}>Explore</button>
                </div>
            </div>
        </>
    );
};

export default React.memo(Header);

