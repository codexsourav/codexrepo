import React, { useState } from 'react';
import styles from './styles/navbar.module.css'

import { LuUser2 } from "react-icons/lu";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FaPhone } from "react-icons/fa6";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false)
    return (
        <>
            <div className={styles.navbar}>
                <div className={`${styles.nav} container`}>
                    <IoMenuOutline onClick={() => setShowMenu(true)} size={24} color="#fff" style={{ display: "none" }} className={styles.menuicon} />
                    <img src="/images/logo.png" alt="logo" height={40} className={`${styles.logo} `} />
                    <div className='  items-center justify-center hidden md:flex'>
                        <div className="bg-orange-600 text-white rounded-full flex items-center justify-center gap-3 h-6 overflow-hidden">
                            <div className="bg-white w-9 h-6 rounded-full text-orange-600 flex items-center justify-center">
                                <FaPhone size={12} />
                            </div>
                            <div className=' text-sm font-bold pr-4'> 01169266014</div>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={`${styles.links} ${showMenu ? styles.active : null}`}>
                            <IoCloseOutline onClick={() => setShowMenu(false)} size={40} color="#fff" style={{ display: "none" }} className={styles.closeicon} />
                            <a href="/">Home</a>
                            <a href="/">About</a>
                            <a href="/">Blog</a>
                            <a href="/">Services</a>
                        </div>
                        {/* {localStorage.getItem(import.meta.env.VITE_AUTHKEY) ? <a href="#" className='flex justify-center items-center gap-3 ' ><IoWallet size={24} className={styles.wallet} />  <span className='hidden sm:block'  >₹250.0</span></a> : null} */}
                        <a href={localStorage.getItem(import.meta.env.VITE_AUTHKEY) ? "/profile" : "/auth"}> {localStorage.getItem(import.meta.env.VITE_AUTHKEY) ?
                            <Avatar className='w-8 h-8 text-sm'>
                                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                <AvatarFallback className='bg-orange-700' >U</AvatarFallback>
                            </Avatar>
                            : <LuUser2 size={24} />}</a>
                    </div>
                </div>
            </div >

        </>
    );
};

export default React.memo(Navbar);

