import React, { useEffect, useState } from 'react';
import styles from './styles/profile.module.css'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { Button } from '@/components/ui/button';
import { RiDeleteBinLine } from "react-icons/ri";
import makeApi from '@/Lib/makeApi';
import { Booking, MyBookingResponse } from '@/Interfaces/booking';
import Loading from '@/Component/loading';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { showAsyncToast, showAsyncToastError, showAsyncToastSuccess } from '@/Lib/showToast';

const Profile = () => {
    const [iserror, setIserror] = useState(false);
    const [data, setData] = useState<MyBookingResponse | null>(null);
    const [reload, setReload] = useState(0)

    const reloadPage = () => {
        setReload(reload + 1);
    }
    const loadData = async () => {
        try {
            const response = await makeApi({ path: "/api/mybooking", method: "POST" });
            setData(response.data)
        } catch (error) {
            console.log(error);
            setIserror(true);
        }
    }

    useEffect(() => {
        loadData();
    }, [reload])

    if (data == null) {
        return <Loading />
    } else if (iserror) {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <h1 className='text-4xl uppercase font-bold mb-3'>Page Loading Error</h1>
                <p className='text-3xl' >Unknown error</p>
                <a href="/profile" className='mt-5 text-orange-600 font-bold text-xl' >Reload Page</a>
            </div>
        )
    }

    return (
        <>
            <div className={`${styles.profile} container  `}>

                <div className="grid grid-cols-1  md:grid-cols-3 gap-y-10 mt-28 md:gap-x-10 mb-20 grid-flow-dense" >


                    <div className=" col-span-2 h-auto rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5 order-2 md:order-1">
                        {/* <h1 className='text-2xl mb-5 text-center ml-2 font-bold uppercase' >My Booking Trips</h1> */}
                        {
                            data.bookings.map((e, i) => {
                                return <BookingView key={"Booking-" + i} data={e} reload={reloadPage} />
                            })
                        }
                    </div>

                    <div className="order-1 md:order-2">
                        <div className="h-40   bg-orange-600 rounded-3xl shadow-md  p-5 px-10 flex flex-col justify-evenly mb-8">
                            <h1 className='font-bold text-2xl text-white'>MY Wallet</h1>
                            <h1 className='font-bold text-4xl text-white '>₹{Math.round(data.user.wallet)}.00</h1>
                        </div>
                        <div className="bg-slate-300 p-10 rounded-3xl shadow-md ">
                            <div className="flex justify-center items-center flex-col">
                                <Avatar className='w-20 h-20' >
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className='font-bold text-lg mt-3' >{data.user.name || "User"}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default React.memo(Profile);


function BookingView({ data, reload }: { data: Booking, reload: Function }) {
    const [note, setNote] = useState("");
    const [reject, setReject] = useState(false);

    const cancelOrder = async (route = "cancel") => {
        const key = showAsyncToast("Processing...");
        try {
            const response = await makeApi({ path: `/api/mybooking/${route}/` + data._id, method: "POST", data: { note } });
            if (response.status != 200) {
                showAsyncToastError(key, response.data.message);
            } else {
                reload();
                setReject(false);
                showAsyncToastSuccess(key, "Order " + route + " Successfully");
            }
        } catch (error) {
            showAsyncToastError(key, "Order " + route + " Field");
        }
    };


    const makeActions = () => {
        if (data.status == "cancel") {
            return <ul>
                {data.note ? <li>Note: {data.note}</li> : null}
            </ul>
        } else if (data.status == "accepted") {
            return <>
                <Button variant="secondary" disabled >Trip Accepted</Button>
                <Button variant="destructive" disabled onClick={() => setReject(true)} >Cancel Trip</Button>
            </>
        } else if (data.status == "complete") {
            return <ul>
                {data.note ? <li>Note: {data.note}</li> : null}
            </ul>
        } else {
            return <>
                <Button variant="default"  >Request Contacts</Button>
                <Button variant="destructive" onClick={() => setReject(true)} >Cancel Trip</Button>
            </>
        }
    }

    return (
        <>

            <Card className='rounded shadow-md relative'>
                {(data.status == "complete" || data.status == "cancel") ? <Button className='absolute right-3 top-3' variant="outline"><RiDeleteBinLine /></Button> : null}
                <CardHeader>
                    <CardTitle className={data.status == "cancel" ? "text-red-600" : data.status == "complete" ? "text-green-600" : ""} >{data.orderId}</CardTitle>
                    <CardDescription className='capitalize'>Trip: {data.trip}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>Car Type: {data.cabInfo.name}</li>
                        <li>Name: {data.name}</li>
                        <li>PickUp Address: {data.from}</li>
                        <li>Drop Address: {data.to}</li>
                        <li>Pickup Date: {data.pickupDate}</li>
                        {data.type == "roundTrip" ? <li>Return Date: {data.pickupDate}</li> : null}
                        <li>Pickup Time: {data.pickupTime}</li>
                        <li>Distance: {data.distance}</li>
                        <li>Mobile: +91 {data.mobile}</li>
                        <li className='capitalize'>Payment: {data.paymentType}</li>
                        <li className='capitalize'>Status: {data.status}</li>
                        {data.status == "accepted" ? <>
                            <li className='capitalize'>Driver Name: {data.driverInfo.name}</li>
                            <li className='capitalize'>Driver Mobile: {data.driverInfo.mobile}</li>
                            <li className='capitalize'>Car NO: {data.driverInfo.carNo}</li>
                        </> : null}
                    </ul>
                </CardContent>
                <CardFooter className='flex gap-5'>
                    {makeActions()}
                </CardFooter>
            </Card>
            {/* Reject */}
            <Dialog open={reject} onOpenChange={(e) => setReject(e)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Reason. Why You Cancel?</DialogTitle>
                        <DialogDescription>
                            <Textarea className="mt-5 mb-3" value={note} name="note" onChange={(e) => setNote(e.target.value)} />
                            <Button onClick={() => cancelOrder()}>Cancel Order</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
