import React from 'react';
import styles from './styles/roundtrip.module.css'
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { generateTimeArray } from '@/utils/GetTime';

const RoundTrip = () => {
    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.roundtrip}>
                <div>
                    <label >From</label>
                    <ReactGoogleAutocomplete
                        apiKey={""}
                        onPlaceSelected={(place) => console.log(place)}
                        className={"tabinput"}
                        placeholder='Ex : Mumbai'
                    />
                </div>
                <div>
                    <label >To</label>
                    <ReactGoogleAutocomplete
                        apiKey={""}
                        onPlaceSelected={(place) => console.log(place)}
                        className={"tabinput"}
                        placeholder='Ex : Bangalore'
                    />
                </div>
                <div>
                    <label >Pickup Date</label>
                    <input type="date" name="date" id="date" className="tabinput" />
                </div>
                <div>
                    <label >Return</label>
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

export default React.memo(RoundTrip);

