import React from 'react';
import styles from './styles/airport.module.css'
import { generateTimeArray } from '@/utils/GetTime';
import GoogleMapInput from '@/Component/GoogleMapInput/GoogleMapInput';
import { useDispatch, useSelector } from 'react-redux';
import StoreType, { AppDispatch } from '@/Interfaces/storeInterface';
import { IAirport, setAirport } from '@/Redux/TripBox/Airport';
import { validateDateDifference } from '@/Lib/getVewDate';
import { errorToast } from '@/Lib/showToast';

// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];

export const airportTripType = ["Drop Airport", "PickUp To Airport"];

const Airport = () => {

    const data = useSelector((store: StoreType) => store.airport)
    const diapatch = useDispatch<AppDispatch>();

    const setData = (name: keyof IAirport, value: string) => {
        diapatch(setAirport({ name, value }))
    };

    const validateAirportData = (data: IAirport): string | boolean => {
        const { airport, location, pickDate, time } = data;

        if (airport.trim() === '') {
            return 'Please Select "Airport Name".';
        }

        if (location.trim() === '') {
            return `Please ${data.trip == 0 ? "Pockup" : "Drop"} "Location".`;
        }

        if (pickDate.trim() === '') {
            return 'Please Select "Pick Date".';
        }
        if (time.trim() === '') {
            return 'Please Pickup time.';
        }
        if (validateDateDifference(pickDate, new Date().toISOString())) {
            return 'Invalid Pickup Date.';
        }

        return true;
    };

    const exploreCabs = () => {
        const validate = validateAirportData(data);
        if (validate == true) {
            window.location.href = (`/explore?type=airport&trip=${data.trip}&airportname=${data.airport}&location=${data.location}&pickdate=${data.pickDate}&picktime=${data.time}`)
        } else {
            errorToast(validate.toString());
        }
    }

    const timeArray = generateTimeArray();
    return (
        <>

            <div className={styles.airport}>
                <div>
                    <label >TRIP</label>
                    <select name="date" id="date" className="tabinput" onChange={(e) => setData('trip', e.target.value)} >
                        <option value={0} >Drop Airport</option>
                        <option value={1}>PickUp To Airport</option>
                    </select>
                </div>
                <div className={`${styles.fld} ${data.trip == 0 ? styles.flip : null}`} >

                    <GoogleMapInput airport={true} label="Airport Name" placeholder="Enter Airport Name" onChenge={(places) => {
                        if (places) {
                            const locationData = places.formatted_address.toString();
                            setData('airport', locationData);
                        }
                    }} />

                    <GoogleMapInput label={data.trip ? "Drop Address" : "Pickup Adress"} placeholder="Your Address" onChenge={(places) => {
                        if (places) {
                            const locationData = places.formatted_address.toString();
                            setData('location', locationData);
                        }
                    }} />

                </div>

                <div className={styles.datetime}>
                    <div>
                        <label >Pickup Date</label>
                        <input type="date" name="date" id="date" className="tabinput" onChange={(e) => setData('pickDate', e.target.value)} />
                    </div>

                    <div>
                        <label >Pickup Time</label>
                        <select name="time" id="time" className='tabinput' onChange={(e) => setData('time', e.target.value)}>
                            <option value="">00:00 --</option>
                            {
                                timeArray.map((e, i) => {
                                    return <option key={"timeround-" + i} value={e} >{e}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

            </div>
            <button className='searchBtn' onClick={exploreCabs}>Explore</button>
        </>
    );
};

export default React.memo(Airport);

