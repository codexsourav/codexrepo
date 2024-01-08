import React from 'react';
import styles from './styles/navbar.module.css'

const Navbar = () => {
    return (
        <>
            <div className={styles.navbar}>
                Navbar Page Content
            </div>
        </>
    );
};

export default  React.memo(Navbar);

