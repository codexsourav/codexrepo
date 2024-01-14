import React from 'react';
import styles from './styles/latestblogs.module.css'

import BlogPost from './BlogPost/BlogPost';
import ShowTitle from '@/Component/ShowTitle/ShowTitle';

const LatestBlogs = () => {
    return (
        <>
            <div className={`${styles.latestblogs} container`}>

                <div className={styles.titleSection}>
                    <ShowTitle title='ServicesBox' isLeft animate={""} />
                    <a href="#">Read More</a>
                </div>
                <div className={styles.posts}>
                    <BlogPost />
                    <BlogPost />
                    <BlogPost />
                </div>
            </div>
        </>
    );
};

export default React.memo(LatestBlogs);

