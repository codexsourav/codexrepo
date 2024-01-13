import React, { useState } from 'react';
import styles from './styles/header.module.css'
import TabView from './Components/TabView/TabView';
import OneWayTab from './Components/HomeTabs/OneWayTab/OneWayTab';

const Header = () => {
    const [index, setIndex] = useState<number>(0)
    return (
        <>
            <div className={styles.header} style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                <TabView onChange={setIndex} index={index} />
                <OneWayTab />
                <button className={styles.explore}>Explore Cabs</button>
            </div>
        </>
    );
};

export default React.memo(Header);

