import React from 'react';
import styles from './styles/roundtrip.module.css'
import { generateTimeArray } from '@/utils/GetTime';
import GoogleMapInput from '@/Component/GoogleMapInput/GoogleMapInput';
import { useDispatch, useSelector } from 'react-redux';
import StoreType, { AppDispatch } from '@/Interfaces/storeInterface';
import { IRoundTrip, setRoundTrip } from '@/Redux/TripBox/RoundTrip';
import { errorToast } from '@/Lib/showToast';
import { validateDateDifference } from '@/Lib/getVewDate';

// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];



const RoundTrip = () => {
    const data = useSelector((store: StoreType) => store.roundTrip)
    const diapatch = useDispatch<AppDispatch>();
    const setData = (name: keyof IRoundTrip, value: string) => {
        diapatch(setRoundTrip({ name, value }))
    };

    const valiDateData = (data: IRoundTrip): string | boolean => {
        const { form, to, pickDate, returnDate, time } = data;

        if (!form.trim()) {
            return 'Please enter "From" location.';
        }

        if (!to.trim()) {
            return 'Please enter "To" location.';
        }

        if (!pickDate) {
            return 'Please Select PickUp Date.';
        }

        if (!returnDate) {
            return 'Please Select Return Date.';
        }

        if (!time.trim()) {
            return 'Please Select Pickup time.';
        } if (validateDateDifference(data.pickDate, new Date().toISOString())) {
            return 'Invalid Pickup Date.';
        } if (validateDateDifference(data.returnDate, new Date().toISOString())) {
            return 'Invalid Return Date.';
        } if (validateDateDifference(data.returnDate, data.pickDate)) {
            return 'Invalid Pickup,Return Formate.';
        } if (form == to) {
            return 'From or To Not Be Same';
        }
        return true;
    };



    const exploreCabs = () => {
        const validate = valiDateData(data);
        if (validate == true) {
            window.location.href = (`/explore?type=roundtrip&pickupaddress=${data.form}&dropaddress=${data.to}&pickdate=${data.pickDate}&returndate=${data.returnDate}&picktime=${data.time}`);
        } else {
            errorToast(validate.toString());
        }
    }


    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.roundtrip}>

                <GoogleMapInput label='From' placeholder='Ex: Delhi' onChenge={(places) => {
                    if (places) {
                        const locationData = places.formatted_address.toString();
                        setData('form', locationData)
                    }
                }} />

                <GoogleMapInput label='To' placeholder='Ex: Kolkata' onChenge={(places) => {
                    if (places) {
                        const locationData = places.formatted_address.toString();
                        setData('to', locationData)
                    }
                }} />


                <div className={`md:col-span-2 ${styles.dateselect}`}>
                    <div>
                        <label >Pickup Date</label>
                        <input type="date" name="date" id="date" className="tabinput" onChange={(e) => setData('pickDate', e.target.value)} />
                    </div>
                    <div>
                        <label >Return Date</label>
                        <input type="date" name="date" id="date" className="tabinput" onChange={(e) => setData('returnDate', e.target.value)} />
                    </div>
                </div>

                <div>
                    <label >Pickup Time</label>
                    <select name="time" id="time" className='tabinput' onChange={(e) => setData('time', e.target.value)}>
                        <option value="" selected>00:00 --</option>
                        {
                            timeArray.map((e, i) => {
                                return <option key={"timeround-" + i} value={e} >{e}</option>
                            })
                        }
                    </select>
                </div>
            </div >
            <button className='searchBtn' onClick={exploreCabs}>Explore</button>
        </>
    );
};

export default React.memo(RoundTrip);

