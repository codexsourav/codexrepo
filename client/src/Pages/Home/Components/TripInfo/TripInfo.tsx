import React from 'react';
import styles from './styles/tripinfo.module.css'

const TripInfo = () => {
    return (
        <>
            <div className={`${styles.tripinfo} container`}>
                <img src="/images/country.png" alt="country" />
                <div className={styles.viewbox}>
                    <div className={styles.titlesec}>
                        <h1>
                            Completed 1200+ TRIPS
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas obcaecati beatae dolor corporis explicabo aperiam ullam tenetur rem, temporibus sunt consequuntur nobis, neque illo nulla enim quis exercitationem ducimus non!</p>

                    </div>
                    <div className={styles.contentBox}>
                        <div className={styles.box}>
                            <h1>30K+</h1>
                            <p>Happy Clients</p>
                        </div>
                        <div className={styles.box}>
                            <h1>30K+</h1>
                            <p>Happy Clients</p>
                        </div>
                        <div className={styles.box}>
                            <h1>30K+</h1>
                            <p>Happy Clients</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(TripInfo);

