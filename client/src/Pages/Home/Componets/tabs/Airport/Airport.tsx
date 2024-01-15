import React, { useState } from 'react';
import styles from './styles/airport.module.css'
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { generateTimeArray } from '@/utils/GetTime';

const Airport = () => {
    const [tripType, setTripType] = useState<number>(0)
    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.airport}>
                <div>
                    <label >TRIP</label>
                    <select name="date" id="date" className="tabinput" onChange={(e) => setTripType(Number(e.target.value))} >
                        <option value={0} >Drop Airport</option>
                        <option value={1}>PickUp To Airport</option>
                    </select>
                </div>

                <div>
                    <label >{tripType ? "Airport Name" : "Pickup Address"}</label>
                    <ReactGoogleAutocomplete
                        apiKey={""}
                        onPlaceSelected={(place) => console.log(place)}
                        className={"tabinput"}
                        placeholder={tripType ? "Enter Airport Name" : "Your Address"}
                    />
                </div>
                <div>
                    <label >{tripType ? "Drop Address" : "Drop Airport"}</label>
                    <ReactGoogleAutocomplete
                        apiKey={""}
                        onPlaceSelected={(place) => console.log(place)}
                        className={"tabinput"}
                        placeholder={tripType ? "Your Address" : "Enter Airport Name"}
                    />
                </div>
                <div>
                    <label >Pickup Date</label>
                    <input type="date" name="date" id="date" className="tabinput" />
                </div>

                <div>
                    <label >Pickup Time</label>
                    <select name="time" id="time" className='tabinput'>
                        {
                            timeArray.map((e, i) => {
                                return <option key={"timeround-" + i} value={e} >{e}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </>
    );
};

export default React.memo(Airport);

