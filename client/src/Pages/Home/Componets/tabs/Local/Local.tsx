import React from 'react';
import styles from './styles/local.module.css'
import { generateTimeArray } from '@/utils/GetTime';
import { LocalAutocomplete } from '@/Component/GoogleMapInput/GoogleMapInput';

import { useDispatch, useSelector } from 'react-redux';
import StoreType, { AppDispatch } from '@/Interfaces/storeInterface';
import { ILocal, setLocal } from '@/Redux/TripBox/Local';
import { validateDateDifference } from '@/Lib/getVewDate';
import { errorToast } from '@/Lib/showToast';

// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];


const Local = () => {

    const data = useSelector((store: StoreType) => store.local)
    const diapatch = useDispatch<AppDispatch>();

    const setData = (name: keyof ILocal, value: string) => {
        diapatch(setLocal({ name, value }))
    };

    const validateLocalData = (data: ILocal): string | boolean => {
        const { form, pickDate, time } = data;

        if (!form.trim()) {
            return 'Please enter "Form" location.';
        }

        if (!pickDate.trim()) {
            return 'Please select "Pick Date" value.';
        }
        if (!time.trim()) {
            return 'Please select pickup time';
        }
        if (validateDateDifference(data.pickDate, new Date().toISOString())) {
            return 'Invalid Pickup Date.';
        }

        return true;
    };

    const exploreCabs = () => {
        const validate = validateLocalData(data);
        if (validate == true) {
            window.location.href = (`/explore/local?type=local&pickupaddress=${data.form}&pickdate=${data.pickDate}&picktime=${data.time}`)
        } else {
            errorToast(validate.toString());
        }
    }

    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.local}>

                <LocalAutocomplete value={data.form} label='Pickup Address' placeholder='Enter Pickup Address' onChenge={(places) => {

                    setData('form', places);

                }} />

                <div>
                    <label >Pickup Date</label>
                    <input type="date" name="date" id="date" className="tabinput" onChange={(e) => setData('pickDate', e.target.value)} />
                </div>

                <div>
                    <label >Pickup Time</label>
                    <select name="time" id="time" className='tabinput' onChange={(e) => setData('time', e.target.value)} >
                        <option value="" selected>00:00 --</option>
                        {
                            timeArray.map((e, i) => {
                                return <option key={"timeround-" + i} value={e} >{e}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <button className='searchBtn' onClick={exploreCabs}>Explore</button>
        </>
    );
};

export default React.memo(Local);

