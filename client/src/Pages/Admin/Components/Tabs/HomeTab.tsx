
import makeApi from "@/Lib/makeApi"
import { useEffect, useState } from "react"
import Loading from "@/Component/loading"
import { Booking } from "@/Interfaces/booking"
import ManageOrder from "@/Component/admin/ManageOrder"


function HomeTab() {
    const [data, setData] = useState<{ users: 0, bookings: 0, data: Booking[] } | null>(null)
    const [reload, setReload] = useState(0)

    const reloadPage = () => {
        setReload(reload + 1);
    }

    const loadData = async () => {
        try {
            const pagedata = await makeApi({ path: "/api/admin/home", isAdmin: true, method: "POST" });
            setData(pagedata.data);
            console.log(pagedata.data);
        } catch (error) {
            setData({ users: 0, bookings: 0, data: [] })
        }
    }

    useEffect(() => {
        loadData();
    }, [reload])

    if (data == null) {
        return <Loading />
    }


    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-10 px-5 sm:px-20 mt-10">
                <div className="bg-green-300 p-5 h-full  col-span-2">
                    <div className="font-bold flex justify-between items-center mb-3">
                        <h3 className="font-bold text-2xl">Welcome, Admin</h3>
                        <a href="#" className="flex text-sm justify-end items-end mt-2">Logout</a>
                    </div>

                    <p>Manage your website all bookings, users , cabs  & blogs from here User carefully You are admin Now</p>

                </div>
                <div className="bg-gray-300 p-5 h-40 flex justify-between items-center flex-col">
                    <h3 className="font-bold text-lg">Total Users</h3>
                    <h1 className="text-5xl">{data.users}</h1>
                    <div></div>
                </div>

                <div className="bg-blue-300 p-5 h-40 flex justify-between items-center flex-col">
                    <h3 className="font-bold text-lg">Booking</h3>
                    <h1 className="text-5xl">{data.bookings}</h1>
                    <div></div>
                </div>
            </div>
            {data.data.length == 0 ? <p className="text-center mt-36">No More Pending Bookings</p> : <ManageOrder data={data.data} reload={reloadPage} />}
        </>
    )
}
export default HomeTab


