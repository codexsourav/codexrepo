import React, { useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import styles from './styles/navbar.module.css'
import { useWindowIsScroll } from '../../Hooks/useWindowIsScroll';
import { useWindowScrollPositions } from '../../Hooks/useWindowScrollPositions';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const isScroll = useWindowIsScroll();
    const { scrollY } = useWindowScrollPositions();
    const location = useLocation();
    useEffect(() => {
        if (showNav) {
            setShowNav(false);
        }
    }, [location]);


    useEffect(() => {
        if (showNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "scroll"
        }
    }, [showNav]);


    return (

        <>
            <div className={`${styles.navbar} ${scrollY <= 0 ? null : (isScroll ? styles.navbarShow : styles.navbarHide)}`} >
                <div className={styles.logoSection} >
                    <FiMenu className={styles.menuBtn} size={25} style={{ display: "none" }} onClick={() => setShowNav(true)} />
                    <img src='/images/logo.png' alt="our logo" className={styles.logo} height={80} />
                </div>
                <div className={`${styles.menuSection} ${showNav ? styles.showMenuSection : null}`}>
                    <IoCloseOutline className={styles.menuCloseBtn} size={50} style={{ display: "none" }} onClick={() => setShowNav(false)} />
                    <ul className={styles.menu}>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#">About US</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Our Work</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </div>
                {/* <div className={styles.actions} onClick={() => dispatch(setContactPopUp(true))}>
                    <RiCustomerService2Line className={styles.menuSupportBtn} size={25} style={{ display: "none" }} />
                    <button className={styles.actionBtn} >Let`s Talk</button>
                </div> */}
            </div>
        </>
    );
};

export default React.memo(Navbar);

