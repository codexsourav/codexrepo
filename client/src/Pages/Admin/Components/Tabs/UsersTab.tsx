import Loading from "@/Component/loading";
import { User } from "@/Interfaces/booking";
import { viewDate } from "@/Lib/getVewDate";
import makeApi from "@/Lib/makeApi";
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { showAsyncToast, showAsyncToastError, showAsyncToastSuccess } from "@/Lib/showToast";


function UsersTab() {
    const [data, setData] = useState<{ totalBook: number, user: User }[] | null>(null)
    const [reload, setReload] = useState(0)
    const reloadPage = () => { setReload(reload + 1) };
    const loadData = async () => {
        try {
            const pagedata = await makeApi({ path: "/api/admin/home/users", isAdmin: true, method: "POST" });
            setData(pagedata.data);
            console.log(pagedata.data);
        } catch (error) {
            setData([]);
        }
    }

    const deleteUser = async (id: string) => {
        const key = showAsyncToast("Deleting...");
        try {
            await makeApi({ path: "/api/admin/removeuser/" + id, isAdmin: true, method: "DELETE" });
            showAsyncToastSuccess(key, "User Delete Successfully");
            reloadPage();
        } catch (error) {
            showAsyncToastError(key, "User Delete Field");
        }
    }

    useEffect(() => {
        loadData();
    }, [reload])

    if (data == null) {
        return <Loading />
    }

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
                        <TableHead>Join Date & Time</TableHead>

                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.map((e) => {
                            return <TableRow key={e.user._id}>
                                <TableCell>{e.user.mobile}</TableCell>
                                <TableCell>{e.user.name || "Not Set"}</TableCell>
                                <TableCell>{e.user.email || "Not Set"}</TableCell>
                                <TableCell>{e.totalBook} Cabs</TableCell>
                                <TableCell>{e.user.wallet} RS</TableCell>
                                <TableCell>{viewDate(e.user.date)}</TableCell>

                                <TableCell className="text-right">
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button className="bg-red-600 hover:bg-red-900">Delete User</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure delete user?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteUser(e.user._id!)} className="bg-red-600 hover:bg-red-900" >Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>

        </div>
    )
}
export default UsersTab