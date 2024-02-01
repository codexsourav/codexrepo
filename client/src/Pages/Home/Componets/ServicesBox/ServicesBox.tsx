import React from 'react';
import styles from './styles/blogpost.module.css'

const ServicesBox = ({ desc, image, title }: { title: string, desc: string, image: string }) => {

    return (
        <>
            <div className={styles.blogpost}>
                <img className={`${styles.image} rounded-full border-2`} src={image} alt="post" />
                <h1 className={`${styles.title} text-center uppercase`}>{title}</h1>
                <p className={`${styles.desc} text-center`} >{desc}</p>
            </div>
        </>
    );

};

export default React.memo(ServicesBox);

