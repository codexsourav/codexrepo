import React from 'react';
import styles from './styles/explore.module.css'

const Explore = () => {
    return (
        <>
            <div className={`${styles.explore} container`}>
                <div className={`${styles.info}`}>
                    <h2 className='text-xl font-bold' >Your Trip Info</h2>
                    <ul>
                        <li>Type: One Way</li>
                        <li>Pickup Address: Bangalore, india</li>
                        <li>Drop Address: Delhi, india</li>
                        <li>Pickup Date: 15/01/2024</li>
                        <li>Pickup time: 12:10 PM</li>
                    </ul>
                    <button className={styles.modify}>MODIFY TRIP</button>
                </div>
                <div className={styles.cars}>
                    <CarBox />
                    <CarBox />
                    <CarBox />
                    <CarBox />
                    <CarBox />
                    <CarBox />


                </div>
            </div>
        </>
    );
};

export default React.memo(Explore);


const CarBox = () => {
    return <div className={styles.carbox}>
        <img src="https://demothemesflat.co/conexikit/wp-content/uploads/2022/11/Taxis-01.png" alt="car" />
        <h1 className='font-bold text-2xl' >M5 2008 Model</h1>
        <div className={styles.infobox}>
            <div className={styles.infocar}><p>Base Rate:</p> <p>₹200.00</p></div>
            <div className={styles.infocar}><p>Par 1/KM:</p> <p>₹40.00</p></div>
            <div className={styles.infocar}><p>Max Passengers:</p> <p>4</p></div>

        </div>
        <a href='/booking' className={styles.bookbtn}>BOOK NOW</a>
    </div>

}
