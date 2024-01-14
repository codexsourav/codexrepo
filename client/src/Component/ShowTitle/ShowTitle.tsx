import React from 'react';
import styles from './styles/showtitle.module.css'

const ShowTitle = ({ title, isLeft = false, animate = "fade-up" }: { title: string, isLeft?: boolean, animate?: string | null }) => {
    return (
        <>
            <div className={`${isLeft ? styles.showtitleLeft : styles.showtitle}`} data-aos={animate}>
                <p>{title}</p>
                <div className={styles.line}></div>
            </div>
        </>
    );
};

export default React.memo(ShowTitle);

