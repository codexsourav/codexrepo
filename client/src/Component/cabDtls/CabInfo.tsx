import { FaGasPump } from "react-icons/fa6";
import { RiSteeringFill } from "react-icons/ri";
import { PiNewspaperClipping } from "react-icons/pi";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { MdNightsStay, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { IoCarSport } from "react-icons/io5";
import { BsLuggageFill } from "react-icons/bs";
import { CgToolbarBottom } from "react-icons/cg";



export function CabInfo() {
  return (
    <div className="mt-6 w-full">
      <div className='grid grid-cols-3 text-center w-full'>

        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><FaGasPump /> </div>
          <p className='font-bold text-center'>Base Fare</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><RiSteeringFill /> </div>
          <p className='font-bold text-center'>Driver Allowance</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><PiNewspaperClipping /> </div>
          <p className='font-bold text-center'>GST (5%)</p>
        </div>
      </div>
    </div>
  )
}


export function EXCLUSIONS() {
  return (
    <div className="mt-6 w-full">
      <div className='grid grid-cols-3 gap-4 w-full'>

        <div className="flex justify-start items-center flex-col gap-1 ">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><LiaMoneyBillWaveAltSolid /> </div>
          <p className='font-bold text-center'>Pay ₹17/km after 80 km</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><LiaMoneyBillWaveAltSolid /> </div>
          <p className='font-bold text-center'>Pay ₹144/hr after 8 hours</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><MdNightsStay /> </div>
          <p className='font-bold text-center'>Night Allowance</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><HiOutlineReceiptTax /> </div>
          <p className='font-bold text-center'>Toll / State tax</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><IoCarSport /> </div>
          <p className='font-bold text-center'>Parking</p>
        </div>
      </div>
    </div>
  )
}


export function FACILITIES() {
  return (
    <div className="mt-6 w-full">
      <div className='grid grid-cols-3 gap-4 w-full text-center '>

        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><MdOutlineAirlineSeatReclineNormal /> </div>
          <p className='font-bold text-center'>4 seater</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1 ">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><BsLuggageFill /> </div>
          <p className='font-bold text-center'>2 bags</p>
        </div>
        <div className="flex justify-start items-center flex-col gap-1">
          <div className="w-10 flex justify-center items-center text-orange-700  h-10 border-2 rounded-full border-orange-300"><CgToolbarBottom /> </div>
          <p className='font-bold text-center'>AC</p>
        </div>
      </div>
    </div>
  )
}

function CABTAQ() {
  return (
    <div className="mt-6 text-left">
      <ul className="list-disc px-6">
        <li className="mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, facilis?</li>
        <li className="mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, facilis?</li>
        <li className="mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, facilis?</li>
      </ul>
    </div>
  )
}
export default CABTAQ