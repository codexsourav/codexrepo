import React from 'react';
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
import InDEV from '@/Component/InDEV';

const Profile = () => {
    return (
        <>
            <div className={`${styles.profile} container`}>
                <div className="grid grid-cols-1  md:grid-cols-3 mt-28 gap-y-10 md:gap-x-10 mb-20" >


                    <div className=" col-span-2 h-auto rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* <h1 className='text-2xl mb-5 text-center ml-2 font-bold uppercase' >My Booking Trips</h1> */}
                        {
                            [1, 2, 3, 4, 5].map((e, i) => {
                                return <Card className='rounded-3xl shadow-md relative' key={"Booking-" + i}>
                                    <Button className='absolute right-3 top-3' variant="outline"><RiDeleteBinLine /></Button>
                                    <CardHeader>
                                        <CardTitle>ID: BABA12637</CardTitle>
                                        <CardDescription>Trip: One Way</CardDescription>

                                    </CardHeader>
                                    <CardContent>
                                        <ul>
                                            <li>Car Type: -Demo Car name-</li>
                                            <li>Name: -User Name Here-</li>
                                            <li>PickUp Address: -Pickup Address here-</li>
                                            <li>Drop Address: -Drop Address Here-</li>
                                            <li>Pickup Date: --/--/----</li>
                                            <li>Pickup Time: --:-- --</li>
                                            <li>Distance: --KM</li>
                                            <li>Mobile: +91 ----------</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter className='flex gap-5'>
                                        <Button variant="default" >Request Contacts</Button>
                                        <Button variant="destructive">Cancel Trip</Button>
                                    </CardFooter>
                                </Card>
                            })}

                    </div>


                    <div className="">
                        <div className="h-40   bg-orange-600 rounded-3xl shadow-md  p-5 px-10 flex flex-col justify-evenly mb-8">
                            <h1 className='font-bold text-2xl text-white'>MY Wallet</h1>
                            <h1 className='font-bold text-4xl text-white '>₹250.0</h1>
                        </div>
                        <div className="bg-slate-300 p-10 rounded-3xl shadow-md ">
                            <div className="flex justify-center items-center flex-col">
                                <Avatar className='w-20 h-20' >
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className='font-bold text-lg mt-3' >-User Name Here-</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <InDEV />
        </>
    );
};

export default React.memo(Profile);

