import React, { useState } from 'react';
import styles from './styles/navbar.module.css'
import { FaRegUserCircle } from "react-icons/fa";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";



const Navbar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    return (
        <>
            <div className={styles.navbar}>
                <div className={`${styles.nav} container`}>
                    <IoMenuOutline onClick={() => setShowMenu(true)} size={24} color="#fff" style={{ display: "none" }} className={styles.menuicon} />
                    <img src="/images/logo.png" alt="logo" height={40} className={styles.logo} />
                    <div className={styles.menu}>
                        <div className={`${styles.links} ${showMenu ? styles.active : null}`}>
                            <IoCloseOutline onClick={() => setShowMenu(false)} size={40} color="#fff" style={{ display: "none" }} className={styles.closeicon} />
                            <a href="/">Home</a>
                            <a href="/">About</a>
                            <a href="/">Blog</a>
                            <a href="/">Services</a>
                        </div>
                        <a href="/"><FaRegUserCircle size={24} /></a>
                    </div>
                </div>
            </div>

        </>
    );
};

export default React.memo(Navbar);

