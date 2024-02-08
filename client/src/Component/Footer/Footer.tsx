import React from 'react';
import styles from './styles/footer.module.css'
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { TbPhoneFilled } from "react-icons/tb";

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <div className={styles.about}>
                    <div className={styles.title}>ABOUT US</div>
                    <p className={styles.desc}>Babagcabs operates in the public transport market since 2024. Even though a relatively new company, BabagcaBs achieved within a short time to consolidate... </p>
                    <div className={styles.links}>
                        <a href="#"><FaFacebookF className={styles.icon} /></a>
                        <a href="#"><FaInstagram className={styles.icon} /></a>
                        <a href="#"><FaXTwitter className={styles.icon} /></a>
                        <a href="#"><FiYoutube className={styles.icon} /></a>
                    </div>
                </div>
                <div className={styles.linksmenu}>
                    <div className={styles.title}>Links</div>
                    <div className={styles.links}>

                        <ul>
                            <li>
                                <a href="#"> Home</a>
                            </li>

                            <li>
                                <a href="#">About Us</a>
                            </li>

                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Cabs</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="#">Blog</a>
                            </li>

                            <li>
                                <a href="#">Contact Us</a>
                            </li>

                            <li>
                                <a href="#">Reviews</a>
                            </li>
                            <li>
                                <a href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.address}>
                    <div className={styles.title}>Address</div>
                    <div className={styles.contents}>
                        <p>Address:  Sheetla Colony, Sector-6, Gurgaon Haryana 122006</p>
                        <a href='tel:01169266014' className='flex justify-start items-center'><TbPhoneFilled className={styles.icon} />01169266014</a>
                        {/* <p><TbPhoneFilled className={styles.icon} /> +91 8295936863</p> */}
                        <p><MdEmail className={styles.icon} /> support@babagcabs.com</p>
                    </div>
                </div>
            </div>
            <p style={{ textAlign: "center" }} className={styles.copyright}>Baba-Cabs 2023 © All Rights Reserved Terms of use</p>
        </>
    );
};

export default React.memo(Footer);

