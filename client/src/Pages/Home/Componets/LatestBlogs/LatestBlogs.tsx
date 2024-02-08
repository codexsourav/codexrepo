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
                    <BlogPost date='Admin - JAN 11 2024' image='/images/assets/blogs/1.jpeg' desc='Twenty tourism hubs have been created by Haryana Tourism, which are located in Ambala, Bhiwani, Faridabad, Fatehabad, Gurgaon, Hisar, Jhajjar, Jind, Kaithal, Karnal, Kurukshetra, ' />
                    <BlogPost date='Admin - JAN 11 2024' image='/images/assets/blogs/2.jpeg' desc='These hubs are well-equipped with modern infrastructure, facilities and services in the areas of commerce, communication, connectivity, hospitality, transportation, medical facilities etc.' />
                    <BlogPost date='Admin - JAN 11 2024' image='/images/assets/blogs/3.jpeg' desc='Panchkula, Sirsa, Sonipat, Panipat, Rewari, Rohtak, Yamunanagar, Palwal and Mahendergarh. These are for the convenience of tourists visiting Haryana.' />
                    <BlogPost date='Admin - JAN 11 2024' image='/images/assets/blogs/4.jpeg' desc='These are for the convenience of tourists visiting Haryana. These hubs are well-equipped with modern infrastructure, facilities and services in the areas of ' />
                    <BlogPost date='Admin - JAN 11 2024' image='/images/assets/blogs/5.jpeg' desc='Summers tend to become a bit lazy and the adrenaline junkie in us starts making peace with deep slumbers. The scorching hot season also brings limited vacay experiences with it. ' />
                    <BlogPost date='Admin - JAN 11 2024' image='/images/assets/blogs/6.jpeg' desc='Give a shot to the summer adventures in Uttarakhand. One of the fastest growing tourist places, Uttarakhand sees a huge influx of tourists all through the year. Uttarakhand brings a lavish spread of recreational activities, ' />
                </div>
            </div>
        </>
    );
};

export default React.memo(LatestBlogs);

