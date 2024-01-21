
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
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


function HomeTab() {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-10 px-5 sm:px-20 mt-10">
                <div className="bg-green-300 p-5 h-full  col-span-2">
                    <div className="font-bold flex justify-between items-center mb-3">
                        <h3 className="font-bold text-2xl">Welcome, Admin</h3>
                        <a href="#" className="flex text-sm justify-end items-end mt-2">Logout</a>
                    </div>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor consequuntur suscipit voluptas.</p>

                </div>
                <div className="bg-gray-300 p-5 h-40 flex justify-between items-center flex-col">
                    <h3 className="font-bold text-lg">Total Users</h3>
                    <h1 className="text-5xl">10</h1>
                    <div></div>
                </div>

                <div className="bg-blue-300 p-5 h-40 flex justify-between items-center flex-col">
                    <h3 className="font-bold text-lg">Booking</h3>
                    <h1 className="text-5xl">4</h1>
                    <div></div>
                </div>
            </div>
            <div className="px-5 sm:px-20 mt-10">
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

                        <TableRow >
                            <TableCell className="font-medium">Local</TableCell>
                            <TableCell>Kolkata</TableCell>
                            <TableCell>bangalore</TableCell>
                            <TableCell >Kolkata</TableCell>
                            <TableCell >400KM</TableCell>
                            <TableCell >₹45000.0</TableCell>
                            <TableCell className="text-right" >
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button>View Booking</Button>
                                    </SheetTrigger>
                                    <BookingView />
                                </Sheet>
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell className="font-medium">Local</TableCell>
                            <TableCell>Kolkata</TableCell>
                            <TableCell>bangalore</TableCell>
                            <TableCell >Kolkata</TableCell>
                            <TableCell >400KM</TableCell>
                            <TableCell >₹45000.0</TableCell>
                            <TableCell className="text-right" >
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button>View Booking</Button>
                                    </SheetTrigger>
                                    <BookingView />
                                </Sheet>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>

            </div>
        </>
    )
}
export default HomeTab


const BookingView = () => {
    return <SheetContent>
        <SheetHeader>
            <SheetTitle>Order : BABA15A435</SheetTitle>
            <SheetDescription>
                View Your Booking Order
            </SheetDescription>
        </SheetHeader>
        <div className="">
            <div className="flex p-1 md:p-5 justify-between items-center mt-5">
                <img src="https://demothemesflat.co/conexikit/wp-content/uploads/2022/11/Taxis-01.png" alt="car" width={100} />
                <div>
                    <h1 className="text-xl font-bold">M5 2008 Model</h1>
                    <p>Drop To Airport</p>
                </div>
            </div>
            <h1 className="font-bold text-xl mt-5 mb-3">TRIP INFO</h1>
            <ul>
                <li>Pickup Address: Kolkata,india</li>
                <li>Drop Address: Malakarpota,india</li>
                <li>Date: 02/01/2024</li>
                <li>Time: 02:11 PM</li>
                <li>Distance: 400KM</li>
                <li>Price: ₹1200.0</li>


            </ul>
            <h1 className="font-bold text-xl mt-9 mb-3">CONTACT INFO</h1>
            <ul>
                <li>Pickup Address: Kolkata,india</li>
                <li>Drop Address: Malakarpota,india</li>
                <li>Name: Sourav Bapari</li>
                <li>Mobile: +91 9382156026</li>
                <li>Email: sourav0w@gmail.com</li>
            </ul>
        </div>
        <SheetFooter>
            <SheetClose asChild>
                <div className="flex items-center justify-evenly  w-full mt-10">
                    <Button type="submit" className="w-full">Accept</Button>
                    <Button type="submit" className="bg-red-700 ml-5 w-full">Reject</Button>
                </div>
            </SheetClose>
        </SheetFooter>
    </SheetContent>
}