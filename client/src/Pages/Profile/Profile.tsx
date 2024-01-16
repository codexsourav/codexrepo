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


const Profile = () => {
    return (
        <>
            <div className={`${styles.profile} container`}>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-28 gap-y-10 md:gap-x-10 mb-20" >


                    <div className="p-2 md:p-5 bg-slate-100 col-span-2 h-auto">
                        <h1 className='text-2xl mb-3 text-center ml-2 font-bold' >My Booking Trips</h1>
                        <Card>
                            <CardHeader>
                                <CardTitle>ID: BABA12637</CardTitle>
                                <CardDescription>Trip: One Way</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    <li>Car Type: BMW</li>
                                    <li>Name: Sourav Bapari</li>
                                    <li>PickUp Address: kolkata,india</li>
                                    <li>Drop Address: bisghupur,india</li>
                                    <li>Pickup Date: 02/11/2001</li>
                                    <li>Pickup Time: 03:11 PM</li>
                                    <li>Distance: 120KM</li>
                                    <li>Mobile: +91 9382156026</li>
                                </ul>
                            </CardContent>
                            <CardFooter className='flex gap-5'>
                                <Button >Request Contacts</Button>
                                <Button>Cancel Trip</Button>
                            </CardFooter>
                        </Card>

                    </div>


                    <div className="">
                        <div className=" h-40   bg-green-600  p-5 flex flex-col justify-evenly mb-8">
                            <h1 className='font-bold text-2xl text-white'>MY Wallet</h1>
                            <h1 className='font-bold text-4xl text-white '>₹250.0</h1>
                        </div>
                        <div className="bg-slate-300 p-10">
                            <div className="flex justify-center items-center flex-col">
                                <Avatar className='w-20 h-20' >
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <h2 className='font-bold text-lg mt-3' >Sourav Bapari</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default React.memo(Profile);

