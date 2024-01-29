import { CarBox } from "@/Component/Explore/CabBox"
import ExploreWrapper from "../ExploreWrapper"
import { useEffect, useState } from "react";
import { ICabData, IRouteData } from "@/Interfaces/cabs";
import makeApi from "@/Lib/makeApi";
import { Link } from "react-router-dom";
import Loading from "@/Component/loading";
import { EditTrip } from "../ExitTrip";
import { getCashBack } from "@/Lib/getCashBack";

function OneWayExplore() {
    const authResult = new URLSearchParams(window.location.search);
    const [cabs, setCabs] = useState<null | { cabs: ICabData[], destination: IRouteData }>(null);
    const [isError, setError] = useState(false)
    const [updateTrip, setUpdateTrip] = useState<boolean>(false)

    // const type = authResult.get("type");

    const pickdate = authResult.get("pickdate");
    const picktime = authResult.get("picktime");

    const pickupaddress = authResult.get("pickupaddress");
    const dropaddress = authResult.get("dropaddress");

    const LoadData = async () => {
        try {
            const data = await makeApi({ path: `/api/explore/oneway`, method: "POST", data: { from: pickupaddress, to: dropaddress } });
            setCabs(data.data);
        } catch (error) {
            setError(true);
        }
    }

    useEffect(() => {
        LoadData();
    }, []);



    // this is loader 
    if (isError) {
        return <div className="p-10 text-center w-screen h-screen flex justify-center items-center flex-col">
            <h1 className='text-3xl font-bold mb-5'>No Cabs Found On This Root</h1>
            <Link to="/">Please Try Again</Link>
        </div>
    } else if (!cabs) {
        return <div className="mt-16"><Loading /></div>
    } else if (isError || cabs.cabs.length == 0) {
        return <div className="p-10 text-center w-screen h-screen flex justify-center items-center flex-col">
            <h1 className='text-3xl font-bold mb-5'>No Cabs Found On This Root</h1>
            <Link to="/">Please Try Again</Link>
        </div>
    }


    return (
        <>
            <ExploreWrapper  >
                <div className="col-span-1 md:col-span-4">
                    <div className=" border-2 border-orange-100 transition-all  rounded-xl relative md:sticky md:top-24">
                        <div className="border-b-2 border-orange-100 p-2 text-center">
                            <h1 className="uppercase font-bold text-orange-600">Your Trip Info</h1>
                        </div>
                        <div className="p-5">
                            <ul className="font-bold text-sm flex flex-col gap-[8px] text-orange-950">
                                <li>Trip :  <span className="text-orange-800">One Way</span></li>
                                <li>Pickup :  <span className="text-orange-800">{pickupaddress}</span></li>
                                <li>Drop :  <span className="text-orange-800">{dropaddress}</span></li>
                                <li>Pickup :  <span className="text-orange-800">{pickdate} at {picktime}</span></li>
                                <li>Distance :  <span className="text-orange-800">{cabs.destination.data.distance.text}</span></li>
                            </ul>
                            <button onClick={() => setUpdateTrip(true)} className="w-full mt-6 bg-orange-100 hover:bg-orange-400  p-2 uppercase font-bold text-orange-500 hover:text-white transition-all rounded-xl">New Trip</button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-8 grid md:grid-cols-2 gap-6 mb-40" >
                    {
                        cabs.cabs.map((e) => {
                            const totalKm = (cabs.destination.data.distance.value / 1000);
                            const price = totalKm * e.parkm;
                            const mainPrice = price - getCashBack(price, e.discount);
                            return <CarBox
                                type="oneway"
                                km={Math.round(totalKm)}
                                data={e}
                                price={Math.round(mainPrice)}
                                discountPrice={Math.round(price)}
                                key={e._id}
                                totalKm={Math.round(totalKm)} />
                        })
                    }
                </div>

            </ExploreWrapper >
            {updateTrip ? <EditTrip onClose={() => setUpdateTrip(false)} /> : null}
        </>

    )
}

export default OneWayExplore;