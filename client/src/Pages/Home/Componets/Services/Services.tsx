import React from 'react';
import styles from './styles/services.module.css'

import ServicesBox from '../ServicesBox/ServicesBox';

const Services = () => {
    return (
        <>
            <div className={`${styles.services} container`}>
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-2 text-orange-600 pt-10">OUR SERVICES</h1>
                    <p className="text-4xl uppercase font-extrabold text-[#1f1f1f]">WHAT We PROVIDE?</p>
                </div>
                <div className={styles.content}>
                    <ServicesBox title='One Way' image='/images/assets/1.jpeg' desc='Our round-trip service is designed to provide you with utmost comfort. During the round trip, you can enjoy a luxurious experience with your family and friends, ensuring a well-rounded tour. Our drivers are not only honest but also experts in navigating routes, ensuring they contribute to making your trip truly memorable.' />
                    <ServicesBox title='Round Trip' image='/images/assets/2.jpeg' desc='Our one-way cab service is accessible across all states in North India, offering cost-effective rates for travel from one point to another. Our pricing includes toll charges, providing you with quality service at affordable rates.' />
                    <ServicesBox title='Local' image='/images/assets/3.jpeg' desc='Our local cab service offers a unique experience for your business errands, shopping, and local sightseeing. We have curated packages for 4 hours, 8 hours, 12 hours, and a full day to cater to your specific needs. Our aim is to provide you with a delightful experience while exploring the local city' />
                    <ServicesBox title='Airport' image='/images/assets/4.jpeg' desc='We provide airport transfer services to seamlessly transport you from the airport to your home, hotel, or any other destination. Additionally, we offer transfers from your home, hotel, or any specified location to the airport. Our commitment is to ensure timely arrivals and deliver excellent service. Choose our cab service for a reliable and convenient transportation experience.' />
                </div>
            </div>
        </>
    );
};

export default React.memo(Services);

