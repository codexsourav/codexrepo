import React from 'react';
import styles from './styles/about.module.css'
import ShowTitle from '@/Components/ShowTitle/ShowTitle';

const About = () => {
    return (
        <>
            <div className={`${styles.about} container`}>
                <ShowTitle title='About US' isLeft animate={""} />
                <br /><br />
                <div className={styles.content}>
                    <div className={styles.img}>
                        <img src="https://media.istockphoto.com/id/1150571619/photo/taxi-cabs-waiting-for-passengers-yellow-taxi-sign-on-cab-cars-taxi-cars-waiting-arrival.jpg?s=612x612&w=0&k=20&c=BrBO7Xqt0Vo4MQVaOfG9MIl1dtCaDQ4CgYn-PKK5Sk0=" alt="" />
                    </div>
                    <div className={styles.view}>
                        <div className={styles.content}>
                            <h1>Welcome To BabaCabs</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo necessitatibus porro blanditiis pariatur corrupti illum beatae quo praesentium! Cum eum id quibusdam ut ab assumenda aliquam ipsa! Culpa dicta nisi distinctio dolorem, quibusdam laudantium recusandae? Exercitationem dolorum dolores sit quos doloribus dolor quas, expedita placeat facilis voluptates numquam aspernatur ipsa vel tempora suscipit commodi maiores hic iusto repellat vero necessitatibus! Laborum, molestiae. Dolorum minima quod nam, necessitatibus facere iusto inventore voluptatum repudiandae dignissimos praesentium eaque nesciunt accusamus at ab totam in repellendus dolores ut atque temporibus debitis, eum exercitationem ratione sapiente. Veritatis porro saepe vero. Eligendi amet in dicta velit.</p>

                        </div>
                        <a href="#" className='btn'>Read More</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(About);

