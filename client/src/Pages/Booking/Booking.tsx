import React, { useEffect, useState } from 'react';
import styles from './styles/booking.module.css'
import { airportTripType } from '../Home/Componets/tabs/Airport/Airport';
import makeApi from '@/Lib/makeApi';
import { ICabData, IRouteData } from '@/Interfaces/cabs';
import Loading from '@/Component/loading';
import { validateEmail } from '@/Lib/validate';
import { errorToast } from '@/Lib/showToast';
import { generateRandomId } from '@/Lib/makeID';

import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { mobileCodes } from '@/utils/GetTime';
import { PlacesAutocomplete } from '@/Component/GoogleMapInput/GoogleMapInput';

interface IForm {
    name: string,
    email: string,
    mobile: string,
    from: string,
    to: string,
    landmark: string,
    code?: string,
}

export type ICabBooking = {
    tripInfo: {
        type: string;
        from: string;
        to?: string;
        trip?: string,
        pickupTime: string;
        pickupDate: string;
        returnDate?: string;
    };
    orderId: string;
    type: string;
    from: string;
    to?: string;
    trip?: string,
    distance: string;
    landmark: string;
    name: string;
    email: string;
    mobile: string;
    amount: number;
    pickupTime: string;
    pickupDate: string;
    returnDate?: string;
    cabId: string;
    paymentType: string;
    paymentInfo: any,
}


export interface ITripPrice {
    km: string | undefined; // Assuming destinationData?.data.distance.text is of type string
    value: number | string | undefined; // Assuming destinationData?.data.distance.value is of type number
    price: number;
}



const Booking = () => {
    const [loading, setloading] = useState(false)
    const [pageData, setpageData] = useState<{ cab: ICabData, destination: IRouteData, pricing: ITripPrice } | null>(null)
    const [formDataView, setFormDataView] = useState<IForm>({
        email: "",
        from: "",
        landmark: "",
        mobile: "",
        name: "",
        to: "",
        code: "+91"
    });
    const [Razorpay] = useRazorpay();
    const handelForm = ({ name, value }: { name: keyof IForm, value: string }) => {
        setFormDataView({ ...formDataView, [name]: value });
    }

    // get url paramiters 
    const authResult = new URLSearchParams(window.location.search);

    const type = authResult.get("type");
    const pickdate = authResult.get("pickdate");
    const picktime = authResult.get("picktime");

    const pickupaddress = authResult.get("pickupaddress");

    const dropaddress = authResult.get("dropaddress");

    const returndate = authResult.get("returndate");

    const cabid = authResult.get("car");
    const localkm = authResult.get("km");



    // Airport Data 
    const airportname = authResult.get("airportname");
    const trip = authResult.get("trip");
    const location = authResult.get("location");

    // pickup location 
    const locationName = () => {
        if (type == "airport") {
            return `Airport Address: ${airportname}`;
        } else {
            return `Pickup Address: ${pickupaddress}`;
        }
    };

    // drop address 
    const dropName = () => {
        if (type == "airport") {
            if (trip == "0") {
                return "Pickup Address: " + location;
            } else {
                return "Drop Address: " + location;
            }
        } else {
            return `Drop Address: ${dropaddress}`;
        }
    };

    // address 
    const fromAddress = () => {
        if (type == "airport") {
            if (trip == "0") {
                return location;
            } else {
                return airportname;
            }
        } else {
            return pickupaddress;
        }
    };

    const toAddress = () => {
        if (type == "airport") {
            if (trip == "0") {
                return airportname;
            } else {
                return location;
            }
        } else {
            return dropaddress;
        }
    };

    // loading all data 
    const loadInitData = async () => {
        const from = type == "airport" ? airportname : pickupaddress;
        const to = type == "airport" ? location : dropaddress;

        try {
            const requestsend = await makeApi({
                "path": `/api/booking/${type}`, method: "POST", data: {
                    from,
                    to,
                    cabid: cabid,
                    date: pickdate,
                    time: picktime,
                    returndate: returndate,
                    km: localkm
                }
            });
            const response = requestsend.data;
            console.log(response);
            if (response.status == "OK") {
                setpageData(response)
                setFormDataView({
                    from: from!,
                    to: to!,
                    mobile: response.user.mobile,
                    email: (response.user.email || ""),
                    name: (response.user.name || ""),
                    landmark: "",
                });
            } else {
                console.log(response.data);

                window.location.replace("/")
            }
        } catch (error: any) {
            window.location.replace("/")
            console.log(error.request.data);
        }
    };

    useEffect(() => {
        loadInitData();
    }, []);



    const handlePayment = () => {

        const options: RazorpayOptions = {
            key: import.meta.env.VITE_RAZORPAY,
            amount: `${Math.round(pageData!.pricing.price)}00`,
            currency: "INR",
            name: "BabagCabs",
            description: "Book Ride For " + type,
            image: "https://example.com/your_logo",
            order_id: "",
            handler: (data: any) => {
                makeNewBooking(data);
            },
            prefill: {
                name: formDataView.name,
                email: formDataView.email,
                contact: formDataView.mobile,
            },
            notes: {
                address: fromAddress(),
            },
            theme: {
                color: "#ea580c",
            },
        };
        console.log(options);

        const rzpay = new Razorpay(options);
        rzpay.open();
    };


    const ValiDateForm = (): string | boolean => {
        const { email, from, landmark, mobile, name } = formDataView;

        if (!name) {
            return "Enter Your Name";
        } else if (!email) {
            return "Enter An Email ID";
        } else if (!validateEmail(email)) {
            return "Enter A Valid Email ID";
        } else if (!from) {
            return "Enter Departure Location";
        } else if (!landmark) {
            return "Enter Landmark";
        } else if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
            return "Enter A Valid 10-digit Mobile Number";
        }
        return true;
    };

    const createBooking = async () => {
        const valid = ValiDateForm();
        if (valid == true) {
            if (pageData?.pricing.price) {
                // handlePayment();
                await makeNewBooking(null);
            }
        } else {
            errorToast(valid.toString());
        }
    }


    const makeNewBooking = async (payinfo: any) => {
        const orderId = generateRandomId()
        setloading(true);
        try {
            const data: ICabBooking = {
                type: type!,
                name: formDataView.name,
                cabId: pageData?.cab._id!,
                email: formDataView.email,
                from: formDataView.from,
                to: formDataView.to,
                orderId: orderId,
                landmark: formDataView.landmark,
                mobile: formDataView.mobile,
                pickupDate: pickdate!,
                returnDate: returndate!,
                pickupTime: picktime!,
                paymentType: "prepaid",
                distance: pageData?.pricing.km!,
                trip: (type == "airport" ? airportTripType[+(trip || "0")] : type!),
                amount: Math.round(pageData?.pricing.price!),
                tripInfo: {
                    from: fromAddress()!,
                    to: toAddress()!,
                    pickupDate: pickdate!,
                    returnDate: returndate!,
                    pickupTime: picktime!,
                    trip: (type == "airport" ? airportTripType[+(trip || "0")] : type!),
                    type: type!,
                },
                paymentInfo: payinfo,
            }
            const response = await makeApi({ path: "/api/new/booking/", method: "POST", data })
            setloading(false);

            console.log(response);
            if (response.data.status == "OK" && response.data.orderId) {
                window.location.replace("/profile?new=" + response.data.orderId);
            } else {
                errorToast(response.data.message || "Cab Booking Field")
            }
        } catch (error: any) {
            setloading(false);

            console.log(error);
            errorToast(error.response.data.message || "Cab Booking Field")
        }
    }

    // this is loader 
    if (!pageData) {
        return <div className="mt-16"><Loading /></div>
    }


    return (
        <>
            <div className="container">
                <div className={`${styles.booking}`}>
                    <div className={styles.contactForm}>
                        <h1 className='font-bold text-lg' >CONTACT & PICKUP DETAILS</h1>
                        <div className={styles.inputsec}>
                            <label >Name</label>
                            <input
                                className={"tabinput"}
                                placeholder='Enter Your Name'
                                value={formDataView.name}
                                onChange={(e) => { handelForm({ name: 'name', value: e.target.value }) }}
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <label >Email</label>
                            <input
                                className={"tabinput"}
                                placeholder='Enter Your email id'
                                value={formDataView.email}
                                onChange={(e) => { handelForm({ name: 'email', value: e.target.value }) }}
                            />
                        </div>
                        <div className={styles.inputsec}>
                            <label >Mobile Number</label>
                            <div className="grid grid-cols-12 gap-3">
                                <select className='tabinput col-span-2 text-center' onChange={(e) => handelForm({ name: 'code', value: e.target.value })} >
                                    {
                                        mobileCodes.map((e, i) => {
                                            return <option value={e} key={i + "-code-" + e} >{e}</option>
                                        })
                                    }
                                </select>
                                <input
                                    className={"tabinput col-span-10"}
                                    placeholder='Enter Your Mobile Number'
                                    value={formDataView.mobile}
                                    onChange={(e) => { handelForm({ name: 'mobile', value: e.target.value }) }}
                                /></div>
                        </div>
                        <div className={styles.inputsec}>
                            <PlacesAutocomplete label='Pickup Address' value={formDataView.from} placeholder='Enter Pickup Address Here' onChenge={(e) => handelForm({ name: 'from', value: e })} />
                        </div>
                        <div className={styles.inputsec}>
                            <input
                                className={"tabinput"}
                                placeholder='Landmark/Door Number/Building Name'
                                value={formDataView.landmark}
                                onChange={(e) => { handelForm({ name: 'landmark', value: e.target.value }) }}
                            />
                        </div>

                        <button className={styles.bookbtn} onClick={createBooking} disabled={loading} >{!loading ? "Book Your Cab" : "Creating Order..."}</button>
                    </div>
                    <div>
                        <div className={`${styles.info} relative`}>
                            <h1 className='font-bold text-lg'>Booking Details</h1>
                            <img src={"https://babagcabs.com/" + pageData.cab.image} height={100} width={120} className='absolute top-3 right-3 object-contain' />
                            <ul className='list-none'>
                                <li className='capitalize'>Trip: {type == "airport" ? airportTripType[+(trip || "0")] : type}</li>
                                <li>Cab Type: {pageData.cab.name}</li>
                                <li>{locationName()}</li>

                                {type == "local" ? null : <li>{dropName()}</li>}
                                <li>Pickup Date: {pickdate}</li>
                                {type == "roundtrip" ? <li>Return Date: {returndate}</li> : null}
                                <li>Pickup time: {picktime}</li>
                                <li className='capitalize'>Distance: {pageData?.pricing.km}</li>
                                <li className='capitalize'>Total: ₹{Math.round(pageData?.pricing.price || 0)}.00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(Booking);

