import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import makeApi from "@/Lib/makeApi"
import Loading from "@/Component/loading"
import { Booking } from "@/Interfaces/booking"
import ManageOrder from "@/Component/admin/ManageOrder"
import RefundOrder from "@/Component/admin/RefundOrder"


function BookingTab() {
    const [tabIndex, setTabIndex] = useState<string>("pending");
    const [data, setData] = useState<Booking[] | null>(null)
    const [reload, setReload] = useState(0)
    const loadData = async () => {
        setData(null)
        try {
            const data = await makeApi({ path: "/api/bookings/" + tabIndex, isAdmin: true });
            setData(data.data);
        } catch (e) {
            setData([]);
        }
    }

    const reloadPage = () => {
        setReload(reload + 1);
    }

    useEffect(() => {
        loadData();
    }, [tabIndex, reload])


    if (data == null) {
        return <Loading />
    }

    return (
        <div>
            <div className="px-5 sm:px-20 mt-10">
                <h1 className="text-center font-bold text-lg mb-5" >Manage Booking</h1>
                <div className="flex justify-center items-center mb-5">
                    <Tabs defaultValue={tabIndex} className="w-[90vw] md:w-[450px] " >
                        <TabsList className="w-full">
                            <TabsTrigger value="pending" className="w-full" onClick={() => setTabIndex("pending")} >Pending</TabsTrigger>
                            <TabsTrigger value="accepted" className="w-full" onClick={() => setTabIndex("accepted")}>Accepted</TabsTrigger>
                            <TabsTrigger value="complete" className="w-full" onClick={() => setTabIndex("complete")}>Complete</TabsTrigger>
                            <TabsTrigger value="cancel" className="w-full" onClick={() => setTabIndex("cancel")}>Canceled</TabsTrigger>
                            <TabsTrigger value="refunds" className="w-full" onClick={() => setTabIndex("refunds")}>Refunds</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {data.length == 0 ? <p className="text-center mt-36 capitalize">No More {tabIndex} Bookings</p> : tabIndex == "refunds" ? <RefundOrder data={data} reload={reloadPage} /> : <ManageOrder data={data} reload={reloadPage} />}

            </div>
        </div>
    )
}
export default BookingTab
