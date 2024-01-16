import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function ManageCabs() {
    return (
        <>
            <div className="flex sm:gap-10 px-5 sm:px-20 mt-10 justify-between items-center w-full"> <h1 className="text-lg font-bold" >Manage Your All Cabs</h1>   <AddCabs /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10 px-5 sm:px-20 mt-10">
                <Card>
                    <CardHeader className="flex flex-row justify-between w-full items-center">
                        <div>
                            <CardTitle>WB01A1232</CardTitle>
                            <CardDescription>Tata Nano</CardDescription>
                        </div>
                        <img src="https://demothemesflat.co/conexikit/wp-content/uploads/2022/11/Taxis-01.png" alt="car" width={80} />
                    </CardHeader>
                    <CardContent>
                        <p>1/KM Price : ₹200.0</p>
                        <p>Base Price : ₹400.0</p>
                        <p>Max Passenger : 4</p>
                    </CardContent>
                    <CardFooter className="flex float-end">
                        <Button className="mr-3" >Update</Button>
                        <Button className="bg-red-600 hover:bg-red-900">Delete</Button>
                    </CardFooter>
                </Card>



            </div>
        </>
    )
}
export default ManageCabs

function AddCabs() {
    return (
        <Dialog>
            <DialogTrigger  >Add New Cab</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Cab</DialogTitle>
                    <DialogDescription>
                        Enter New Cab Info
                    </DialogDescription>
                </DialogHeader>
                <div className="mb-1">
                    <Label>Cab Image</Label>
                    <Input type="file" />
                </div>
                <div className="mb-1">
                    <Label>Cab Model Name</Label>
                    <Input type="text" />
                </div>
                <div className="mb-1">
                    <Label>Cab Id Number</Label>
                    <Input type="text" />
                </div>
                <div className="mb-1">
                    <Label>1/KM Price</Label>
                    <Input type="number" />
                </div>
                <div className="mb-1">
                    <Label>Base Rate Amount</Label>
                    <Input type="number" />
                </div>
                <div className="mb-1">
                    <Label>Max Passenger Capacity</Label>
                    <Input type="number" />
                </div>
                <Button>Add Cab</Button>
            </DialogContent>
        </Dialog>

    )
}
