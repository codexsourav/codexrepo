import React, { useEffect, useState } from 'react';
import styles from './styles/explore.module.css'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import makeApi from '@/Lib/makeApi';
import Loading from '@/Component/loading';
import { Link } from 'react-router-dom';
import { ICabData, IRouteData } from '@/Interfaces/cabs';

import { airportTripType } from '../Home/Componets/tabs/Airport/Airport';
import { CarBox } from '@/Component/Explore/CabBox';
import { EditTrip } from './ExitTrip';

// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];


const Explore = () => {

    const [cabs, setCabs] = useState<null | { cabs: ICabData[], destination: IRouteData }>(null);
    const [isError, setError] = useState(false)
    const localKm = ["40", "80", "120"];
    const localHr = ["4", "8", "12"];

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

    const valiDatePageData = () => {
        if (type == "airport") {

            return !(!airportname || !location || !pickdate || !picktime || !trip)

        } else if (type == "local") {
            return !(!pickupaddress || !pickdate || !picktime)
        } else if (type == "oneway") {
            return !(!pickupaddress || !dropaddress || !pickdate || !picktime)
        } else if (type == "roundtrip") {
            return !(!pickupaddress || !dropaddress || !returndate || !pickdate || !picktime)
        } else {
            console.log("this error");
            setError(true);

            return false;
        }
    };

    useEffect(() => {

        if (valiDatePageData()) {
            loadCabsData();
        } else {
            console.log("error");

            // window.location.replace("/")
        }
    }, []);

    // this is loader 
    if (isError) {
        return <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className='text-3xl font-bold mb-5'>No Cabs Found On This Root</h1>
            <Link to="/">Please Try Again</Link>
        </div>
    } else if (!cabs) {
        return <div className="mt-16"><Loading /></div>
    } else if (isError || cabs.cabs.length == 0) {
        return <div className="w-screen h-screen flex justify-center items-center flex-col">
            <h1 className='text-3xl font-bold mb-5'>No Cabs Found On This Root</h1>
            <Link to="/">Please Try Again</Link>
        </div>
    }

    return (
        <>
            {/* <PickCabType /> */}
            {/* <div className="h-14 shadow mt-16 w-full bg-orange-600 mb-10 flex justify-center items-center font-bold text-white">
                <h1>PRICE INCLUSIVE OF ALL TOOLS AND TAXES</h1>
            </div> */}
            <div className={`${styles.explore} container`}>
                <div className="">
                    <div className={`${styles.info}`}>
                        <h2 className='text-xl font-bold' >Your Trip Info</h2>

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

                <div className="flex justify-center items-center w-full flex-col">
                    {type == "local" ? <div className="px-6 mb-5 min-w-[400px] ">
                        <Tabs defaultValue={localKm[localTab]} className="w-full px-4 py-1" >
                            <TabsList className='w-full bg-orange-100' >
                                {
                                    localKm.map((e, i) => {
                                        return <TabsTrigger value={e.toString()} key={"tab-" + i} className='w-full bg-orange-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white font-bold' onClick={() => setLocalTab(i)} >{localHr[i]}hrs | {e}KM</TabsTrigger>
                                    })
                                }
                            </TabsList>
                        </Tabs>
                    </div> : null}
                    <div className={`${styles.cars} w-full`}>
                        {
                            cabs.cabs.map((e: ICabData, i: any) => <CarBox km={(cabs?.destination?.data?.distance?.value ? (cabs?.destination?.data?.distance?.value / 1000) : +localKm[localTab])} key={"cab-" + i} type={type!} data={e} />)
                        }
                    </div>
                </div>
            </div>
            {updateTrip ? <EditTrip onClose={() => setUpdateTrip(false)} /> : null}
            {/* <PickCabType /> */}
        </>
    );
};

export default React.memo(Explore);








// function PickCabType() {
//     return (
//         <div className='fixed top-0 right-0 w-screen h-screen bg-black/50 z-[999] justify-center items-center flex'>
//             <div className="relative w-10/12 max-w-96 h-96 bg-white p-5 rounded-xl shadow-lg flex justify-between items-center flex-col" >
//                 <div className="absolute right-3 text-orange-300 cursor-pointer hover:text-orange-500"><IoCloseOutline size={30} /></div>
//                 <h1 className='text-center font-bold uppercase mt-3 text-lg text-orange-600'>Chose Cab Type</h1>
//                 <p className='text-center'>Select Your Booking type BABAG-assured secure or your booking</p>
//                 <div className="grid grid-cols-2 gap-3 ">
//                     <div className="relative flex flex-col justify-between items-center w-full h-36 border-2 border-orange-100 hover:border-orange-400 overflow-hidden rounded-xl">
//                         <div className=""></div>
//                         <img src="https://babagcabs.com/1706125598780_8o1ifd.webp" className='w-full h-24 object-contain' />
//                         <div className=" bg-orange-400 text-sm  text-white w-full justify-center items-center flex h-6 uppercase">BABAG</div>
//                     </div>
//                     <div className="relative flex flex-col justify-between items-center w-full h-36 border-2 border-orange-100 hover:border-orange-400 overflow-hidden rounded-xl">
//                         <div className=""></div>
//                         <img src="https://babagcabs.com/1706125598780_8o1ifd.webp" className='w-full h-24 object-contain' />
//                         <div className=" bg-orange-400 text-sm  text-white w-full justify-center items-center flex h-6 uppercase">BABAG-assured</div>
//                     </div>

//                 </div>
//                 <div className=" w-full bg-orange-100 hover:bg-orange-500 hover:text-white cursor-pointer h-12 justify-center items-center flex rounded-xl font-bold uppercase" style={{ transition: "0.5s" }}>Book Now</div>
//             </div>
//         </div>
//     )
// }

