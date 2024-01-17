import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


import { GoHomeFill } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { ReactNode, useState } from "react";
import HomeTab from "./Components/Tabs/HomeTab";
import ManageCabs from "./Components/Tabs/ManageCabs";
import BookingTab from "./Components/Tabs/BookingTab";
import UsersTab from "./Components/Tabs/UsersTab";


function Admin() {
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <>
            {[<HomeTab />, <UsersTab />, <BookingTab />, <ManageCabs />][tabIndex]}
            <div className="z-50 fixed bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-200 opacity-100  p-4 w-screen sm:w-96 h-16 rounded flex justify-between items-center px-8">
                <MenuItem item={<GoHomeFill size={30} color={tabIndex == 0 ? "blue" : ""} />} hint="Home" onClick={() => setTabIndex(0)} />
                <MenuItem item={<FaUsers size={30} color={tabIndex == 1 ? "blue" : ""} />} hint="Users" onClick={() => setTabIndex(1)} />
                <MenuItem item={<BsStack size={30} color={tabIndex == 2 ? "blue" : ""} />} hint="Booking" onClick={() => setTabIndex(2)} />
                <MenuItem item={<FaCarAlt size={30} color={tabIndex == 3 ? "blue" : ""} />} hint="Manage Cabs" onClick={() => setTabIndex(3)} />
            </div>
        </>

    )
}
export default Admin



const MenuItem = ({ item, hint, onClick }: { item: ReactNode; hint: string, onClick: any }) => {
    return <TooltipProvider >
        <Tooltip>
            <TooltipTrigger onClick={onClick} className="text-slate-400">
                {item}
            </TooltipTrigger>
            <TooltipContent>
                <p>{hint}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}

