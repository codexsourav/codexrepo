import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Booking } from "@/Interfaces/booking"
import { Button } from "@/components/ui/button"
import { viewDate } from "@/Lib/getVewDate"
import makeApi from "@/Lib/makeApi"
import { showAsyncToast, showAsyncToastError, showAsyncToastSuccess } from "@/Lib/showToast"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCashBack } from "@/Lib/getCashBack"
import { Checkbox } from "@/components/ui/checkbox"

function ManageOrder({ data, reload }: { data: Booking[], reload: Function }) {

    return (
        <div className="px-5 sm:px-20 mt-10" >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Trip Type</TableHead>
                        <TableHead>PIckUp</TableHead>
                        <TableHead>Drop</TableHead>
                        <TableHead >CarInfo</TableHead>
                        <TableHead >Distance</TableHead>
                        <TableHead >Price</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((e) => {
                            return <TableRow key={e._id} >
                                <TableCell className="font-medium">{e.trip}</TableCell>
                                <TableCell>{e.from}</TableCell>
                                <TableCell>{e.to}</TableCell>
                                <TableCell >{e.cabInfo.name}</TableCell>
                                <TableCell >{e.distance}</TableCell>
                                <TableCell >₹{Math.round(e.amount)}.0</TableCell>
                                <TableCell className="text-right" >
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button>View Booking</Button>
                                        </SheetTrigger>
                                        <BookingView data={e} reload={reload} />
                                    </Sheet>
                                </TableCell>
                            </TableRow>
                        })}

                </TableBody>

            </Table>

        </div>
    )
}
export default ManageOrder

const BookingView = ({ data, reload }: { data: Booking, reload: Function }) => {
    const [showAccptedDillog, setshowAccptedDillog] = useState(false);
    const [showComplete, setshowComplleet] = useState(false);
    const [cashbackAmmount, setCashBackAmmount] = useState<number>(getCashBack(data.amount, 5));

    const [reject, setReject] = useState(false);
    const [driverData, setDriverData] = useState({
        name: "", carnumber: "", mobile: "",
        note: "",
        refund: false,
    });
    const handelInput = (e: any) => {
        setDriverData({ ...driverData, [e.target.name]: e.target.value });
    }
    const acceptedOrder = async (status: string) => {
        const key = showAsyncToast("Processing...");
        try {
            const response = await makeApi({ path: `/api/admin/bookingstatus/${status}/` + data._id, method: "POST", data: driverData, isAdmin: true });
            if (response.status != 200) {
                showAsyncToastError(key, response.data.message);
            } else {
                reload();
                setshowAccptedDillog(false);
                showAsyncToastSuccess(key, "Order " + status + " Successfully");
            }
        } catch (error) {
            showAsyncToastError(key, "Order " + status + " Field");
        }
    };

    const completeOrder = async () => {
        const key = showAsyncToast("Processing...");
        try {
            const response = await makeApi({ path: `/api/admin/bookingstatus/complete/` + data._id, method: "POST", data: { cashback: cashbackAmmount, note: driverData.note }, isAdmin: true });
            if (response.status != 200) {
                showAsyncToastError(key, response.data.message);
            } else {
                reload();
                setshowComplleet(false);
                showAsyncToastSuccess(key, "Order Complete Successfully");
            }
        } catch (error) {
            showAsyncToastError(key, "Order Complete Field");
        }
    };

    return <>

        <SheetContent className="overflow-scroll">
            <SheetHeader>
                <SheetTitle className={data.status == "cancel" ? "text-red-600" : data.status == "complete" ? "text-green-600" : ""}>Order : {data.orderId}</SheetTitle>
                <SheetDescription>
                    <p>View Your Booking Order</p>
                    <p>{viewDate(data.date)}</p>
                </SheetDescription>
            </SheetHeader>
            <div className="">
                <div className="flex p-1 md:p-5 justify-between items-center mt-5">
                    <img src={import.meta.env.VITE_APIURL + "/" + data.cabInfo.image} alt="car" width={100} />
                    <div>
                        <h1 className="text-xl font-bold">{data.cabInfo.name}</h1>
                        <p className="capitalize" > {data.trip}</p>
                    </div>
                </div>
                <h1 className="font-bold text-xl mt-5 mb-3">TRIP INFO</h1>
                <ul>
                    <li>Pickup Address: {data.tripInfo.from}</li>
                    <li>Landmark:{data.landmark}</li>
                    <li>Drop Address: {data.tripInfo.to || data.to}</li>
                    <li>Pickup Date: {data.pickupDate}</li>
                    <li>Time: {data.pickupTime}</li>
                    <li>Distance: {data.distance}</li>
                    <li>Price: ₹{Math.round(data.amount)}.0</li>
                    <li>Payment: {data.paymentType}</li>
                    <li>Payment ID: {data?.paymentInfo?.razorpay_payment_id || ""}</li>

                </ul>
                <h1 className="font-bold text-xl mt-9 mb-3">CONTACT INFO</h1>
                <ul>
                    <li>Pickup Address: {data.from}</li>
                    <li>Drop Address: {data.to}</li>
                    <li>Name: {data.name}</li>
                    <li>Mobile: +91 {data.mobile}</li>
                    <li>Email: {data.email}</li>
                </ul>
            </div>
            {
                data.status == "accepted" ? <ul>
                    <li>Driver Name: {data.driverInfo.name}</li>
                    <li>Driver Mobile: {data.driverInfo.mobile}</li>
                    <li>car Number: {data.driverInfo.carNo}</li>
                </ul> : null
            }
            {(data.status == "pending" || data.status == "accepted") ? <SheetFooter>
                <SheetClose asChild>
                    <div className="flex items-center justify-evenly  w-full mt-10">
                        <Button type="submit" className="w-full" onClick={() => {
                            if (data.status == "accepted") {
                                setshowComplleet(true)
                            } else {
                                setshowAccptedDillog(true)

                            }
                        }}>{data.status == "accepted" ? "Make Complete" : "Accept"}</Button>
                        <Button type="submit" className="bg-red-700 ml-5 w-full" onClick={() => setReject(true)}>Cancel</Button>
                    </div>
                </SheetClose>
            </SheetFooter> : <ul>
                <br />
                <li>Status: {data.status}</li>
                {data.note ? <li>Note: {data.note}</li> : null}
            </ul>}

        </SheetContent>

        {/* make driver info  */}
        <Dialog open={showAccptedDillog} onOpenChange={(e) => setshowAccptedDillog(e)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Driver Information</DialogTitle>
                    <br />
                    <DialogDescription>
                        <div className="mb-3">
                            <Label className="mb-2" >Driver Name</Label>
                            <Input value={driverData.name} name="name" onChange={handelInput} />
                        </div>
                        <div className="mb-3">
                            <Label className="mb-2"  >Driver Mobile Number</Label>
                            <Input value={driverData.mobile} name="mobile" onChange={handelInput} />
                        </div>
                        <div className="mb-5">
                            <Label className="mb-2" >Car Number</Label>
                            <Input value={driverData.carnumber} name="carnumber" onChange={handelInput} />
                        </div>
                        <Button onClick={() => acceptedOrder("accepted")}>Accpted Booking</Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

        {/* Reject */}
        <Dialog open={reject} onOpenChange={(e) => setReject(e)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Some Notes. Why You Cancel?</DialogTitle>
                    <DialogDescription>
                        <Textarea className="mt-5 mb-3" value={driverData.note} name="note" onChange={handelInput} />
                        <div className="flex items-center space-x-2 mb-3">
                            <Checkbox id="terms" checked={driverData.refund} onClick={() => setDriverData({ ...driverData, "refund": !driverData.refund })} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                You Refund This Payment
                            </label>
                        </div>
                        <p className="mb-5">RezorPay Payment ID For Refund - <b> {data.paymentInfo.razorpay_payment_id}</b></p>
                        <Button onClick={() => acceptedOrder("cancel")}>Cancel Order</Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        {/* compleet from box  */}
        <Dialog open={showComplete} onOpenChange={(e) => setshowComplleet(e)}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Complete Booking Order</DialogTitle>
                </DialogHeader>
                <div className="mb-2">
                    <Label className="mb-2" >Release CashBack 5(%)</Label>
                    <Input value={cashbackAmmount} name="amount" type="number" onChange={(e) => (setCashBackAmmount(Number(e.target.value)))} />
                </div>
                <Label className="mt-1" >Note</Label>
                <Textarea className="mb-3" value={driverData.note} name="note" onChange={handelInput} placeholder="Write Something..." />
                <Button onClick={completeOrder}>Complete Order</Button>
            </DialogContent>
        </Dialog>
    </>
}

