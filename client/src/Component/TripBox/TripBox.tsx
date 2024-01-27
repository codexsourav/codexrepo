import React, { ReactNode, useEffect, useState } from "react"
import styles from './styles/tripbox.module.css';
import OneWay from "@/Pages/Home/Componets/tabs/OneWay/OneWay";
import RoundTrip from "@/Pages/Home/Componets/tabs/RoundTrip/RoundTrip";
import Local from "@/Pages/Home/Componets/tabs/Local/Local";
import Airport from "@/Pages/Home/Componets/tabs/Airport/Airport";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Interfaces/storeInterface";
import { resetOneWay } from "@/Redux/TripBox/OneWay";
import { resetRoundTrip } from "@/Redux/TripBox/RoundTrip";
import { resetAirport } from "@/Redux/TripBox/Airport";
import { resetLocal } from "@/Redux/TripBox/Local";

function TripBox({ setIndex = (e: any) => { } }: { setIndex?: any }) {
    const [tabinex, setTabinex] = useState<number>(0);
    const tabs: ReactNode[] = [<OneWay />, <RoundTrip />, <Local />, <Airport />];
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(resetOneWay());
        dispatch(resetRoundTrip());
        dispatch(resetLocal());
        dispatch(resetAirport());
    }, [tabinex])


    return (
        <div className={`${styles.sideBox} container `}>
            <div className={styles.tabs}>
                <div onClick={() => { setIndex(0); setTabinex(0) }} className={`${styles.tab} ${tabinex == 0 ? styles.active : null}`}>One Way</div>
                <div onClick={() => { setIndex(1); setTabinex(1) }} className={`${styles.tab} ${tabinex == 1 ? styles.active : null}`}>Round Trip</div>
                <div onClick={() => { setIndex(2); setTabinex(2) }} className={`${styles.tab} ${tabinex == 2 ? styles.active : null}`}>Local</div>
                <div onClick={() => { setIndex(3); setTabinex(3) }} className={`${styles.tab} ${tabinex == 3 ? styles.active : null}`}>Airport</div>
            </div>
            <div className={styles.tabview}>
                {tabs[tabinex]}
            </div>
        </div>
    )
}
export default React.memo(TripBox)