import React from 'react';
import styles from './styles/oneway.module.css'
import { generateTimeArray } from '@/utils/GetTime';
import GoogleMapInput from '@/Component/GoogleMapInput/GoogleMapInput';
import { useDispatch, useSelector } from 'react-redux';
import StoreType, { AppDispatch } from '@/Interfaces/storeInterface';
import { IOneWay, setOneWay } from '@/Redux/TripBox/OneWay';
import { errorToast } from '@/Lib/showToast';
import { validateDateDifference } from '@/Lib/getVewDate';


// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];


const OneWay = () => {

    const data = useSelector((store: StoreType) => store.oneWay)
    const diapatch = useDispatch<AppDispatch>();

    const setData = (name: keyof IOneWay, value: string) => {
        diapatch(setOneWay({ name, value }))
    };

    const valiDateData = (data: IOneWay): string | boolean => {
        const { from, to, pickDate, time } = data;
        if (!from.trim()) {
            return 'Please enter a "From" location.';
        }
        if (!to.trim()) {
            return 'Please enter a "To" location.';
        }
        if (!pickDate) {
            return 'Please select Pickup date.';
        }
        if (!time) {
            return 'Please Select Pickup time.';
        } if (validateDateDifference(data.pickDate, new Date().toISOString())) {
            return 'Invalid Pickup Date.';
        } if (from == to) {
            return 'From or To Not Be Same';
        }
        return true;
    };


    const exploreCabs = () => {
        const valid = valiDateData(data);
        if (valid != true) {
            errorToast(valid.toString());
            return false;
        } else {
            window.location.href = (`/explore?type=oneway&pickupaddress=${data.from}&dropaddress=${data.to}&pickdate=${data.pickDate}&picktime=${data.time}`)
        }
    };


    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.oneway}>

                <GoogleMapInput label='From' placeholder='Ex: Delhi' onChenge={(places) => {
                    if (places) {
                        const locationData = places.formatted_address.toString();
                        setData("from", locationData);
                    }
                }} />

                <GoogleMapInput label='To' placeholder='Ex: Kolkata' onChenge={(places) => {
                    if (places) {
                        const locationData = places.formatted_address.toString();
                        setData("to", locationData);
                    }
                }} />

                <div>
                    <label >Pickup Date</label>
                    <input type="date" name="date" id="date" className="tabinput" onChange={(e) => {
                        setData("pickDate", e.target.value)
                    }} />
                </div>
                <div>
                    <label >Pickup Time</label>
                    <select name="time" id="time" className='tabinput' onChange={(e) => {
                        setData("time", e.target.value)
                    }} >
                        <option value="" selected>00.00 --</option>
                        {
                            timeArray.map((e, i) => {
                                return <option key={"time-" + i} value={e} >{e}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <button className='searchBtn' onClick={exploreCabs}>Explore</button>
        </>
    );
};

export default React.memo(OneWay);

