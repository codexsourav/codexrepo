import React from 'react';
import styles from './styles/appdownload.module.css'
import RatingBox from '@/Components/RatingBox/RatingBox';

const AppDownload = () => {
    return (
        <>
            <div className={`${styles.appdownload} container`}>
                <div className={styles.imageApp}>
                    <img src="/images/appmobile.png" alt="mobile" />
                </div>
                <div className={styles.info}>
                    <h2>Download Our App</h2>
                    <h1>BabaGCabs</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <RatingBox value={4.5} readonly size={40} />
                    <div className={styles.downloadLinks}>
                        <a href="#"><img src="/images/playstore.png" alt="play" /></a>
                        <a href="#"><img src="/images/appstore.png" alt="play" /></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(AppDownload);

