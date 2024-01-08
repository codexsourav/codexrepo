import { useEffect, useState } from "react";

export const useWindowIsScroll = (): boolean => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const scrollThreshold = 70 + 35;
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const shouldHideNavbar = currentScrollPos > prevScrollPos && currentScrollPos > scrollThreshold;
        setPrevScrollPos(currentScrollPos);
        setVisible(!shouldHideNavbar);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);
    return visible;
}
