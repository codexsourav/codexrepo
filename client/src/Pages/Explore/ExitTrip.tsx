import TripBox from "@/Component/TripBox/TripBox";
import { VscClose } from "react-icons/vsc";

export function EditTrip({ onClose }: { onClose: Function }) {
    return (
        <div className="w-screen h-screen fixed top-0 right-0 bg-black/90 overflow-y-auto pb-5 md:pb-0" >
            <div className="flex justify-center items-center -mt-16 relative md:mt-0  "><TripBox /></div>
            <div className="absolute top-20 right-10 cursor-pointer" >
                <VscClose size={40} color="#fff" onClick={onClose} />
            </div>
        </div>
    )
}
