import React from 'react';
import styles from './styles/about.module.css'

const About = () => {
    return (
        <>
            <div className={`${styles.about} container text-center`}>
                {/* <ShowTitle title='About US' isLeft animate={""} /> */}
                <h1 className="text-xl font-bold mb-2 text-orange-600">ABOUT US</h1>
                <p className="text-4xl uppercase font-extrabold text-[#1f1f1f]">Who We Are?</p>
                <div className="text-center leading-8 px-15 mt-10 text-xl">
                    <p>BaBaG Cabs  operates in the public transport market since October 2023. Even though a relatively new company,BaBaG Cabs achieved within a short time to consolidate it’s position in the market, vs
                        being today the biggest taxi company in Dilhi ,Gurugran and other famouse cities of India with a feet of 30 cars, which crosses approx.
                        6000km (3730 miles) every day, covering every corner of the city.
                        Our taxis operate 24 hours a day, 7 days a week, 365 days a year in the city of India .
                        Our vehicles are designed to offer comfort to the passengers but also
                        effciency in the consumption of fuel. All vehicles have 4+1 seats, equipped with GPS system,
                        radio, air conditioner etc.</p>
                </div>
            </div >
        </>
    );
};

export default React.memo(About);

