import React from 'react';
import styles from './styles/tabview.module.css'

const TabView = ({ onChange, index = 0 }: { onChange: Function, index: number }) => {
    return (
        <>
            <div className={styles.tabview}>
                <div className={`${styles.tab} ${index == 0 ? styles.active : null}`} onClick={() => onChange(0)}>ONE WAY</div>
                <div className={`${styles.tab} ${index == 1 ? styles.active : null}`} onClick={() => onChange(1)}>ROUND TRIP</div>
                <div className={`${styles.tab} ${index == 2 ? styles.active : null}`} onClick={() => onChange(2)}>LOCAL</div>
                <div className={`${styles.tab} ${index == 3 ? styles.active : null}`} onClick={() => onChange(3)}>AIRPORT</div>
            </div>
        </>
    );
};

export default React.memo(TabView);

