import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


function UsersTab() {
    return (
        <div className="px-5 sm:px-20 mt-10">
            <h1 className="text-center font-bold text-lg mb-5" >Manage Users</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Mobile</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Booking</TableHead>
                        <TableHead>Wallet Balance</TableHead>
                        <TableHead className="text-right">Actions</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">9382156026</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Credit Card</TableCell>


                        <TableCell className="text-right">
                            <Button className="bg-red-600 hover:bg-red-900">Delete User</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}
export default UsersTab