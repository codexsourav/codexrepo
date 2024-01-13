import React from 'react';
import styles from './styles/blogpost.module.css'

const ServicesBox = () => {

    return (
        <>
            <div className={styles.blogpost}>
                <img className={styles.image} src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="post" />
                <h1 className={styles.title}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, libero?</h1>
                <p className={styles.desc} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias enim possimus nam quod, odio a itaque unde harum neque officiis reiciendis eius voluptate tenetur debitis cumque est adipisci atque tempore.</p>
            </div>
        </>
    );

};

export default React.memo(ServicesBox);

