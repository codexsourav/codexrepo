import React from 'react';
import styles from './styles/services.module.css'

import ServicesBox from '../ServicesBox/ServicesBox';
import ShowTitle from '@/Component/ShowTitle/ShowTitle';

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

