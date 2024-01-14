import React from 'react';
import styles from './styles/aboutus.module.css'

const AboutUS = () => {
    return (
        <>
            <div className={`${styles.aboutus} container`}>
                <div className={styles.title}>
                    <p>Why Choose BabagCabs</p>
                </div>
                <div className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime voluptatibus corrupti ipsam exercitationem atque iure, odit iusto libero earum assumenda illum ipsum deserunt id repudiandae nisi distinctio quasi facere voluptatum.
                    <br />
                    <br />
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim nisi nihil repellendus, facere hic optio. Nam, eveniet? Tenetur cumque, excepturi voluptate sequi accusamus non expedita nemo? Labore obcaecati, vero nulla quasi odio temporibus consequatur magnam autem quaerat fugit reprehenderit quas!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim nisi nihil repellendus, facere hic optio. Nam, eveniet? Tenetur cumque, excepturi voluptate sequi accusamus non expedita nemo? Labore obcaecati, vero nulla quasi odio temporibus consequatur magnam autem quaerat fugit reprehenderit quas!

                </div>

            </div>
        </>
    );
};

export default React.memo(AboutUS);

