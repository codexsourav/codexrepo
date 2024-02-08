import React from 'react';
import styles from './styles/blogpost.module.css'

const BlogPost = ({ date, desc, image }: { image: string, desc: string, date: string }) => {
    return (
        <>
            <div className={styles.blogpost}>
                <img src={image} alt="image" className='rounded-[35px]' />
                <p className={`${styles.post} `}>Blog</p>
                <h1 className={`${styles.title}`}>{desc}</h1>
                <p className="text-orange-600 uppercase text-[12px] font-bold">{date}</p>
            </div>
        </>
    );
};

export default React.memo(BlogPost);

