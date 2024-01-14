import React from 'react';
import styles from './styles/local.module.css'
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { generateTimeArray } from '@/utils/GetTime';

const Local = () => {
    const timeArray = generateTimeArray();
    return (
        <>
            <div className={styles.local}>
                <div>
                    <label >City</label>
                    <ReactGoogleAutocomplete
                        apiKey={""}
                        onPlaceSelected={(place) => console.log(place)}
                        className={"tabinput"}
                        placeholder='your city'
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

export default React.memo(Local);

