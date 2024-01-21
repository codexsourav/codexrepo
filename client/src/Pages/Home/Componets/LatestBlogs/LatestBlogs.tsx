import React from 'react';
import styles from './styles/latestblogs.module.css'

import BlogPost from './BlogPost/BlogPost';


const LatestBlogs = () => {
    return (
        <>
            <div className={`${styles.latestblogs} container pb-50`}>
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-2 text-orange-600 pt-10 uppercase">Latest Blogs</h1>
                    <p className="text-4xl uppercase font-extrabold text-[#1f1f1f]">Read our new posts</p>
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

