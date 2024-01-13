import React from 'react';
import styles from './styles/services.module.css'
import ShowTitle from '@/Components/ShowTitle/ShowTitle';
import ServicesBox from '../ServicesBox/ServicesBox';

const Services = () => {
    return (
        <>
            <div className={`${styles.services} container`}>
                <ShowTitle title='Our Services' animate={""} isLeft />
                <div className={styles.content}>
                    <ServicesBox />
                    <ServicesBox />
                    <ServicesBox />

                </div>
            </div>
        </>
    );
};

export default React.memo(Services);

