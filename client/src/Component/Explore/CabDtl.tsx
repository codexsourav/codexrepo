import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CABTAQ, { CabInfo, EXCLUSIONS, FACILITIES } from '@/Component/cabDtls/CabInfo';
import { useState } from 'react';
import { VscClose } from "react-icons/vsc";


export function CabDetails({ show }: { show: Function }) {
    const [index, setIndex] = useState(0)
    return (
        <div className='fixed top-0 right-0 bg-black/20 p-5 w-screen h-screen z-[999999] flex justify-center items-center' >
            <div className="bg-white w-full p-5  relative  max-w-[450px] min-h-[300px] rounded-xl flex justify-start items-center flex-col">
                <div className="absolute right-2 top-2 cursor-pointer" onClick={() => show(null)}><VscClose size={20} /></div>
                <div className="w-full overflow-x-auto scrollbar-hidden text-center">
                    <Tabs defaultValue="INCLUSIONS" className="w-full">
                        <TabsList className='bg-orange-100'>
                            <TabsTrigger onClick={() => setIndex(0)} className='text-orange-600 font-bold' value="INCLUSIONS">INCLUSIONS</TabsTrigger>
                            <TabsTrigger onClick={() => setIndex(1)} className='text-orange-600 font-bold' value="EXCLUSIONS">EXCLUSIONS</TabsTrigger>
                            <TabsTrigger onClick={() => setIndex(2)} className='text-orange-600 font-bold' value="FACILITIES">FACILITIES</TabsTrigger>
                            <TabsTrigger onClick={() => setIndex(3)} className='text-orange-600 font-bold' value="T&C">T&C</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                {[<CabInfo />,
                <EXCLUSIONS />,
                <FACILITIES />,
                <CABTAQ />,
                ][index]}
            </div>

        </div>
    )
}
