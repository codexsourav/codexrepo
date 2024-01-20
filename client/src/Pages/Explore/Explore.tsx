import React, { useEffect, useState } from 'react';
import styles from './styles/explore.module.css'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import makeApi from '@/Lib/makeApi';
import Loading from '@/Component/loading';
import { Link, useLocation } from 'react-router-dom';
import { ICabData, IRouteData } from '@/Interfaces/cabs';
import TripBox from '@/Component/TripBox/TripBox';
import { VscClose } from "react-icons/vsc";
import { airportTripType } from '../Home/Componets/tabs/Airport/Airport';

// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];



const Explore = () => {

    const [cabs, setCabs] = useState<null | { cabs: ICabData[], destination: IRouteData }>(null);
    const [isError, setError] = useState(false)
    const localKm = ["8", "12", "20"];
    const [localTab, setLocalTab] = useState(0);
    const [updateTrip, setUpdateTrip] = useState<boolean>(false)
    // get url paramiters 
    const authResult = new URLSearchParams(window.location.search);


    const type = authResult.get("type");
    const pickdate = authResult.get("pickdate");
    const picktime = authResult.get("picktime");

    const pickupaddress = authResult.get("pickupaddress");

    const dropaddress = authResult.get("dropaddress");

    const returndate = authResult.get("returndate");

    // Airport Data 
    const airportname = authResult.get("airportname");
    const trip = authResult.get("trip");
    const location = authResult.get("location");

    // pickup location 
    const locationName = () => {
        if (type == "airport") {
            return `Airport Address: ${airportname}`;
        } else {
            return `Pickup Address: ${pickupaddress}`;
        }
    };

    // drop address 
    const dropName = () => {
        if (type == "airport") {
            if (trip == "0") {
                return "Pickup Address: " + location;
            } else {
                return "Drop Address: " + location;
            }
        } else {
            return `Drop Address: ${dropaddress}`;
        }
    };

    // load cabs data or map data
    const loadCabsData = async () => {
        setCabs(null);
        try {
            const from = type == "airport" ? airportname : pickupaddress;
            const to = type == "airport" ? location : dropaddress;
            const data = await makeApi({ path: `/api/explore/${type}`, method: "POST", data: { from, to } });
            setCabs(data.data);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    useEffect(() => {
        loadCabsData();
    }, [])

    // this is loader 
    if (!cabs) {
        return <div className="mt-16"><Loading /></div>
    } else if (isError || cabs.cabs.length == 0) {
        return <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className='text-3xl font-bold mb-5'>No Cabs Found On This Root</h1>
            <Link to="/">Please Try Again</Link>
        </div>
    }

    return (
        <>
            <div className={`${styles.explore} container`}>
                <div className="">
                    <div className={`${styles.info}`}>
                        <h2 className='text-xl font-bold' >Your Trip Info</h2>
                        {type == "local" ? <Tabs defaultValue={localKm[localTab]} className="w-full px-4 py-1" >
                            <TabsList className='w-full' >
                                {
                                    localKm.map((e, i) => {
                                        return <TabsTrigger value={e.toString()} key={"tab-" + i} className='w-full' onClick={() => setLocalTab(i)} >{e}KM</TabsTrigger>
                                    })
                                }
                            </TabsList>
                        </Tabs> : null}
                        <ul>
                            <li className='capitalize'>Trip: {type == "airport" ? airportTripType[+(trip || "0")] : type}</li>
                            <li>{locationName()}</li>
                            {type == "local" ? null : <li>{dropName()}</li>}
                            <li>Pickup Date: {pickdate}</li>
                            {type == "roundtrip" ? <li>Return Date: {returndate}</li> : null}
                            <li>Pickup time: {picktime}</li>
                            {type != "local" ? <li className='capitalize'>Distance: {cabs.destination.data?.distance?.text}</li> : null}
                        </ul>
                        <button className={styles.modify} onClick={() => setUpdateTrip(true)} >NEW TRIP</button>
                    </div>
                </div>

                <div className="">
                    <div className={styles.cars}>
                        {
                            cabs.cabs.map((e: ICabData, i: any) => <CarBox km={(cabs?.destination?.data?.distance?.value ? (cabs?.destination?.data?.distance?.value / 1000) : +localKm[localTab])} key={"cab-" + i} type={type!} data={e} />)
                        }
                    </div>
                </div>
            </div>
            {updateTrip ? <EditTrip onClose={() => setUpdateTrip(false)} /> : null}
        </>
    );
};

export default React.memo(Explore);


const CarBox = ({ data, km, type }: { data: ICabData, km: number, type: string }) => {
    const query = useLocation();
    const rediractUrl = () => {
        if (!localStorage.getItem(import.meta.env.VITE_AUTHKEY)) {
            return "/auth" + query.search + (type == "local" ? "&km=" + km : "");
        } else {
            return "/booking" + query.search + (type == "local" ? "&km=" + km : "");
        }
    };
    return <div className={styles.carbox}>
        <img src={import.meta.env.VITE_APIURL + "/" + data.image} alt="car" className='h-36 w-full object-contain' />
        <h1 className='font-bold text-2xl' >{data.name}</h1>
        <div className={styles.infobox}>
            <div className={styles.infocar}><p>Base Rate:</p> <p>₹{data.baserate}.00</p></div>
            <div className={styles.infocar}><p>Par 1/KM:</p> <p>₹{data.parkm}.00</p></div>
            <div className={styles.infocar}><p>Max Passengers:</p> <p>{data.maxpac}</p></div>
            <div className={styles.infocar}><p>Total Price:</p> <p>₹{Math.round(km * data.parkm)}.00</p></div>
        </div>
        <a href={rediractUrl()} className={styles.bookbtn}>BOOK NOW</a>
    </div>
}



function EditTrip({ onClose }: { onClose: Function }) {
    return (
        <div className="w-screen h-screen fixed top-0 right-0 bg-black/90 " >
            <div className="flex justify-center items-center -mt-16 relative md:mt-52 "><TripBox /></div>
            <div className="absolute top-20 right-10 cursor-pointer" >
                <VscClose size={40} color="#fff" onClick={onClose} />
            </div>
        </div>
    )
}
