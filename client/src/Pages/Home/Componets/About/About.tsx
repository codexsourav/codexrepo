import React from 'react';
import styles from './styles/about.module.css'

const About = () => {
    return (
        <>
            <div className={`${styles.about} container text-center`}>
                {/* <ShowTitle title='About US' isLeft animate={""} /> */}
                <h1 className="text-xl font-bold mb-2 text-orange-600">ABOUT US</h1>
                <p className="text-4xl uppercase font-extrabold text-[#1f1f1f]">Who We Are?</p>
                <div className="text-center leading-8 px-15 mt-10 text-xl">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo necessitatibus porro blanditiis pariatur corrupti illum beatae quo praesentium! Cum eum id quibusdam ut ab assumenda aliquam ipsa! Culpa dicta nisi distinctio dolorem, quibusdam laudantium recusandae? Exercitationem dolorum dolores sit quos doloribus dolor quas, expedita placeat facilis voluptates numquam aspernatur ipsa vel tempora suscipit commodi maiores hic iusto repellat vero necessitatibus! Laborum, molestiae. Dolorum minima quod nam, necessitatibus facere iusto inventore voluptatum repudiandae dignissimos praesentium eaque nesciunt accusamus at ab totam in repellendus dolores ut atque temporibus debitis, eum exercitationem ratione sapiente. Veritatis porro saepe vero. Eligendi amet in dicta velit.</p>
                </div>
            </div >
        </>
    );
};

export default React.memo(About);

