import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleMapInput from "@/Component/GoogleMapInput/GoogleMapInput"
import { generateTimeArray } from "@/utils/GetTime"


function MakeBooking() {
    return (
        <>
            <h1 className="text-center mt-10 mb-5 text-3xl font-bold">Create New Booking</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-10 px-5 sm:px-20 mt-10">
                <div className="">
                    <div className="">
                        <Label >Trip Type</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Trip Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">One Way</SelectItem>
                                <SelectItem value="system">Round Trip</SelectItem>
                                <SelectItem value="dark">Local</SelectItem>
                                <SelectItem value="airport">Airport</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-3 mb-3">
                        <Label >Pickup Location</Label>
                        <GoogleMapInput onChenge={(e) => { }} placeholder="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label >Drop Location</Label>
                        <GoogleMapInput onChenge={(e) => { }} placeholder="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label  >Pickup Date</Label>
                        <Input type="date" />

                    </div>
                    <div className="mt-3 mb-3">
                        <Label >Pickup Drop Date</Label>
                        <Input type="date" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label >Pickup Time</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Time" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    generateTimeArray().map((e, i) => {
                                        return <SelectItem key={"time-" + i} value={e} >{e}</SelectItem>
                                    })
                                }

                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <div className="">
                    <div className="mb-3">
                        <Label  >Name</Label>
                        <Input type="text" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label  >Email</Label>
                        <Input type="text" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label  >Mobile Number</Label>
                        <Input type="text" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label  >Landmark</Label>
                        <Input type="text" />
                    </div>
                    <div className="mt-3 mb-3">
                        <Label  >Payment Type</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="prepaid">PrePaid</SelectItem>
                                <SelectItem value="postpaid">PostPaid</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="mt-3 mb-3">
                        <Label  >Booking Status</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="complete">Complete</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <div className="">
                    <div className="mb-3">
                        <Label  >Name</Label>
                        <Input type="text" />
                    </div>


                    <div className="mb-3">
                        <Label  >Distance</Label>
                        <Input type="number" />
                    </div>
                    <div className="mb-3">
                        <Label  >Amount</Label>
                        <Input type="text" />
                    </div>

                </div>
            </div>


        </>
    )
}
export default MakeBooking