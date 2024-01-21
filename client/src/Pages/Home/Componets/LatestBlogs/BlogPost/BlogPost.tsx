import React from 'react';
import styles from './styles/blogpost.module.css'

const BlogPost = () => {
    return (
        <>
            <div className={styles.blogpost}>
                <img src="https://images.cars.com/cldstatic/wp-content/uploads/cadillac-xt4-2024-exterior-oem-05.jpg" alt="image" className='rounded-[35px]' />
                <p className={`${styles.post} `}>Blog</p>
                <h1 className={`${styles.title}`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, accusantium.</h1>
                <p className="text-orange-600 uppercase text-[12px] font-bold">Admin - JAN 11 2024</p>
            </div>
        </>
    );
};

export default React.memo(BlogPost);

