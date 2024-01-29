import { ICabData } from "@/Interfaces/cabs";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from './styles.module.css'
import { CabDetails } from "./CabDtl";
export const CarBox = ({ data, km, type, discountPrice, price, totalKm }:
    { data: ICabData, km: number, type: string, price?: number, discountPrice?: number, totalKm?: number }) => {
    const query = useLocation();
    const [show, setShow] = useState<any>(null);
    const rediractUrl = () => {
        if (!localStorage.getItem(import.meta.env.VITE_AUTHKEY)) {
            return "/auth" + query.search + `&car=${data._id}` + (type == "local" ? "&km=" + km : "");
        } else {
            return "/booking" + query.search + `&car=${data._id}` + (type == "local" ? "&km=" + km : "");
        }
    };
    return <div className={`${styles.carbox} relative`}>
        <p className='absolute right-5 top-3 bg-orange-600 font-bold px-2 text-[12px] rounded text-white py-1'>{data.discount}% OFF</p>
        <div className="flex justify-between items-start  pt-4 w-full">
            <div className="pl-5">
                <h1 className='text-xl' >{data.name}</h1>
                <p className='font-bold text-2xl text-orange-600 '>₹{price}.00</p>
                <p className='font-bold text-sm text-slate-500 line-through hover:line-through'>₹{discountPrice}.00</p>
                <p className='font-bold mt-2'>up to {totalKm} Km</p>
            </div>
            <img src={import.meta.env.VITE_APIURL + "/" + data.image} alt="car" className='h-32 w-full object-contain pl-5 pr-2' />

        </div>
        <div className={`${styles.infobox} px-5`}>
            {/* <div className={styles.infocar}><p>Base Rate:</p> <p>₹{data.baserate}.00</p></div> */}
            <div className={styles.infocar}><p>Par 1/KM:</p> <p>₹{data.parkm}.00</p></div>
            <div className={styles.infocar}><p>Max Passengers:</p> <p>{data.maxpac}</p></div>
            {/* <div className={styles.infocar}><p>Total Price:</p> <p>₹{Math.round(km * data.parkm)}.00</p></div> */}
        </div>
        <div className="grid grid-cols-12 w-full place-items-center px-3">
            <button onClick={() => setShow({})} className={`${styles.bookbtn} w-full bg-orange-100  col-span-4 uppercase text-orange-500`}>Details</button>
            <a href={rediractUrl()} className={`${styles.bookbtn} w-full bg-orange-100 col-span-8 text-orange-500`}>BOOK NOW</a>
        </div>
        {show != null ? <CabDetails show={setShow} /> : null}
    </div>

}




