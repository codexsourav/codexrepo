// import { CarBox } from "@/Component/Explore/CabBox"
import ExploreWrapper from "../ExploreWrapper"
import { airportTripType } from "@/Pages/Home/Componets/tabs/Airport/Airport"

function AirportExplore() {
    // get url paramiters 
    const authResult = new URLSearchParams(window.location.search);

    // Airport Data
    const airportname = authResult.get("airportname");
    const trip = authResult.get("trip");
    const location = authResult.get("location");

    return (
        <ExploreWrapper  >
            <div className="col-span-1 md:col-span-4">
                <div className=" border-2 border-orange-100 transition-all  rounded-xl relative md:sticky md:top-24">
                    <div className="border-b-2 border-orange-100 p-2 text-center">
                        <h1 className="uppercase font-bold text-orange-600">Your Trip Info</h1>
                    </div>
                    <div className="p-5">
                        <ul className="font-bold text-sm flex flex-col gap-[8px] text-orange-950">
                            <li>Trip :  <span className="text-orange-800"> {airportTripType[+trip!]} </span></li>
                            <li>{trip == "0" ? "Pickup" : "Airport Name"} :  <span className="text-orange-800">{trip == "0" ? location : airportname}</span></li>
                            <li>{trip == "1" ? "Drop Address" : "Airport Name"} : <span className="text-orange-800">{trip == "1" ? location : airportname}</span></li>
                            <li>Distance :  <span className="text-orange-800">300 KM</span></li>
                        </ul>
                        <button className="w-full mt-6 border-2 border-orange-100 hover:border-orange-300  p-2 uppercase font-bold text-orange-300 hover:text-orange-400 rounded-xl">New Trip</button>
                    </div>
                </div>
            </div>
            <div className="col-span-1 md:col-span-8 grid md:grid-cols-2 gap-6 mb-40" >
                {/* <CarBox type="ddf" km={300} data={{ _id: 'sdfsd', baserate: 100, carnumber: "sadsadsa", date: "", delete: false, discount: 10, image: '1706378271507_b8azle.webp', isAllow: true, maxpac: 4, name: 'sasad', parkm: 10 }} /> */}
            </div>

        </ExploreWrapper >

    )
}
export default AirportExplore