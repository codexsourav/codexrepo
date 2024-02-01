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
                    <ServicesBox title='One Way' image='/images/assets/1.jpeg' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo necessitatibus porro blanditiis pariatur corrupti illum beatae quo praesentium!' />
                    <ServicesBox title='Round Trip' image='/images/assets/2.jpeg' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo necessitatibus porro blanditiis pariatur corrupti illum beatae quo praesentium!' />
                    <ServicesBox title='Local' image='/images/assets/3.jpeg' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo necessitatibus porro blanditiis pariatur corrupti illum beatae quo praesentium!' />
                    <ServicesBox title='Airport' image='/images/assets/4.jpeg' desc='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo necessitatibus porro blanditiis pariatur corrupti illum beatae quo praesentium!' />
                </div>
            </div>
        </>
    );
};

export default React.memo(Services);

