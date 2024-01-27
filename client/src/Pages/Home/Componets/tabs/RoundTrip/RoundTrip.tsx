import React, { useState } from 'react';
import styles from './styles/roundtrip.module.css'
import { generateTimeArray } from '@/utils/GetTime';
import GoogleMapInput, { PlacesAutocomplete } from '@/Component/GoogleMapInput/GoogleMapInput';
import { useDispatch, useSelector } from 'react-redux';
import StoreType, { AppDispatch } from '@/Interfaces/storeInterface';
import { IRoundTrip, setRoundTrip } from '@/Redux/TripBox/RoundTrip';
import { errorToast } from '@/Lib/showToast';
import { validateDateDifference } from '@/Lib/getVewDate';
import useWindowDimensions from '@/Hooks/useWindowDimensions';

// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];



const RoundTrip = () => {
    const data = useSelector((store: StoreType) => store.roundTrip)

    const { width } = useWindowDimensions();
    const diapatch = useDispatch<AppDispatch>();
    const setData = (name: keyof IRoundTrip, value: string) => {
        diapatch(setRoundTrip({ name, value }))
    };

    const [locations, setLocations] = useState<string[]>([]);

    const addToLocations = () => {
        // Check if all existing locations are not empty
        const allLocationsNotEmpty = locations.every(location => location.trim() !== "");

        if (!data.to) {
            errorToast("Enter Location to Add New");

        } else if (!allLocationsNotEmpty) {
            errorToast("Enter Location to Add New");
        } else if (locations.length > 3) {
            errorToast("No More Locations Add");
        } else {
            setLocations([...locations, ""]);
        }
    };


    const removeLocation = (index: number) => {
        // Use filter to create a new array without the item at the specified index
        const updatedLocations = locations.filter((_, i) => i !== index);
        setLocations(updatedLocations);

    };




    console.log(locations);
    const valiDateData = (data: IRoundTrip): string | boolean => {
        const { form, to, pickDate, returnDate, time } = data;
        const allLocationsNotEmpty = locations.every(location => location.trim() !== "");

        if (!form.trim()) {
            return 'Please enter "From" location.';
        }

        if (!allLocationsNotEmpty) {
            return 'Please enter "To" locations.';
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
            const stringRepresentation = locations.join("||");
            window.location.href = (`/explore?type=roundtrip&pickupaddress=${data.form}&dropaddress=${stringRepresentation}&pickdate=${data.pickDate}&returndate=${data.returnDate}&picktime=${data.time}`);
        } else {
            errorToast(validate.toString());
        }
    }


    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.roundtrip}>

                <GoogleMapInput label='From' placeholder='Ex: Delhi' onChenge={(place) => {

                    if (place) {
                        setData('form', place.formatted_address.toString())
                    }

                }} />
                <div className="grid-cols-12 w-full" style={{ display: "grid" }} >

                    <GoogleMapInput label='To' dClass="col-span-10" placeholder='Ex: Kolkata' onChenge={(place) => {
                        if (place) {
                            setData('to', place.formatted_address.toString())
                        }
                    }} />
                    <div className="tabinput col-span-2 flex justify-end items-end cursor-pointer" onClick={addToLocations}><div className=""></div>
                        <div className="text-center text-lg ">+</div>
                    </div>

                </div>

                {width >= 800 ? null : <RoundTripToS locations={locations} addToLocations={addToLocations} removeLocation={removeLocation} setLocations={setLocations} />}


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
            {width <= 800 ? null : <RoundTripToS locations={locations} addToLocations={addToLocations} removeLocation={removeLocation} setLocations={setLocations} />}
            <button className='searchBtn' onClick={exploreCabs}>Explore</button>
        </>
    );
};

export default React.memo(RoundTrip);


function RoundTripToS({ locations, setLocations, removeLocation }: { locations: string[], setLocations: any, addToLocations: any, removeLocation: any }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-0 md:mt-5">
            {
                locations.map((d, i) => {
                    return <div className="grid-cols-12 w-full" style={{ display: "grid" }} key={"key+" + i}>
                        <PlacesAutocomplete
                            value={d}
                            tweek='top-[68px]'

                            lbclass='text-sm font-bold'
                            onChenge={(e) => {
                                var data = [...locations];
                                data[i] = e;
                                setLocations(data);
                            }} airport={false} label={'To'} dClass='col-span-11' placeholder='Ex: Kolkata' />
                        <div className="tabinput p-0 col-span-1 flex flex-col cursor-pointer w-full h-full justify-center items-center bg-red-950" onClick={() => removeLocation(i)}>

                            <div className={`text-red-600 rotate-45  pl-5 h-full w-full text-right text-lg flex justify-center items-end `}>+</div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

