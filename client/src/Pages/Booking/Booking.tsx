import React from 'react';
import styles from './styles/booking.module.css'
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const Booking = () => {
    return (
        <>
            <div className="container">
                <div className={`${styles.booking}`}>
                    <div className={styles.contactForm}>
                        <h1>CONTACT & PICKUP DETAILS</h1>
                        <div className={styles.inputsec}>
                            <label >Name</label>
                            <input
                                className={"tabinput"}
                                placeholder='Enter Your Name'
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <label >Email</label>
                            <input
                                className={"tabinput"}
                                placeholder='Enter Your email id'
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <label >Mobile Number</label>
                            <input
                                className={"tabinput"}
                                placeholder='Enter Your Mobile Number'
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <label >Pickup Address</label>
                            <ReactGoogleAutocomplete
                                apiKey={""}
                                onPlaceSelected={(place) => console.log(place)}
                                className={"tabinput"}
                                placeholder='Enter Pickup Address Here'
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <input
                                className={"tabinput"}
                                placeholder='Landmark/Door Number/Building Name'
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <label >Drop Address</label>
                            <ReactGoogleAutocomplete
                                apiKey={""}
                                onPlaceSelected={(place) => console.log(place)}
                                className={"tabinput"}
                                placeholder='Enter Drop Address Here'
                            />
                        </div>
                        <button className={styles.bookbtn} >Book Your Cab</button>
                    </div>
                    <div>
                        <div className={styles.info}>
                            <h1>Booking Details</h1>
                            <ul>
                                <li>Type: One Way</li>
                                <li>Pickup Address: Bangalore, india</li>
                                <li>Drop Address: Delhi, india</li>
                                <li>Pickup Date: 15/01/2024</li>
                                <li>Pickup time: 12:10 PM</li>
                                <li>Car Type: XUV</li>
                                <li>KMs Includes: XUV</li>
                                <li>Total Fare:  ₹ 41792</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(Booking);

